import React from 'react';
import { AppBar, Toolbar, Button, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/images/logo.png'; 
import { supabase } from 'lib/supabaseClient';

function Header({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // App.js의 onAuthStateChange가 상태를 업데이트하고,
    // 홈으로 이동하면 App.js의 라우팅 로직이 나머지를 처리합니다.
    navigate('/');
  };

  const gradientColor = 'linear-gradient(to right, #FF6B8F, #B46BFF, #6B8FFF)';
  const hoverGradientColor = 'linear-gradient(to right, #e05e7f, #9c5ec0, #5c7ee0)';

  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0} 
      sx={{ 
        borderBottom: '1px solid #eee', 
        px: { xs: 2, md: 4 }
      }}
    >
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 0, mr: 3, display: 'flex', alignItems: 'center' }}>
          <img 
            src={logo} 
            alt="AXELIN Logo" 
            style={{ height: '80px', cursor: 'pointer' }} 
            onClick={() => navigate('/')}
          />
        </Box>

        <Box 
          sx={{ 
            flexGrow: 1, 
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center', 
            mx: 2
          }}
        >
          {/* <TextField
            variant="outlined"
            size="small"
            placeholder="어떤 AI가 필요하세요? 통합 검색"
            InputProps={{ 
                sx: { 
                    borderRadius: '8px', 
                    bgcolor: '#f5f5f5', 
                    '& fieldset': { borderColor: 'transparent' }
                } 
            }}
            sx={{ width: 'min(500px, 100%)' }}
          /> */}
        </Box>

        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', ml: 3 }}>
          { user ? (
            <Button 
              variant="contained" 
              onClick={handleLogout}
              sx={{
                background: '#666',
                color: 'white',
                fontWeight: 'medium',
                borderRadius: '8px',
                padding: '8px 16px',
                textTransform: 'none',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  background: '#555',
                  boxShadow: '0 6px 15px rgba(0,0,0,0.3)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              로그아웃
            </Button>
          ) : (
            <Button 
              variant="contained" 
              onClick={() => navigate('/login')}
              sx={{
                background: gradientColor,
                color: 'white',
                fontWeight: 'medium',
                borderRadius: '8px',
                padding: '8px 16px',
                textTransform: 'none',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  background: hoverGradientColor,
                  boxShadow: '0 6px 15px rgba(0,0,0,0.3)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              로그인
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
