import React, { useState, useEffect } from 'react';
import OnboardingFlow from 'features/onboarding/OnboardingFlow'; // Changed to absolute path

// 재방문 시 보여줄 가짜 메인 페이지 컴포넌트
const MainPageComponent = () => {
  return (
    <div>
      <h1>메인 페이지</h1>
      <p>Axelin에 오신 것을 환영합니다!</p>
    </div>
  );
};

function App() {
  // 로딩 상태와 온보딩 표시 여부를 관리하는 상태
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // 컴포넌트가 처음 렌더링될 때 한 번만 실행
  useEffect(() => {
    // localStorage에서 'onboardingCompleted' 키를 확인
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');

    if (onboardingCompleted === 'true') {
      // 키가 있으면 메인 페이지를 보여줌
      setShowOnboarding(false);
    } else {
      // 키가 없으면 온보딩 화면을 보여줌
      setShowOnboarding(true);
    }
    // 확인이 끝났으므로 로딩 상태를 false로 변경
    setIsLoading(false);
  }, []);

  // 온보딩 완료 처리를 위한 함수 (selections 파라미터 추가)
  const handleOnboardingComplete = (selections) => {
    console.log('온보딩 완료! 최종 선택 데이터:', selections);
    // localStorage에 'onboardingCompleted' 키와 값을 저장
    localStorage.setItem('onboardingCompleted', 'true');
    // 온보딩 화면을 닫고 메인 페이지를 보여줌
    setShowOnboarding(false);
  };

  // 로딩 중에는 아무것도 표시하지 않음 (또는 로딩 스피너를 보여줄 수 있음)
  if (isLoading) {
    return null;
  }

  return (
    <div>
      {
        // showOnboarding 상태에 따라 조건부로 컴포넌트를 렌더링
        showOnboarding ? (
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        ) : (
          <MainPageComponent />
        )
      }
    </div>
  );
}

export default App;
