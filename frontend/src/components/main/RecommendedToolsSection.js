// --- START OF FILE src/components/main/RecommendedToolsSection.js (Full Code - Swiper Applied) ---

import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress, Link, Avatar } from '@mui/material';
import { fetchToolsByCategoryIds } from 'services/aiToolService';

// [핵심 수정 1] Swiper 관련 컴포넌트, 모듈, CSS를 import 합니다.
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// [핵심 수정 2] Swiper 네비게이션/페이지네이션 버튼의 스타일을 지정합니다. (선택사항)
const swiperContainerStyles = {
  // position을 relative로 설정해야 자식 요소인 버튼들의 위치를 잡을 수 있습니다.
  position: 'relative',
  // 화살표 버튼 스타일
  '& .swiper-button-prev, & .swiper-button-next': {
    color: 'primary.main', // MUI 테마의 primary 색상 사용
    top: '45%', // 버튼의 세로 위치를 카드 중앙으로 조정
  },
  '& .swiper-button-prev': {
    left: 0, // 왼쪽 여백 제거
  },
  '& .swiper-button-next': {
    right: 0, // 오른쪽 여백 제거
  },
  // 페이지네이션(점) 활성화 시 스타일
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
    if (interestIds && interestIds.length > 0) {
      const loadRecommendedTools = async () => {
        setIsLoading(true);
        try {
          const tools = await fetchToolsByCategoryIds(interestIds);
          // 이미지에서 5개가 보이므로 5개로 수정 (이 로직은 그대로 유지)
          setRecommendedTools(tools.slice(0, 5));
        } catch (error) {
          console.error("추천 AI 툴을 불러오는 데 실패했습니다:", error);
          setRecommendedTools([]);
        } finally {
          setIsLoading(false);
        }
      };
      loadRecommendedTools();
    } else {
      setIsLoading(false);
      setRecommendedTools([]);
    }
  }, [interestIds]);

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
        // [핵심 수정 3] 기존 Grid 컨테이너를 Swiper를 감싸는 Box로 변경합니다.
        <Box sx={swiperContainerStyles}>
          <Swiper
            // 사용할 모듈(네비게이션, 페이지네이션)을 등록합니다.
            modules={[Navigation, Pagination]}
            // 슬라이드 간의 간격(px)을 설정합니다. (기존 spacing={3} -> 24px)
            spaceBetween={24}
            // 기본적으로 보여줄 슬라이드 수 (모바일 기준)
            slidesPerView={1}
            // 좌우 화살표 네비게이션을 활성화합니다.
            navigation
            // 하단 페이지네이션(점)을 활성화하고 클릭 가능하게 합니다.
            pagination={{ clickable: true }}
            // [핵심 수정 4] breakpoints를 사용하여 반응형으로 슬라이드 개수를 조절합니다.
            // 기존 Grid의 xs, sm, md 설정을 동일하게 구현합니다.
            breakpoints={{
              // 화면 너비 600px 이상일 때 (sm)
              600: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              // 화면 너비 900px 이상일 때 (md)
              900: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            // 패딩을 주어 네비게이션/페이지네이션이 잘리지 않도록 공간을 확보합니다.
            style={{ padding: '16px 40px 40px 40px' }}
          >
            {recommendedTools.map((tool) => (
              // [핵심 수정 5] Grid item 대신 SwiperSlide를 사용합니다.
              <SwiperSlide key={tool.id} style={{ height: 'auto' }}>
                {/* Card 내부는 기존의 flexbox 구조를 그대로 유지하여 높이를 맞춥니다. */}
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
                        // 3줄 제한 로직은 그대로 유지합니다.
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
                    <Link href="#" sx={{ mt: 'auto', pt: 1, fontWeight: 'bold', alignSelf: 'flex-start' }}>
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
// --- END OF FILE src/components/main/RecommendedToolsSection.js (Full Code - Swiper Applied) ---