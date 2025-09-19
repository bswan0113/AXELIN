// --- START OF FILE src/components/main/MainContent.js (Full Code) ---

import React, { useContext, useState, useEffect } from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';
import AuthContext from 'contexts/AuthContext';
import { getAllCategories } from 'services/categoryService'; 

import HeroSection from './HeroSection';
import RecommendedAssetsSection from './RecommendedAssetsSection';
import RecommendedToolsSection from './RecommendedToolsSection';
import TrendingSection from './TrendingSection';
import CreatorCtaSection from './CreatorCtaSection';
import CurationSection from './CurationSection';

function MainContent() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log('MainContent에서 확인한 user 객체:', user);
  const isLoggedIn = !!user;

  const [userCategory, setUserCategory] = useState('인기');
  const [interestIds, setInterestIds] = useState([]);

  useEffect(() => {
    const getEffectiveInterestIds = () => {
      if (isLoggedIn && user.interests && user.interests.length > 0) {
        return user.interests;
      }
      if (!isLoggedIn) {
        const selectionsJson = localStorage.getItem('onboarding_final_selections');
        if (selectionsJson) {
          try {
            const selections = JSON.parse(selectionsJson);
            const allIds = [
              selections.mainCategory?.id,
              selections.subCategory?.id,
              ...(selections.filters?.map(f => f.id) || [])
            ].filter(Boolean);
            return [...new Set(allIds)];
          } catch (error) {
            console.error("온보딩 데이터 파싱 오류:", error);
            return [];
          }
        }
      }
      return [];
    };

    const effectiveIds = getEffectiveInterestIds();
    setInterestIds(effectiveIds);

    if (effectiveIds.length > 0) {
      const fetchPrimaryCategoryName = async () => {
        try {
          const allCategories = await getAllCategories();
          const primaryCategory = allCategories.find(cat => cat.id === effectiveIds[0]);
          if (primaryCategory) setUserCategory(primaryCategory.name);
          else setUserCategory('추천');
        } catch (error) {
          console.error("카테고리 정보 조회 실패:", error);
          setUserCategory('추천');
        }
      };
      fetchPrimaryCategoryName();
    } else {
      setUserCategory('인기');
    }
  }, [user, isLoggedIn]);

  // [수정] recommendedAssetsTitle 변수는 더 이상 사용하지 않으므로 삭제했습니다.
  const recommendedToolsTitle = isLoggedIn ? `${user?.nickname || user?.name}님께 유용한 AI 툴 디렉토리` : '유용한 AI 툴 디렉토리';
  
  return (
    <Box sx={{ flexGrow: 1, py: 4, bgcolor: '#f9f9f9' }}>
      <Container maxWidth="lg">
        <HeroSection user={user} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8, mt: 8 }}>
          
          {/* [수정] title prop 대신 user 객체 자체를 넘겨줍니다. */}
          <RecommendedAssetsSection user={user} userCategory={userCategory} />
          
          <RecommendedToolsSection recommendedToolsTitle={recommendedToolsTitle} userCategory={userCategory} interestIds={interestIds} />
          
          <Box>
            {/* <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
              {isLoggedIn ? (
                <>
                  지금, <Box component="span" sx={{ background: 'linear-gradient(to right, #FF6B8F, #B46BFF, #6B8FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{userCategory}</Box> 분야에서 인기 있는 에셋
                </>
              ) : '지금 인기 있는 에셋'}
            </Typography> */}
            {/* <Grid container spacing={4}>
              <Grid item xs={12}>
                <TrendingSection userCategory={userCategory} />
              </Grid>
            </Grid> */}
          </Box>

          {/* <CurationSection userCategory={userCategory} /> */}
          <CreatorCtaSection />
        </Box>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Link onClick={() => navigate('/explore')} sx={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#B46BFF', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
            전체 카테고리 둘러보기
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default MainContent;
// --- END OF FILE src/components/main/MainContent.js (Full Code) ---