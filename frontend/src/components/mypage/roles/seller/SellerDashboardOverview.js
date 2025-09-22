import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const SellerDashboardOverview = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>Dashboard Overview</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>Total Sales</Typography>
                            <Typography variant="h5">\$12,345</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>Total Orders</Typography>
                            <Typography variant="h5">678</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>New Inquiries</Typography>
                            <Typography variant="h5">12</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SellerDashboardOverview;