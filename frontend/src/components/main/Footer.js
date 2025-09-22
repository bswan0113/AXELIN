import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';
import { usePopup } from '../../contexts/PopupContext';

function Footer() {
  const { showPopup } = usePopup();

  const handleTermsClick = (event) => {
    event.preventDefault();
    showPopup('69715fcc-091e-4ac6-bbf8-2e0d99460cd6');
  };

  const handlePrivacyClick = (event) => {
    event.preventDefault();
    showPopup('a2a56116-1d05-4832-ac3a-6bd5f4b23f5b');
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', py: 4, mt: 8, borderTop: '1px solid #eee' }}>
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          © 2025 AXELIN. All rights reserved.
        </Typography>
        <Box>
          <Link component="button" onClick={handleTermsClick} color="inherit" sx={{ mx: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            이용약관
          </Link>
          <Link component="button" onClick={handlePrivacyClick} color="inherit" sx={{ mx: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
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

