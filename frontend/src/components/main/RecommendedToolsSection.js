// src/components/main/RecommendedToolsSection.js (이름 그라데이션 적용 완료)

import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, Avatar, Link, CircularProgress } from '@mui/material';
import { fetchToolsByCategoryIds } from 'services/aiToolService';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { alpha } from '@mui/material/styles';

const RecommendedToolsSection = ({ recommendedToolsTitle, userCategory, interestIds }) => {
  const [recommendedTools, setRecommendedTools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log('RecommendedToolsSection에서 확인한 interestIds:', recommendedToolsTitle);
  useEffect(() => {
    const loadRecommendedTools = async () => {
      setIsLoading(true);
      try {
        const tools = await fetchToolsByCategoryIds(interestIds);
        setRecommendedTools(tools);
      } catch (error) {
        console.error("추천 AI 툴을 불러오는 데 실패했습니다:", error);
        setRecommendedTools([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadRecommendedTools();
  }, [interestIds]);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1.5, color: '#212121' }}>
        {recommendedToolsTitle}
      </Typography>
      <Typography variant="body1" sx={{ mb: 5, color: 'text.secondary' }}>
        {userCategory ? `관심 분야(${userCategory})에` : '당신을 위해'} 최적화된 AI 툴들을 한눈에 확인하세요.
      </Typography>
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      ) : recommendedTools.length === 0 ? (
        <Box sx={{ textAlign: 'center', p: { xs: 3, sm: 5 }, backgroundColor: (theme) => alpha(theme.palette.grey[500], 0.04), borderRadius: 3, mt: 5 }}>
          <InfoOutlinedIcon sx={{ color: 'text.secondary', fontSize: 40, mb: 2 }} />
          <Typography sx={{ color: 'text.secondary' }}>
            표시할 추천 AI 툴이 없습니다.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {recommendedTools.map((tool) => (
            <Grid item xs={12} sm={6} key={tool.id} sx={{ display: 'flex' }}>
              <Card sx={{
                width: '100%', p: 2.5, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
                display: 'flex', flexDirection: 'column', 
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <Avatar src={tool.logo_url} alt={tool.name} sx={{ width: 56, height: 56, mr: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                  {/* [수정] 이름(name)에 그라데이션 스타일을 적용합니다. */}
                  <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                    display: 'inline-block',
                    background: 'linear-gradient(to right, #FF6B8F, #B46BFF, #6B8FFF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    {tool.name}
                  </Typography>
                </Box>
                
                <Box sx={{ flexGrow: 1, mb: 1.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3,
                    overflow: 'hidden', textOverflow: 'ellipsis', minHeight: '60px',
                  }}>
                    {tool.description}
                  </Typography>
                </Box>

                <Link href={tool.website_url} target="_blank" rel="noopener" variant="body2" sx={{ display: 'inline-flex', alignItems: 'center', fontWeight: 'bold', textDecoration: 'none', color: 'primary.main', '&:hover': { textDecoration: 'underline' }}}>
                  자세히 보기 <ArrowForwardIcon sx={{ fontSize: '1rem', ml: 0.5 }} />
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RecommendedToolsSection;