// --- START OF FILE src/components/main/RecommendedAssetsSection.js (Full Code) ---

import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';
import { fetchToolsByCategoryIds } from 'services/aiToolService';

const gradientColor = 'linear-gradient(to right, #FF6B8F, #B46BFF, #6B8FFF)';

const RecommendedAssetsSection = ({ user, userCategory }) => {
  // [수정] user.nickname을 우선적으로 사용하고, 없으면 user.name을, 그것도 없으면 null을 할당합니다.
  const displayName = user?.nickname || user?.name;

  const [recommendedAssets, setRecommendedAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // user 객체와 user.interests 배열이 있는지 확인합니다.
    if (user && user.interests && user.interests.length > 0) {
      const loadRecommendedAssets = async () => {
        setIsLoading(true);
        try {
          // 서비스 함수를 호출하여 데이터를 가져옵니다.
          const assets = await fetchToolsByCategoryIds(user.interests);
          // 가져온 데이터 중 최대 4개만 표시하도록 잘라냅니다.
          setRecommendedAssets(assets.slice(0, 4));
        } catch (error) {
          console.error("추천 에셋을 불러오는 데 실패했습니다:", error);
          setRecommendedAssets([]); // 에러 발생 시 빈 배열로 설정
        } finally {
          setIsLoading(false);
        }
      };

      loadRecommendedAssets();
    } else {
      // 사용자 관심사가 없으면 로딩을 멈추고 빈 배열로 설정합니다.
      setIsLoading(false);
      setRecommendedAssets([]);
    }
  }, [user]); // user prop이 바뀔 때마다 이 effect를 다시 실행합니다.

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
        {/* [수정] userName 대신 새로운 변수인 displayName을 사용합니다. */}
        {displayName ? (
          <>
            <Box component="span" sx={{ background: gradientColor, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {`${displayName}님`}
            </Box>
            을 위한 추천 에셋
          </>
        ) : (
          '추천 에셋'
        )}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
        AXELIN이 제안하는 당신의 목표 달성을 위한 최적의 AI 에셋을 만나보세요.
      </Typography>

      {recommendedAssets.length === 0 ? (
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', mt: 5 }}>
          표시할 추천 에셋이 없습니다.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {recommendedAssets.map((asset) => (
            <Grid item xs={12} sm={6} md={3} key={asset.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0px 4px 15px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={asset.logo_url || 'https://via.placeholder.com/300x140.png?text=No+Image'}
                  alt={asset.name}
                  sx={{ borderRadius: '12px 12px 0 0', objectFit: 'contain', p: 2 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>{asset.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{asset.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RecommendedAssetsSection;

// --- END OF FILE src/components/main/RecommendedAssetsSection.js (Full Code) ---