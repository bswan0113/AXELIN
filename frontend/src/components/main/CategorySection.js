import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WorkIcon from '@mui/icons-material/Work';
import PaletteIcon from '@mui/icons-material/Palette';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const categories = [
  { name: '콘텐츠 & 마케팅 자동화', icon: <ContentCopyIcon sx={{ fontSize: 40, color: '#673ab7' }} /> },
  { name: '업무 효율화 & 생산성 향상', icon: <WorkIcon sx={{ fontSize: 40, color: '#673ab7' }} /> },
  { name: '이미지 & 디자인 생성', icon: <PaletteIcon sx={{ fontSize: 40, color: '#673ab7' }} /> },
  { name: 'AI로 수익 창출 & 부업', icon: <MonetizationOnIcon sx={{ fontSize: 40, color: '#673ab7' }} /> },
];

function CategorySection() {
  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
        어떤 AI가 필요하신가요?
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-5px)',
                },
                transition: 'all 0.3s ease-in-out',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
                border: '1px solid #eee'
              }}
            >
              {category.icon}
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'medium', color: '#333' }}>
                {category.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CategorySection;
