import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function CreatorCtaSection() {
  return (
    <Box
      sx={{
        my: 8,
        p: 6,
        textAlign: 'center',
        borderRadius: 3,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Pink-Orange gradient
        color: 'white',
        boxShadow: 6,
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        당신의 AI 지식과 결과물, AXELIN에서 판매하세요!
      </Typography>
      <Typography variant="h6" paragraph sx={{ mb: 4 }}>
        AI 창작자들을 위한 비즈니스 홈그라운드, AXELIN에서 새로운 기회를 만나보세요.
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          bgcolor: 'white',
          color: '#FE6B8B',
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: '#f0f0f0',
          },
          px: 5,
          py: 1.5,
          borderRadius: '30px',
        }}
      >
        판매 시작하기
      </Button>
    </Box>
  );
}

export default CreatorCtaSection;
