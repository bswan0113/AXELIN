import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'background.default',
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>
        로딩 중...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
