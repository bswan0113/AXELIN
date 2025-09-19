import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/main/Header';
import MainContent from 'components/main/MainContent';
import Footer from 'components/main/Footer';
import { useAuth } from 'hooks/useAuth'; // useAuth 훅 임포트

function MainPage() {
  const { user } = useAuth(); // useAuth 훅을 사용하여 user 객체 가져오기

  return (
    <Box>
      <Header user={user} />
      <MainContent />
      <Footer />
    </Box>
  );
}

export default MainPage;
