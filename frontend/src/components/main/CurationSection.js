import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

const dummyAssets = [
  { id: 1, title: 'AI 블로그 글쓰기 도우미', description: 'SEO 최적화된 블로그 글을 자동으로 생성합니다.', price: '월 15,000원', image: 'https://via.placeholder.com/300x200/FFC0CB/FFFFFF?text=AI+Asset+1' },
  { id: 2, title: '초고속 이미지 생성기', description: '텍스트로 원하는 이미지를 빠르게 만들어보세요.', price: '무료', image: 'https://via.placeholder.com/300x200/DDA0DD/FFFFFF?text=AI+Asset+2' },
  { id: 3, title: '업무 자동화 챗봇', description: '반복적인 업무를 챗봇으로 해결하여 시간을 절약하세요.', price: '월 25,000원', image: 'https://via.placeholder.com/300x200/BA55D3/FFFFFF?text=AI+Asset+3' },
  { id: 4, title: 'AI 기반 마케팅 분석 툴', description: '데이터를 분석하여 최적의 마케팅 전략을 제시합니다.', price: '월 30,000원', image: 'https://via.placeholder.com/300x200/9370DB/FFFFFF?text=AI+Asset+4' },
];

function CurationSection() {
  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
        이번 주, 주목할 만한 AI 에셋
      </Typography>
      <Grid container spacing={3}>
        {dummyAssets.map((asset) => (
          <Grid item xs={12} sm={6} md={3} key={asset.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="180"
                image={asset.image}
                alt={asset.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
                  {asset.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {asset.description}
                </Typography>
                <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                  {asset.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CurationSection;
