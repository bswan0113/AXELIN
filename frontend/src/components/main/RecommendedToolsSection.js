// --- START OF FILE src/components/main/RecommendedToolsSection.js (Full Code - Link Fixed) ---

import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress, Link, Avatar } from '@mui/material';
import { fetchToolsByCategoryIds,fetchPopularTools } from 'services/aiToolService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiperContainerStyles = {
  position: 'relative',
  '& .swiper-button-prev, & .swiper-button-next': {
    color: 'primary.main',
    top: '45%',
  },
  '& .swiper-button-prev': {
    left: 0,
  },
  '& .swiper-button-next': {
    right: 0,
  },
  '& .swiper-pagination-bullet-active': {
    backgroundColor: 'primary.main',
  },
};

const RecommendedToolsSection = ({user, recommendedToolsTitle, interestIds }) => {
  const [recommendedTools, setRecommendedTools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const displayName = user?.nickname || user?.name;
  const gradientColor = 'linear-gradient(to right, #FFAABF, #D6ADFF, #A3B9FF)';

  useEffect(() => {
    const loadRecommendedTools = async () => {
      setIsLoading(true);
      let categoryIdsToFetch = [];

      if (interestIds && interestIds.length > 0) {
        console.log("로그인 사용자 관심사 기반으로 툴 로드:", interestIds);
        categoryIdsToFetch = interestIds;
      } 
      else if (!user) {
        const selectionsStr = localStorage.getItem('onboarding_selections');
        if (selectionsStr) {
          try {
            const selections = JSON.parse(selectionsStr);
            if (selections.subCategory && selections.subCategory.id) {
              console.log("온보딩 선택지 기반으로 툴 로드:", [selections.subCategory.id]);
              categoryIdsToFetch = [selections.subCategory.id];
            }
          } catch (e) {
            console.error("온보딩 선택지 파싱 오류:", e);
          }
        }
      }
      
      try {
        let tools = [];
        if (categoryIdsToFetch.length > 0) {
          tools = await fetchToolsByCategoryIds(categoryIdsToFetch);
        } else {
          console.log("폴백 로직 실행: 인기 툴 로드");
          tools = await fetchPopularTools();
        }
        setRecommendedTools(tools.slice(0, 5));
      } catch (error) {
        console.error("추천 AI 툴을 불러오는 데 실패했습니다:", error);
        setRecommendedTools([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecommendedTools();
  }, [user, interestIds]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
        {displayName ? (
          <>
            <Box component="span" sx={{ background: gradientColor, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {`${displayName}님`}
            </Box>
            {` ${recommendedToolsTitle}`}
          </>
        ) : (
          recommendedToolsTitle || '추천 AI 툴'
        )}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
        관심 분야에 최적화된 AI 툴들을 한눈에 확인하세요.
      </Typography>

      {recommendedTools.length === 0 && !isLoading ? (
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 5 }}>
          표시할 추천 AI 툴이 없습니다.
        </Typography>
      ) : (
        <Box sx={swiperContainerStyles}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              600: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              900: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            style={{ padding: '16px 40px 40px 40px' }}
          >
            {recommendedTools.map((tool) => (
              <SwiperSlide key={tool.id} style={{ height: 'auto' }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2, boxShadow: '0px 4px 15px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', fontWeight: 'bold', mr: 2 }}>
                      {tool.name.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {tool.name}
                    </Typography>
                  </Box>
                  <CardContent sx={{ p: '0 !important', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '3',
                        WebkitBoxOrient: 'vertical',
                        minHeight: '4.5rem'
                      }}
                    >
                      {tool.description}
                    </Typography>
                    
                    {/* --- [핵심 수정] --- */}
                    {/* 1. href에 tool 객체의 website_url을 연결합니다. */}
                    {/* 2. target="_blank"와 rel="noopener noreferrer"를 추가하여 새 탭에서 안전하게 열리도록 합니다. */}
                    {/* 3. 혹시 URL이 없는 경우를 대비해 || '#' 폴백을 추가합니다. */}
                    <Link 
                      href={tool.website_url || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      sx={{ mt: 'auto', pt: 1, fontWeight: 'bold', alignSelf: 'flex-start' }}
                    >
                      사이트 바로가기 →
                    </Link>

                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </Box>
  );
};

export default RecommendedToolsSection;
// --- END OF FILE src/components/main/RecommendedToolsSection.js (Full Code - Link Fixed) ---