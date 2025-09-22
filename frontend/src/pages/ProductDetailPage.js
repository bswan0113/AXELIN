// src/pages/ProductDetailPage.js

import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, CircularProgress, Button, Grid, CardMedia, Paper, Divider, Stack } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { fetchProductById } from 'services/productService';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err) {
        setError('상품 정보를 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          {error || '상품을 찾을 수 없습니다.'}
        </Typography>
        <Button component={RouterLink} to="/" variant="contained">
          홈으로 돌아가기
        </Button>
      </Container>
    );
  }

  // 1단계에서 JOIN한 판매자 정보를 가져옵니다. seller가 배열일 수 있으므로 첫번째 요소를 사용합니다.
  const sellerNickname = Array.isArray(product.seller) ? product.seller[0]?.nickname : product.seller?.nickname;

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ p: { xs: 2, md: 5 }, borderRadius: '16px', border: '1px solid #e9ecef' }}>
          <Grid container spacing={{ xs: 3, md: 6 }}>
            {/* 왼쪽: 상품 썸네일 */}
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={product.content?.thumbnail_url || 'https://via.placeholder.com/600x400.png?text=AXELIN'}
                alt={product.title}
                sx={{ width: '100%', borderRadius: '12px', aspectRatio: '16/9', objectFit: 'cover' }}
              />
            </Grid>

            {/* 오른쪽: 상품 정보 */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2} sx={{ height: '100%' }}>
                <Typography variant="h4" component="h1" fontWeight="700" color="text.primary">
                  {product.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                  <PersonOutlineIcon sx={{ fontSize: '1.2rem', mr: 0.5 }} />
                  <Typography variant="body1">
                    {sellerNickname || '정보 없음'}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />

                <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1, whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                  {product.description}
                </Typography>
                
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h5" fontWeight="700" color="#333" gutterBottom>
                    {product.price > 0 ? `${Number(product.price).toLocaleString()}원` : '무료'}
                  </Typography>
                </Box>

                <Button variant="contained" size="large" fullWidth sx={{ py: 1.5, fontSize: '1rem', fontWeight: 'bold', bgcolor: '#5E81F4', '&:hover': { bgcolor: '#4d6dce' } }}>
                  구매하기
                </Button>
                
                <Button component={RouterLink} to="/" variant="text" size="small">
                  목록으로 돌아가기
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProductDetailPage;