import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import OnboardingFlow from './features/onboarding/OnboardingFlow';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import LoadingScreen from './components/common/LoadingScreen';
import AuthContext from './contexts/AuthContext';
import theme from './theme';

import { useAuth } from './hooks/useAuth';
import { useInactivityLogout } from './hooks/useInactivityLogout';

const ONBOARDING_COMPLETED_KEY = 'onboarding_flow_completed';

/**
 * 인증 및 사용자 프로필 로딩을 처리하는 메인 앱 컴포넌트입니다.
 * 온보딩을 이미 거친 사용자들만 이 컴포넌트를 보게 됩니다.
 */
const MainApp = () => {
  const { user, isLoading } = useAuth();
  useInactivityLogout(user);

  // useAuth가 사용자 정보를 로딩하는 동안 로딩 화면을 보여줍니다.
  // 이 부분이 없으면 useAuth의 user가 null인 초기 상태에서 OnboardingFlow로 잘못 빠질 수 있습니다.
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ user }}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<MainPage />} />
      </Routes>
    </AuthContext.Provider>
  );
};

/**
 * 앱의 진입점으로, localStorage를 확인하여 온보딩 또는 메인 앱으로 분기합니다.
 */
function App() {
  const [showOnboarding, setShowOnboarding] = useState(undefined);

  useEffect(() => {
    // localStorage는 동기적으로 접근 가능하지만, 앱의 첫 렌더링 이후에 확인하여
    // 상태를 설정하고 UI를 결정하는 것이 React의 생명주기에 더 적합합니다.
    const onboardingCompleted = localStorage.getItem(ONBOARDING_COMPLETED_KEY);
    setShowOnboarding(onboardingCompleted !== 'true');
  }, []);

  // localStorage 확인 전에는 아무것도 렌더링하지 않거나 로딩 화면을 보여줍니다.
  if (showOnboarding === undefined) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider theme={theme}>
      {showOnboarding ? <OnboardingFlow /> : <MainApp />}
    </ThemeProvider>
  );
}

export default App;
