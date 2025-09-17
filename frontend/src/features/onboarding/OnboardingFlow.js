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
  Grid, // Grid 컴포넌트를 사용하여 레이아웃을 더 잘 제어합니다.
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // 완료 아이콘 추가
import logo from 'assets/images/logo.png';
// --- 상수 정의 ---
const CACHE_VERSION = '1.5'; // 캐시 버전 업데이트
const getCacheKey = (type, identifier = '') => `onboarding_cache_${type}_${identifier}_v${CACHE_VERSION}`;

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

  // --- 데이터 로딩 로직 (useEffect 훅) ---
  useEffect(() => {
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

      // 캐시 확인
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
  }, [step, selections.mainCategory]);

  // --- 이벤트 핸들러 ---
  const handleSelect = (option) => {
    if (step === 1) {
      setSelections(prev => ({ ...prev, mainCategory: option }));
      setStep(2);
    } else if (step === 2) {
      setSelections(prev => ({ ...prev, subCategory: option }));
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
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Onboarding Data Submitted:', selections);
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
  // OnboardingFlow.js 파일의 맨 아래 return 부분을 이걸로 교체하세요.

  // --- 최종 JSX 반환 ---
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column', // <-- ★★★ 바로 이 한 줄이 모든 것을 해결합니다! ★★★
        alignItems: 'center',    // 가로 중앙 정렬
        justifyContent: 'center', // 세로 중앙 정렬
        backgroundColor: 'background.default',
        p: 3,
        position: 'relative', // 뒤로가기 버튼의 기준점
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
          height: { xs: '32px', sm: '250px' }, // 화면 크기에 따라 로고 크기 조절
          mb: { xs: 4, sm: 5 },             // 로고와 콘텐츠 사이 여백도 조절
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