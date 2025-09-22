import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const SalesPerformanceChart = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>Sales Performance</Typography>
            <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300, bgcolor: '#f5f5f5' }}>
                <Typography color="text.secondary">[Chart Placeholder]</Typography>
            </Paper>
        </Box>
    );
};

export default SalesPerformanceChart;