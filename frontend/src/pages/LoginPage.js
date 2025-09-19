import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { supabase } from 'lib/supabaseClient';
import logo from 'assets/images/logo.png';

function LoginPage() {
  const handleOAuthSignIn = async (provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin, // 현재 페이지로 리디렉션
        },
      });

      if (error) {
        console.error('Error signing in with ' + provider + ':', error.message);
        alert('로그인 중 오류가 발생했습니다: ' + error.message);
      }
      // data.url이 있으면 해당 URL로 리디렉션 (Supabase가 처리)
    } catch (error) {
      console.error('Unexpected error during sign in:', error.message);
      alert('예상치 못한 오류가 발생했습니다.');
    }
  };

  // 소셜 로그인 버튼을 위한 공통 스타일 (maxWidth 550px에 맞춰 조정)
  const socialButtonStyle = {
    mb: 3, // 마진 조정 (기존 4에서 3으로)
    py: 2, // 수직 패딩 조정 (기존 3에서 2으로)
    borderRadius: '14px', // 둥근 모서리 조정 (기존 18px에서 14px으로)
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem', // 폰트 크기 조정 (기존 1.25rem에서 1.1rem으로)
    boxShadow: '0 3px 8px rgba(0,0,0,0.1)', // 그림자 효과 조정
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)', // 호버 시 이동 거리 조정 (기존 -4px에서 -2px으로)
      boxShadow: '0 5px 12px rgba(0,0,0,0.15)', // 호버 시 그림자 강화 조정
    },
  };

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
        p: { xs: 2, sm: 3 }, // 전체 패딩 조정 (기존 { xs: 3, sm: 6 }에서 { xs: 2, sm: 3 }으로)
      }}
    >
      {/* 로고 영역 - 중앙에 배치 */}
      <Box sx={{ mb: { xs: 4, sm: 6 }, display: 'flex', justifyContent: 'center' }}> {/* 마진 조정 */}
        <img
          src={logo}
          alt="AXELIN Logo"
          style={{ height: '300px', cursor: 'pointer' }} // 로고 크기 조정 (기존 300px에서 180px으로)
        />
      </Box>

      {/* 로그인 폼/버튼 컨테이너 */}
      <Box
        sx={{
          maxWidth: '550px', // 요청된 maxWidth로 변경
          width: '100%',
          p: { xs: 4, sm: 6 }, // 내부 패딩 조정 (기존 { xs: 4, sm: 8 }에서 { xs: 4, sm: 6 }으로)
          bgcolor: 'white',
          borderRadius: '18px', // 둥근 모서리 조정 (기존 24px에서 18px으로)
          boxShadow: '0 6px 20px rgba(0,0,0,0.08)', // 그림자 조정
          textAlign: 'center',
        }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, fontSize: { xs: '1rem', sm: '1.1rem' } }} // 폰트 크기 조정 및 마진 조정
        >
          소셜 계정으로 간편하게 시작하세요.
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{
            ...socialButtonStyle,
            bgcolor: '#4285F4',
            '&:hover': {
              ...socialButtonStyle['&:hover'],
              bgcolor: '#357ae8',
            },
          }}
          onClick={() => handleOAuthSignIn('google')}
        >
          Google로 로그인
        </Button>
        {/* <Button
          fullWidth
          variant="contained"
          sx={{
            ...socialButtonStyle,
            bgcolor: '#FEE500',
            color: '#3C1E1E',
            '&:hover': {
              ...socialButtonStyle['&:hover'],
              bgcolor: '#e6cc00',
            },
          }}
          onClick={() => handleOAuthSignIn('kakao')}
        >
          카카오로 로그인
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{
            ...socialButtonStyle,
            bgcolor: '#03C75A',
            '&:hover': {
              ...socialButtonStyle['&:hover'],
              bgcolor: '#02a34a',
            },
          }}
          onClick={() => handleOAuthSignIn('naver')}
        >
          네이버로 로그인
        </Button> */}
      </Box>
    </Box>
  );
}

export default LoginPage;