import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', py: 4, mt: 8, borderTop: '1px solid #eee' }}>
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          © 2025 AXELIN. All rights reserved.
        </Typography>
        <Box>
          <Link href="#" color="inherit" sx={{ mx: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            이용약관
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            개인정보처리방침
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            고객센터
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
