// --- START OF FILE src/components/main/CreatorCtaSection.js (수정) ---

import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function CreatorCtaSection() {
  return (
    <Box
      sx={{
        // [수정] 외부 여백(my)을 제거하고, 높이를 100%로 설정하여 부모 공간을 채웁니다.
        height: '100%',
        width: '100%',
        p: { xs: 4, md: 6 }, // 반응형 패딩 적용
        textAlign: 'center',
        borderRadius: 3,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'white',
        boxShadow: 6,
        // [추가] Flexbox를 사용하여 내부 콘텐츠를 세로 중앙 정렬합니다.
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        당신의 AI 지식과 결과물, AXELIN에서 판매하세요!
      </Typography>
      <Typography variant="h6" paragraph sx={{ mb: 4, maxWidth: '600px' }}>
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

// --- END OF FILE src/components/main/CreatorCtaSection.js (수정) ---