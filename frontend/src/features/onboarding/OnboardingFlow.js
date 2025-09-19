import React, { useState, useEffect } from 'react';
import { supabase } from 'lib/supabaseClient';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Fade,
  Grow,
  IconButton,
  Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import logo from 'assets/images/logo.png';

// --- 상수 정의 ---
const CACHE_VERSION = '1.5'; // 데이터 캐시 버전 (질문 선택지 등)
const getCacheKey = (type, identifier = '') => `onboarding_cache_${type}_${identifier}_v${CACHE_VERSION}`;

// 온보딩 완료 여부 및 최종 선택 값 키 (버전 관리는 데이터 캐시에만 적용, 플로우 완료 여부는 단순화)
const ONBOARDING_COMPLETED_KEY = 'onboarding_flow_completed'; // 단순한 완료 플래그
const ONBOARDING_FINAL_SELECTIONS_KEY = 'onboarding_final_selections'; // 완료 시 최종 선택값

// --- 질문 텍스트 ---
const QUESTIONS = [
  '주력으로 사용하는 AI 분야를 선택해주세요.',
  '어떤 세부 작업을 하시나요?',
  '선호하는 도구의 특징을 알려주세요. (다중 선택)',
  '설정이 완료되었습니다!',
];

// --- 스타일 상수 (재사용을 위해 분리) ---
const buttonStyle = (isSelected = false, isMultiSelect = false) => ({
  width: '100%',
  justifyContent: 'flex-start',
  borderRadius: '16px',
  padding: '12px 24px',
  margin: '8px 0',
  backgroundColor: isSelected ? (isMultiSelect ? 'secondary.main' : 'primary.main') : 'white',
  color: isSelected ? 'white' : 'black',
  fontSize: '1rem',
  fontWeight: 'medium',
  textTransform: 'none',
  border: isSelected ? '1px solid transparent' : '1px solid #e0e0e0',
  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: isSelected ? (isMultiSelect ? 'secondary.dark' : 'primary.dark') : 'action.hover',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  },
});

