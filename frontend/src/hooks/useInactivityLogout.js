import { useEffect, useRef } from 'react';
import { supabase } from 'lib/supabaseClient';

const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30분
const LAST_ACTIVITY_KEY = 'lastActivityTime';
const THROTTLE_MS = 1000; // [수정] 1초 쓰로틀링 시간 설정

export const useInactivityLogout = (user) => {
  const logoutTimerRef = useRef(null);
  const lastActivityTimeRef = useRef(Date.now());

  useEffect(() => {
    if (!user) {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current = null;
      }
      localStorage.removeItem(LAST_ACTIVITY_KEY);
      return;
    }

    const handleLogout = async () => {
      console.log('비활성 상태로 인해 자동 로그아웃됩니다.');
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current = null;
      }
      localStorage.removeItem(LAST_ACTIVITY_KEY);
      await supabase.auth.signOut();
    };

    // [수정] 쓰로틀링 로직이 적용된 타이머 리셋 함수
    const resetInactivityTimer = () => {
      const now = Date.now();
      
      // 마지막 활동 시간으로부터 1초가 지나지 않았으면 아무것도 하지 않음 (쓰로틀링)
      if (now - lastActivityTimeRef.current < THROTTLE_MS) {
        return;
      }

      // 1초 이상 지났을 때만 실제 타이머 갱신 로직을 실행
      lastActivityTimeRef.current = now;
      localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());

      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
      
      console.log(`활동 감지: ${INACTIVITY_TIMEOUT_MS / 60000}분 타이머를 재설정합니다.`);
      logoutTimerRef.current = setTimeout(handleLogout, INACTIVITY_TIMEOUT_MS);
    };
    
    // 초기 타이머 설정
    resetInactivityTimer();

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetInactivityTimer));

    // 다른 탭에서의 활동을 감지하는 핸들러 (이 부분은 그대로 유지)
    const handleStorageChange = (event) => {
      if (event.key === LAST_ACTIVITY_KEY && event.newValue) {
        resetInactivityTimer(); // 다른 탭에서 활동이 감지되면 현재 탭 타이머도 리셋
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      events.forEach(event => window.removeEventListener(event, resetInactivityTimer));
      window.removeEventListener('storage', handleStorageChange);
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
    };
  }, [user]);
};