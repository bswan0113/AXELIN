import React, { useState, useEffect, useRef } from 'react';
import OnboardingFlow from 'features/onboarding/OnboardingFlow';
import MainPage from 'pages/MainPage';
import LoginPage from 'pages/LoginPage';
import { supabase } from 'lib/supabaseClient';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'theme';
import AuthContext from 'contexts/AuthContext';
import LoadingScreen from 'components/common/LoadingScreen';

// --- 자동 로그아웃 관련 상수 ---
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30분
const LAST_ACTIVITY_KEY = 'lastActivityTime';

function App() {
  const navigate = useNavigate();

  // --- 상태(State) 선언부 ---
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // --- 자동 로그아웃 관련 Ref ---
  const logoutTimerRef = useRef(null);
  const lastActivityTimeRef = useRef(Date.now());
  
  // ★★★★★ [수정] 경쟁 상태(Race Condition) 방지를 위한 Ref 추가 ★★★★★
  const isProcessingAuthChange = useRef(false);

  // --- 로그아웃 처리 함수 ---
  const handleLogout = async () => {
    console.log('자동 로그아웃 처리 중...');
    clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = null;
    localStorage.removeItem(LAST_ACTIVITY_KEY);
    await supabase.auth.signOut();
  };

  // --- 비활성 타이머 재설정 함수 ---
  const resetInactivityTimer = () => {
    const now = Date.now();
    lastActivityTimeRef.current = now;
    localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());

    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }

    logoutTimerRef.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_TIMEOUT_MS);
  };

  // --- 활동 감지 이벤트 리스너 등록 및 해제 ---
  useEffect(() => {
    if (user) {
      const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
      events.forEach(event => window.addEventListener(event, resetInactivityTimer));

      resetInactivityTimer();

      const handleStorageChange = (event) => {
        if (event.key === LAST_ACTIVITY_KEY && event.newValue) {
          const newLastActivityTime = parseInt(event.newValue, 10);
          if (newLastActivityTime > lastActivityTimeRef.current) {
            lastActivityTimeRef.current = newLastActivityTime;
            resetInactivityTimer();
          }
        }
      };
      window.addEventListener('storage', handleStorageChange);

      return () => {
        events.forEach(event => window.removeEventListener(event, resetInactivityTimer));
        window.removeEventListener('storage', handleStorageChange);
        clearTimeout(logoutTimerRef.current);
      };
    } else {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
      localStorage.removeItem(LAST_ACTIVITY_KEY);
    }
  }, [user]);

  // --- 인증 및 데이터 로딩 로직 ---
  useEffect(() => {
    let isMounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`[Auth State Change] Event: ${event}, Session exists: ${!!session}`);
        
        // ★★★★★ [수정] 중복 실행 방지 로직 ★★★★★
        if (isProcessingAuthChange.current) {
          console.warn('이미 인증 변경을 처리 중이므로 중복 실행을 방지합니다.');
          return;
        }

        if (!isMounted) return;

        if (session) {
          // ★★★★★ [수정] 처리 시작 직전에 잠금(lock) 설정 ★★★★★
          isProcessingAuthChange.current = true;
          setIsLoading(true);
          
          try {
            if (!session.user) throw new Error("세션이 존재하지만 user 객체가 없습니다.");

            const onboardingSelectionsJson = localStorage.getItem('onboarding_final_selections');
            if (onboardingSelectionsJson) {
              console.log("온보딩 데이터 발견! 'performFirstTimeUserSetup'을 실행합니다.");
              await performFirstTimeUserSetup(session, onboardingSelectionsJson);
            } else {
              // 이미 로그인된 사용자가 아니거나, 다른 사용자로 변경된 경우에만 프로필을 다시 가져옵니다.
              if (!user || user.id !== session.user.id) {
                console.log("일반 사용자 프로필 'fetchUserProfile'을 실행합니다.");
                await fetchUserProfile(session);
              }
            }
          } catch (error) {
            console.error("인증 처리 중 오류 발생:", error);
            setUser(null);
          } finally {
            if (isMounted) {
              setIsLoading(false);
            }
            // ★★★★★ [수정] 모든 처리가 끝난 후 잠금(lock) 해제 ★★★★★
            isProcessingAuthChange.current = false;
          }
        } else {
          setUser(null);
          setIsLoading(false);
          if (event === 'SIGNED_OUT') {
            navigate('/');
          }
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []); // 의존성 배열을 비워두어 컴포넌트 마운트 시 한 번만 실행되도록 유지합니다.


  // --- API 호출 함수들 ---

  // --- [Refactored] Supabase Direct Communication Helpers ---

  /**
   * Replaces the '/api/v1/auth/sync' BFF call.
   * Ensures a user profile exists in the public 'users' table.
   * @param {object} session - The user's Supabase session object.
   */
  const syncUserProfile = async (session) => {
    console.log("[Supabase] 'users' 테이블과 프로필 동기화를 시도합니다.");
    const { error } = await supabase.from('users').upsert({
      id: session.user.id,
      email: session.user.email,
      name: session.user.user_metadata?.full_name,
      provider: session.user.app_metadata?.provider,
      avatar_url: session.user.user_metadata?.avatar_url
    }, { onConflict: 'id' });

    if (error) {
      console.error('Supabase 프로필 동기화 오류:', error);
      throw error;
    }
    console.log("[Supabase] 사용자 프로필이 성공적으로 동기화되었습니다.");
  };

  /**
   * Replaces the '/api/v1/user-interests' BFF call.
   * Saves a user's selected interests to the 'user_interests' table.
   * @param {object} session - The user's Supabase session object.
   * @param {Array<string|number>} interestIds - An array of category IDs to save.
   */
  const saveUserInterests = async (session, interestIds) => {
    console.log("[Supabase] 'user_interests' 테이블에 관심사 저장을 시도합니다.");
    const interestsToInsert = interestIds.map(id => ({
      user_id: session.user.id,
      category_id: id,
    }));

    const { error } = await supabase
      .from('user_interests')
      .insert(interestsToInsert);

    if (error) {
      console.error('Supabase 관심사 저장 오류:', error);
      throw error;
    }
    console.log("[Supabase] 사용자 관심사가 성공적으로 저장되었습니다.");
  };

  const fetchUserProfile = async (session) => {
    try {
      const { data: profile, error } = await supabase
        .from('users')
        .select(`
          id,
          name,
          email,
          avatar_url,
          user_interests (
            category_id
          )
        `)
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Supabase 프로필 조회 오류:', error);
        throw error;
      }

      if (profile) {
        const transformedProfile = {
          id: profile.id,
          email: profile.email,
          name: profile.name || session.user.user_metadata?.full_name || '사용자',
          avatar_url: profile.avatar_url,
          interests: profile.user_interests.map(interest => interest.category_id),
        };
        setUser(transformedProfile);
        console.log('Fetched user profile directly from Supabase:', transformedProfile);
      } else {
        throw new Error("Supabase에서 사용자 프로필을 찾을 수 없습니다.");
      }

    } catch (error) {
      console.error('프로필 조회 실패 시 대체 데이터를 사용합니다:', error);
      setUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.full_name || '사용자',
        interests: [],
      });
    }
  };

  const performFirstTimeUserSetup = async (session, selectionsJson) => {
    console.log('%c[DEBUG] 1. performFirstTimeUserSetup 함수 실행 시작 (Supabase-direct ver.)', 'color: blue; font-size: 18px; font-weight: bold;');
    
    let isSetupSuccessful = false;
    if (!session || !session.user) {
      console.error('%c[DEBUG] CRITICAL ERROR: session 또는 session.user가 없어서 실행을 중단합니다!', 'color: red; font-size: 18px; font-weight: bold;');
      return;
    }

    try {
      // 1. Sync user profile directly with Supabase
      await syncUserProfile(session);

      // 2. Save user interests directly to Supabase
      const selections = JSON.parse(selectionsJson);
      const allIds = [];
      if (selections.mainCategory?.id) allIds.push(selections.mainCategory.id);
      if (selections.subCategory?.id) allIds.push(selections.subCategory.id);
      selections.filters?.forEach(f => allIds.push(f.id));
      const uniqueInterestIds = [...new Set(allIds)];

      if (uniqueInterestIds.length > 0) {
        await saveUserInterests(session, uniqueInterestIds);
      }

      // 3. Fetch the newly created profile to populate the user state
      // This can be replaced with a direct Supabase select call in the future.
      await fetchUserProfile(session);

      isSetupSuccessful = true;

    } catch (error) {
      console.error('%c[DEBUG] 7. CRITICAL ERROR: Supabase 직접 설정 중 에러 발생!', 'color: red; font-size: 18px; font-weight: bold;');
      console.error(error);
      
      // Since the BFF is gone, we don't need to call a delete user function.
      // The auth user still exists in Supabase, but their profile setup failed.
      // We just sign them out and let them try again.
      await supabase.auth.signOut();
      alert("계정 설정 중 예상치 못한 오류가 발생했습니다. 다시 시도해 주세요.");
      navigate('/');

    } finally {
      if (isSetupSuccessful) {
        console.log('%c[DEBUG] 8. finally 블록 실행. 설정이 성공적으로 완료되어 로컬 스토리지를 정리합니다.', 'color: green; font-size: 14px;');
        const completionFlagKey = 'onboarding_flow_completed';
        localStorage.setItem(completionFlagKey, 'true');
        Object.keys(localStorage)
          .filter(key => key.startsWith('onboarding') && key !== completionFlagKey)
          .forEach(key => localStorage.removeItem(key));
      } else {
        console.log('%c[DEBUG] 8. finally 블록 실행. 설정이 실패하여 로컬 스토리지 정리를 건너뜁니다.', 'color: orange; font-size: 14px;');
      }
    }
  };

  const handleOnboardingComplete = (selections) => {
    console.log('온보딩 완료! 최종 선택 데이터:', selections);
    navigate('/');
  };

  // --- 렌더링 로직 ---
  const onboardingCompleted = localStorage.getItem('onboarding_flow_completed') === 'true';

  if (isLoading) {
    return <LoadingScreen />;
  }

  const renderRootElement = () => {
    // [참고] 이 렌더링 로직은 이전 논의에 따라 수정이 필요할 수 있습니다.
    // 현재는 로그인 시 무조건 MainPage로 가도록 되어 있습니다.
    if (user) {
      return <MainPage user={user} />;
    }
    if (!user && !onboardingCompleted) {
      return <OnboardingFlow onComplete={handleOnboardingComplete} />;
    }
    return <MainPage />;
  };

  return (
    <AuthContext.Provider value={{ user }}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={renderRootElement()} />
        </Routes>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;