const OnboardingFlow = ({ onComplete }) => {
  // --- 상태 관리 ---
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]); // 현재 단계의 선택지를 통합 관리
  const [selections, setSelections] = useState({
    mainCategory: null,
    subCategory: null,
    filters: [],
  });
  // 온보딩 플로우 자체를 렌더링할지 결정하는 상태
  const [showOnboardingUI, setShowOnboardingUI] = useState(false);

  // --- 1. 컴포넌트 마운트 시 온보딩 완료 여부 확인 및 초기 캐시 정리 ---
  useEffect(() => {
    const isCompleted = localStorage.getItem(ONBOARDING_COMPLETED_KEY);

    if (isCompleted === 'true') {
      console.log('Onboarding already completed. Skipping flow.');
      const finalSelectionsJson = localStorage.getItem(ONBOARDING_FINAL_SELECTIONS_KEY);
      if (onComplete) {
        try {
          // 완료된 경우 onComplete 콜백 호출, 저장된 최종 선택값을 전달
          onComplete(finalSelectionsJson ? JSON.parse(finalSelectionsJson) : {});
        } catch (e) {
          console.error("Failed to parse final selections from local storage", e);
          onComplete({}); // 파싱 실패 시 빈 객체 전달 또는 오류 처리
        }
      }
      // 이 컴포넌트가 온보딩 UI를 렌더링하지 않도록 합니다.
      setShowOnboardingUI(false);
      return; // 이 useEffect의 나머지 부분을 실행하지 않고 종료
    }

    // 온보딩이 완료되지 않았다면, 플로우를 시작하는 것이므로 모든 관련 캐시를 정리합니다.
    console.log('Onboarding flow is starting. Clearing all existing onboarding_cache_ values and completion flags.');
    Object.keys(localStorage).forEach(key => {
      // 'onboarding_cache_'로 시작하는 모든 데이터 캐시 제거
      if (key.startsWith('onboarding_cache_')) {
        console.log(`Clearing cache key: ${key}`);
        localStorage.removeItem(key);
      }
      // 현재 및 이전 버전의 완료 플래그 제거
      if (key === ONBOARDING_COMPLETED_KEY || key.startsWith('onboarding_flow_completed_v')) {
        console.log(`Clearing completion flag: ${key}`);
        localStorage.removeItem(key);
      }
      // 현재 및 이전 버전의 최종 선택 데이터 제거
      if (key === ONBOARDING_FINAL_SELECTIONS_KEY || key.startsWith('onboarding_final_selections_v')) {
        console.log(`Clearing final selections: ${key}`);
        localStorage.removeItem(key);
      }
    });

    // 온보딩 플로우 UI를 렌더링하도록 설정
    setShowOnboardingUI(true);
  }, [onComplete]); // onComplete 함수는 안정적이므로 의존성 배열에 포함

  // --- 2. 현재 단계의 데이터 로딩 로직 (useEffect 훅) ---
  // showOnboardingUI가 true일 때만 데이터 로딩을 진행
  useEffect(() => {
    if (!showOnboardingUI) return; // 온보딩 UI가 활성화되지 않았다면 데이터 로딩 스킵

    const fetchData = async () => {
      setLoading(true);
      setOptions([]); // 단계가 바뀔 때 이전 선택지를 초기화

      let cacheKey = '';
      let query;

      if (step === 1) {
        cacheKey = getCacheKey('categories_step1');
        query = supabase.from('categories').select('*').is('parent_id', null);
      } else if (step === 2 && selections.mainCategory) {
        cacheKey = getCacheKey('categories_step2', selections.mainCategory.id);
        query = supabase.from('categories').select('*').eq('parent_id', selections.mainCategory.id);
      } else if (step === 3) {
        cacheKey = getCacheKey('tags');
        query = supabase.from('tags').select('*');
      } else {
        setLoading(false);
        return; // 더 이상 불러올 데이터가 없음
      }

      // 캐시 확인 (CACHE_VERSION이 일치할 때만 사용)
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed.version === CACHE_VERSION) {
            setOptions(parsed.data);
            setLoading(false);
            return;
          }
        } catch (e) { console.error('Cache parsing error', e); }
      }

      // Supabase에서 데이터 가져오기
      const { data, error } = await query;
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setOptions(data);
        localStorage.setItem(cacheKey, JSON.stringify({ version: CACHE_VERSION, data }));
      }
      setLoading(false);
    };

    fetchData();
  }, [step, selections.mainCategory, showOnboardingUI]); // showOnboardingUI를 의존성 배열에 추가

  // --- 이벤트 핸들러 ---
  const handleSelect = (option) => {
    if (step === 1) {
      // 주력 AI 분야 선택 시, 하위 카테고리 및 필터 선택을 초기화
      setSelections(prev => ({ ...prev, mainCategory: option, subCategory: null, filters: [] }));
      setStep(2);
    } else if (step === 2) {
      // 세부 작업 선택 시, 필터 선택을 초기화
      setSelections(prev => ({ ...prev, subCategory: option, filters: [] }));
      setStep(3);
    } else if (step === 3) {
      // 다중 선택 로직
      setSelections(prev => {
        const newFilters = prev.filters.some(f => f.id === option.id)
          ? prev.filters.filter(f => f.id !== option.id)
          : [...prev.filters, option];
        return { ...prev, filters: newFilters };
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      // 뒤로가기 시 현재 단계의 선택 값 초기화 (UX 개선)
      if (step === 3) setSelections(prev => ({ ...prev, filters: [] })); // 3단계에서 뒤로가면 필터 초기화
      if (step === 2) setSelections(prev => ({ ...prev, subCategory: null })); // 2단계에서 뒤로가면 서브카테고리 초기화
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Onboarding Data Submitted:', selections);
    // 온보딩 완료 상태와 최종 선택값을 로컬 스토리지에 저장
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    localStorage.setItem(ONBOARDING_FINAL_SELECTIONS_KEY, JSON.stringify(selections));

    if (onComplete) {
      onComplete(selections);
    }
  };

  // --- 렌더링 함수 ---
  const renderOptions = () => {
    if (loading) return <CircularProgress />;

    return (
      <Grid container spacing={2} justifyContent="center">
        {options.map((option, index) => {
          let isSelected;
          if (step === 1) isSelected = selections.mainCategory?.id === option.id;
          else if (step === 2) isSelected = selections.subCategory?.id === option.id;
          else if (step === 3) isSelected = selections.filters.some(f => f.id === option.id);

          return (
            <Grid item xs={12} sm={6} md={4} key={option.id}>
              <Grow in={true} timeout={300 + index * 100}>
                <Button sx={buttonStyle(isSelected, step === 3)} onClick={() => handleSelect(option)}>
                  {option.name}
                </Button>
              </Grow>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const renderContent = () => {
    // 마지막 완료 단계
    if (step === 4) {
      return (
        <Fade in={true} timeout={500}>
          <Box textAlign="center">
            <Grow in={true} timeout={500}>
                <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
            </Grow>
            <Typography variant="h4" fontWeight="bold" mb={2}>{QUESTIONS[3]}</Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              이제 당신에게 딱 맞는 AI 도구와 정보를 추천해 드릴게요.
            </Typography>
            <Button variant="contained" size="large" onClick={handleSubmit}>시작하기</Button>
          </Box>
        </Fade>
      );
    }

    // 1, 2, 3 단계
    return (
      <Fade in={true} timeout={500}>
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold" mb={5} sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
            {QUESTIONS[step - 1]}
          </Typography>
          {renderOptions()}
          {step === 3 && !loading && ( // 3단계(다중선택)에만 다음 버튼 표시
            <Box mt={5}>
              <Button variant="contained" size="large" onClick={() => setStep(4)} disabled={selections.filters.length === 0}>
                선택 완료
              </Button>
            </Box>
          )}
        </Box>
      </Fade>
    );
  };

  // --- 최종 JSX 반환 ---
  // showOnboardingUI가 false라면 아무것도 렌더링하지 않습니다.
  if (!showOnboardingUI) {
    return null; // 온보딩이 이미 완료되었거나 아직 초기화 중이라면 null을 반환하여 UI를 숨김
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        p: 3,
        position: 'relative',
      }}
    >
      {step > 1 && step < 4 && (
        <IconButton
          onClick={handleBack}
          sx={{ position: 'absolute', top: 24, left: 24 }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}

      {/* --- 로고 --- */}
      <Box
        component="img"
        src={logo}
        alt="AXELIN Logo"
        sx={{
          height: { xs: '32px', sm: '250px' },
          mb: { xs: 4, sm: 5 },
        }}
      />

      {/* --- 메인 콘텐츠 --- */}
      <Box sx={{ maxWidth: '960px', width: '100%' }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default OnboardingFlow;