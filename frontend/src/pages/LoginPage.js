// --- START OF FILE src/pages/LoginPage.js ---

import React from 'react';
import { supabase } from 'lib/supabaseClient';
import { Button, Box, Typography, Container } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import logo from 'assets/images/logo.png'; // [추가] 로고 이미지 import

function LoginPage() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error('Google 로그인 오류:', error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white',
        }}
      >
        {/* [추가] 로고 이미지 */}
        <Box
          component="img"
          src={logo}
          alt="AXELIN Logo"
          sx={{ 
            height: 200, // 40px 높이로 설정
            mb: 4       // 아래쪽 여백 추가
          }}
        />

        <Button
          fullWidth
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          sx={{ 
            padding: '12px', 
            fontSize: '1rem',
            backgroundColor: '#4285F4',
            '&:hover': {
              backgroundColor: '#357ae8',
            }
          }}
        >
          Google 계정으로 로그인
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;

// --- END OF FILE src/pages/LoginPage.js ---