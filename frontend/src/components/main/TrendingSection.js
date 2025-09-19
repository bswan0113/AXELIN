import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const popularAssets = [
  { id: 1, title: 'AI 기반 로고 디자인 툴', creator: '디자인랩', rank: 1 },
  { id: 2, title: '자동 번역 및 요약 AI', creator: '글로벌텍', rank: 2 },
  { id: 3, title: '개인 맞춤형 학습 플래너', creator: '에듀AI', rank: 3 },
  { id: 4, title: 'AI 작곡 어시스턴트', creator: '뮤직AI', rank: 4 },
  { id: 5, title: '소셜 미디어 콘텐츠 자동 생성', creator: '마케팅봇', rank: 5 },
];

function TrendingSection() {
  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
        지금 가장 인기 있는 에셋 TOP 5
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {popularAssets.map((asset) => (
          <Grid item xs={12} sm={6} md={4} key={asset.id}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mr: 2, color: '#673ab7' }}>
                {asset.rank}.
              </Typography>
              <CardContent sx={{ flexGrow: 1, p: 0, '&:last-child': { pb: 0 } }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
                  {asset.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {asset.creator}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default TrendingSection;
