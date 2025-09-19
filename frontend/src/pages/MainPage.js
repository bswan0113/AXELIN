import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/main/Header';
import MainContent from 'components/main/MainContent'; // Import the new MainContent component
import Footer from 'components/main/Footer';

function MainPage({ user }) {
  return (
    <Box>
      <Header user={user} />
      <MainContent /> {/* Use the new MainContent component */}
      <Footer />
    </Box>
  );
}

export default MainPage;
