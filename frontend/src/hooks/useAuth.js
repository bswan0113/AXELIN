// --- START OF FILE src/hooks/useAuth.js (최종 아키텍처 수정) ---

import { useState, useEffect, useCallback } from 'react';
import { supabase } from 'lib/supabaseClient';
import * as userService from 'services/userService';
import * as userInterestService from 'services/userInterestService';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // [추가] 첫 사용자 설정을 위한 함수
  const performFirstTimeUserSetup = useCallback(async (session, onboardingData) => {
    console.log('%c[useAuth] First time user setup starting...', 'color: blue; font-weight: bold;', onboardingData);
    try {
      // 1. users 테이블에 프로필 생성
      await userService.syncUserProfile(session);
      
      // 2. 온보딩 데이터로 관심사 저장
      const allIds = [
        onboardingData.mainCategory?.id,
        onboardingData.subCategory?.id,
        ...(onboardingData.filters?.map(f => f.id) || [])
      ].filter(Boolean);
      const uniqueInterestIds = [...new Set(allIds)];
      if (uniqueInterestIds.length > 0) {
        await userInterestService.setUserInterests(session.user.id, uniqueInterestIds);
      }

      // // 3. users 테이블에 onboarding_completed = true로 업데이트
      // await supabase
      //   .from('users')
      //   .update({ onboarding_completed: true })
      //   .eq('id', session.user.id);
      
      console.log('%c[useAuth] Onboarding setup successful.', 'color: green;');
    } catch (error) {
      console.error('%c[useAuth] CRITICAL ERROR during onboarding setup!', 'color: red;', error);
      // 에러 발생 시 로그아웃 처리하여 무한 루프 방지
      await supabase.auth.signOut();
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        
        try {
          if (session) {
            // [수정] 첫 로그인(`SIGNED_IN`)이고 localStorage에 온보딩 데이터가 있는지 확인
            // (이전 온보딩 플로우에서 저장된 데이터)
            const storedOnboardingSelections = localStorage.getItem('onboarding_selections');
            
            if (event === 'SIGNED_IN' && storedOnboardingSelections) {
              const onboardingData = JSON.parse(storedOnboardingSelections);
              await performFirstTimeUserSetup(session, onboardingData);

              // 온보딩 데이터 사용 후 localStorage에서 제거
              localStorage.removeItem('onboarding_selections');
            }

            // 일반 로그인 또는 첫 가입 절차 완료 후, 최종 사용자 정보를 가져옵니다.
            const userProfile = await userService.fetchUserProfile(session);
            const interests = await userInterestService.getUserInterests(session.user.id);
            setUser({ ...userProfile, interests });

          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Auth state change processing error:", error);
          setUser(null);
        } finally {
          if (isMounted) setIsLoading(false);
        }
      }
    );
    return () => { isMounted = false; subscription.unsubscribe(); };
  }, [performFirstTimeUserSetup]);

  return { user, isLoading };
};
// --- END OF FILE src/hooks/useAuth.js (최종 아키텍처 수정) ---