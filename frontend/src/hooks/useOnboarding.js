import { useState, useEffect } from 'react';
import { supabase } from 'lib/supabaseClient';
import * as categoryService from 'services/categoryService';
import * as tagService from 'services/tagService';

const ONBOARDING_COMPLETED_KEY = 'onboarding_flow_completed';

const QUESTIONS = [
  '주력으로 사용하는 AI 분야를 선택해주세요.',
  '어떤 세부 작업을 하시나요?',
  '선호하는 도구의 특징을 알려주세요. (다중 선택)',
  '설정이 완료되었습니다! 이제 계정을 생성하여 시작하세요.',
];

export const useOnboarding = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null); // 에러 상태 추가
  const [selections, setSelections] = useState({
    mainCategory: null,
    subCategory: null,
    filters: [],
  });
  
  // 이 훅은 비로그인 상태에서만 사용되므로 isFlowCompleted는 필요 없습니다.

  useEffect(() => {
    // 온보딩 플로우가 마운트되면 항상 데이터를 가져옵니다.
    const fetchData = async () => {
      setLoading(true);
      setOptions([]);
      setError(null); // 새로 데이터를 가져올 때 에러 초기화
      
      try {
        let data = [];
        if (step === 1) {
          data = await categoryService.getMainCategories();
        } else if (step === 2 && selections.mainCategory?.id) {
          data = await categoryService.getSubCategories(selections.mainCategory.id);
        } else if (step === 3) {
          data = await tagService.getTags();
        }
        setOptions(data);
      } catch (error) {
        console.error(`Error fetching data for step ${step}:`, error);
        setError(error); // 에러 상태 설정
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [step, selections.mainCategory]);

  const selectOption = (option) => {
    if (step === 1) {
      setSelections({ mainCategory: option, subCategory: null, filters: [] });
      setStep(2);
    } else if (step === 2) {
      setSelections(prev => ({ ...prev, subCategory: option, filters: [] }));
      setStep(3);
    } else if (step === 3) {
      setSelections(prev => {
        const newFilters = prev.filters.some(f => f.id === option.id)
          ? prev.filters.filter(f => f.id !== option.id)
          : [...prev.filters, option];
        return { ...prev, filters: newFilters };
      });
    }
  };

  const goBack = () => {
    if (step > 1) {
      if (step === 3) setSelections(prev => ({ ...prev, filters: [] }));
      if (step === 2) setSelections(prev => ({ ...prev, subCategory: null }));
      setStep(prev => prev - 1);
    }
  };

  const completeStep3 = () => {
    if (selections.filters.length > 0) {
      setStep(4);
    }
  };
  
  const submitFlow = () => {
    console.log('Onboarding selections finalized:', selections);
    
    // 1. 선택 데이터를 URL 쿼리 파라미터로 만들기 위해 JSON 문자열로 변환합니다.
    const selectionsJson = JSON.stringify(selections);
    // 2. URL에 포함될 수 있도록 안전하게 인코딩합니다.
    const encodedSelections = encodeURIComponent(selectionsJson);
    
    // 3. 온보딩 선택 데이터를 localStorage에 저장합니다.
    localStorage.setItem('onboarding_selections', selectionsJson);
    
    // 4. 로컬 스토리지에 '완료' 상태를 저장합니다 (새로고침 시 재시작 방지).
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    
    // 5. 메인 페이지로 이동합니다.
    window.location.href = '/';
  };
  
  return {
    step,
    loading,
    options,
    selections,
    currentQuestion: QUESTIONS[step - 1],
    selectOption,
    goBack,
    completeStep3,
    submitFlow,
  };
};