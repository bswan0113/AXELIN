import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';

const RevenueAndSettlementRequest = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>Revenue & Settlement</Typography>
            <Card variant="outlined">
                <CardContent>
                    <Typography color="text.secondary" gutterBottom>Available for Settlement</Typography>
                    <Typography variant="h4" component="div" gutterBottom>
                        \$5,432.10
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                        Next settlement date: 2023-12-01
                    </Typography>
                    <Button variant="contained">Request Settlement</Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RevenueAndSettlementRequest;