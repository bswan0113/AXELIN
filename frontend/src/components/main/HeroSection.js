import React from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function HeroSection() {
  return (
    <Box sx={{ textAlign: 'center', py: 8, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        당신의 문제를 해결할 AI를 찾아보세요
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4 }}>
        AI 활용, 여기서부터 시작하세요.
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="어떤 도움이 필요하세요? (예: 블로그 글쓰기, 이미지 생성)"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: {
            borderRadius: '30px',
            padding: '10px 20px',
            fontSize: '1.2rem',
            bgcolor: '#f9f9f9',
            '& fieldset': { border: 'none' },
          }
        }}
        sx={{ maxWidth: '700px', mx: 'auto' }}
      />
    </Box>
  );
}

export default HeroSection;
