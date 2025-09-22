// --- START OF FILE src/components/main/RecommendedAssetsSection.js (Full Code - Swiper Applied) ---

import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';
import { fetchProductsByCategoryIds, fetchPopularProducts } from 'services/productService'; 
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

// [핵심 수정 1] Swiper 관련 컴포넌트, 모듈, CSS를 import 합니다.
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useParams, Link as RouterLink } from 'react-router-dom';
const gradientColor = 'linear-gradient(to right, #FFAABF, #D6ADFF, #A3B9FF)';

// [핵심 수정 2] Swiper 네비게이션/페이지네이션 버튼의 스타일을 지정합니다.
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

const RecommendedAssetsSection = ({ user, recommendedAssetTitle }) => {
  const displayName = user?.nickname || user?.name;

  const [recommendedAssets, setRecommendedAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const loadRecommendedAssets = async () => {
    setIsLoading(true);
    let categoryIdsToFetch = [];

    // --- [핵심 수정] 데이터 로드 우선순위 로직 ---

    // 우선순위 1: 로그인 사용자의 관심사 (user.interests 사용)
    if (user && user.interests && user.interests.length > 0) {
      console.log("로그인 사용자 관심사 기반으로 에셋 로드:", user.interests);
      categoryIdsToFetch = user.interests;
    } 
    // 우선순위 2: 비로그인 사용자의 온보딩 선택지
    else if (!user) {
      const selectionsStr = localStorage.getItem('onboarding_selections');
      if (selectionsStr) {
        try {
          const selections = JSON.parse(selectionsStr);
          if (selections.subCategory && selections.subCategory.id) {
            console.log("온보딩 선택지 기반으로 에셋 로드:", [selections.subCategory.id]);
            categoryIdsToFetch = [selections.subCategory.id];
          }
        } catch (e) {
          console.error("온보딩 선택지 파싱 오류:", e);
        }
      }
    }

    // --- API 호출 로직 ---
    try {
      let assets = [];
      if (categoryIdsToFetch.length > 0) {
        // 우선순위 1 또는 2에 해당하면 ID 기반으로 에셋을 가져옵니다.
        assets = await fetchProductsByCategoryIds(categoryIdsToFetch);
      } else {
        // 우선순위 3 (폴백): 보여줄 ID가 없는 경우
        console.log("폴백 로직 실행: 인기 에셋 로드");
        assets = await fetchPopularProducts(); // 'fetchPopularProducts'는 예시 함수명입니다.
      }
      setRecommendedAssets(assets.slice(0, 4));
    } catch (error) {
      console.error("추천 에셋을 불러오는 데 실패했습니다:", error);
      setRecommendedAssets([]);
    } finally {
      setIsLoading(false);
    }
  };

  loadRecommendedAssets();
}, [user]); 

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
              {`${displayName}`}
            </Box>
            {` ${recommendedAssetTitle}`}
          </>
        ) : (
          recommendedAssetTitle || '추천 에셋'
        )}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
        AXELIN이 제안하는 당신의 목표 달성을 위한 최적의 AI 에셋을 만나보세요.
      </Typography>

      {recommendedAssets.length === 0 && !isLoading ? (
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 5 }}>
          표시할 추천 에셋이 없습니다.
        </Typography>
      ) : (
        // [핵심 수정 3] 기존 Grid 컨테이너를 Swiper를 감싸는 Box로 변경합니다.
        <Box sx={swiperContainerStyles}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            // [핵심 수정 4] breakpoints를 사용하여 반응형으로 슬라이드 개수를 조절합니다.
            // 기존 Grid의 xs(1), sm(2), md(4) 설정을 동일하게 구현합니다.
            breakpoints={{
              // 화면 너비 600px 이상일 때 (sm)
              600: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              // 화면 너비 900px 이상일 때 (md)
              900: {
                slidesPerView: 4, // md={3} 이므로 12/3 = 4개의 카드를 보여줍니다.
                spaceBetween: 24,
              },
            }}
            style={{ padding: '16px 40px 40px 40px' }}
          >
            {recommendedAssets.map((asset) => (
              // [핵심 수정 5] Grid item 대신 SwiperSlide를 사용합니다.
              <SwiperSlide key={asset.id} style={{ height: 'auto' }}>
                <RouterLink to={`/product/${asset.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0px 4px 15px rgba(0,0,0,0.05)', borderRadius: '12px', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={asset.content?.thumbnail_url || 'https://via.placeholder.com/300x160.png?text=AXELIN'}
                    alt={asset.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                    <Typography 
                      gutterBottom 
                      variant="h6" 
                      component="div" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: '#333',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        minHeight: '3rem'
                      }}
                    >
                      {asset.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', my: 1 }}>
                      <PersonOutlineIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                      <Typography variant="body2">
                        {asset.seller_nickname || '판매자'}
                      </Typography>
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 'auto', alignSelf: 'flex-end', color: '#5E81F4' }}>
                      {asset.price > 0 ? `${Number(asset.price).toLocaleString()}원` : '무료'}
                    </Typography>
                  </CardContent>
                </Card>
                </RouterLink>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </Box>
  );
};

export default RecommendedAssetsSection;
// --- END OF FILE src/components/main/RecommendedAssetsSection.js (Full Code - Swiper Applied) ---