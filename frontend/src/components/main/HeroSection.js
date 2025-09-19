// --- START OF FILE src/components/main/HeroSection.js (수정) ---

import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { styled } from '@mui/system';

const gradientColor = 'linear-gradient(to right, #FF6B8F, #B46BFF, #6B8FFF)';

const SearchInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '50px',
    backgroundColor: '#ffffff',
    padding: '5px 20px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease-in-out',
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: 'transparent' },
    '&.Mui-focused fieldset': { borderColor: 'transparent', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' },
  },
  '& .MuiInputBase-input': { padding: '12px 14px', fontSize: '1.1rem', '&::placeholder': { color: theme.palette.text.secondary, opacity: 1 } },
  width: 'min(700px, 90%)',
  [theme.breakpoints.down('md')]: { width: '95%' },
}));

const HeroSection = ({ user }) => {
  const isLoggedIn = !!user;
  const userName = user?.nickname;
  const userCategory = '콘텐츠 & 마케팅 자동화'; // 임시 데이터

  const getHeadline = () => {
    if (isLoggedIn && userName) {
      return (
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1, color: '#333' }}>
          <Box component="span" sx={{ background: gradientColor, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{userName}</Box>님을 위한 오늘의 AI 워크플로우
        </Typography>
      );
    }
    if (isLoggedIn) {
      return (
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1, color: '#333' }}>
          <Box component="span" sx={{ background: gradientColor, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{userCategory}</Box> 전문가를 위한 AI 추천
        </Typography>
      );
    }
    return (
      <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1, color: '#333' }}>
        당신의 문제를 해결할 AI를 찾아보세요
      </Typography>
    );
  };

  const getHeadlineDescription = () => (
    <Typography variant="h6" sx={{ textAlign: 'center', color: '#666', mb: 4 }}>
      {isLoggedIn ? "AXELIN이 당신의 생산성을 극대화할 AI 솔루션을 제안합니다." : "다양한 AI 에셋과 툴을 탐색하고, 당신의 비즈니스에 맞는 최적의 솔루션을 찾아보세요."}
    </Typography>
  );

  return (
    <Box sx={{ my: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {getHeadline()}
      {getHeadlineDescription()}
      <SearchInput placeholder="어떤 도움이 필요하세요? (예: 블로그 글쓰기, 이미지 생성)" variant="outlined" />
    </Box>
  );
};

export default HeroSection;
// --- END OF FILE src/components/main/HeroSection.js ---