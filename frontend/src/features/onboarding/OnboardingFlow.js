import React from 'react';
import { useOnboarding } from 'hooks/useOnboarding';
import {
  Box, Button, Typography, CircularProgress, Fade, Grow, IconButton, Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import logo from 'assets/images/logo.png';
import { alpha } from '@mui/material/styles';

// 브랜드의 핵심 색상을 정의합니다. (연보라, 연코랄)
const lightPurple = '#BCA9E7'; // 좀 더 부드러운 연보라
const lightCoral = '#FFB3A7';  // 부드러운 코랄

const buttonStyle = (isSelected = false) => ({
  width: '100%',
  height: '100%',
  minHeight: { xs: 70, sm: 80 },
  p: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: isSelected ? '#fff' : 'text.primary',
  background: isSelected 
    ? `linear-gradient(45deg, ${lightCoral} 30%, ${lightPurple} 90%)` 
    : 'background.paper',
  border: '1px solid',
  borderColor: isSelected ? 'transparent' : 'divider',
  borderRadius: 3,
  boxShadow: isSelected ? `0 4px 20px ${alpha(lightPurple, 0.35)}` : '0 1px 3px rgba(0,0,0,0.05)',
  textTransform: 'none',
  fontWeight: isSelected ? 700 : 500,
  fontSize: { xs: '0.9rem', sm: '1rem' },
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: isSelected 
      ? `0 8px 25px ${alpha(lightPurple, 0.45)}` 
      : `0 4px 12px ${alpha('#000000', 0.1)}`,
    borderColor: lightPurple,
  },
});


const OnboardingFlow = ({ onComplete }) => {
  const {
    step,
    loading,
    options,
    selections,
    isFlowCompleted,
    currentQuestion,
    selectOption,
    goBack,
    completeStep3,
    submitFlow,
  } = useOnboarding(onComplete);

  if (isFlowCompleted) {
    return null;
  }

  const renderOptions = () => {
    if (loading) return <CircularProgress />;

    return (
      <Grid container spacing={{ xs: 1.5, sm: 2.5 }} justifyContent="center">
        {options.map((option, index) => {
          const isMultiSelect = step === 3;
          const isSelected = isMultiSelect
            ? selections.filters.some(f => f.id === option.id)
            : (selections.mainCategory?.id === option.id || selections.subCategory?.id === option.id);
          
          return (
            <Grid item xs={6} sm={4} md={3} key={option.id}>
              <Grow in={true} timeout={300 + index * 100}>
                <Button sx={buttonStyle(isSelected)} onClick={() => selectOption(option)}>
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
    if (step === 4) {
      return (
        <Fade in={true} timeout={500}>
          <Box textAlign="center">
            <Grow in={true} timeout={500}>
                <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
            </Grow>
            <Typography variant="h4" fontWeight="bold" mb={2}>{currentQuestion}</Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              이제 당신에게 딱 맞는 AI 도구와 정보를 추천해 드릴게요.
            </Typography>
            <Button variant="contained" size="large" onClick={submitFlow}>시작하기</Button>
          </Box>
        </Fade>
      );
    }

    return (
      <Fade in={true} timeout={500}>
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold" mb={5} sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
            {currentQuestion}
          </Typography>
          {renderOptions()}
          {step === 3 && !loading && (
            <Box mt={5}>
              <Button variant="contained" size="large" onClick={completeStep3} disabled={selections.filters.length === 0}>
                선택 완료
              </Button>
            </Box>
          )}
        </Box>
      </Fade>
    );
  };

  return (
    <Box
      sx={{
        minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', backgroundColor: 'background.default',
        p: 3, position: 'relative',
      }}
    >
      {step > 1 && step < 4 && (
        <IconButton onClick={goBack} sx={{ position: 'absolute', top: 24, left: 24 }}>
          <ArrowBackIcon />
        </IconButton>
      )}
      {/* 로고 크기 수정: 데스크탑에서 80px로 키움 */}
      <Box component="img" src={logo} alt="AXELIN Logo" sx={{ height: { xs: '160px', sm: '400px' }, mb: { xs: 4, sm: 5 } }} />
      <Box sx={{ maxWidth: '960px', width: '100%' }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default OnboardingFlow;