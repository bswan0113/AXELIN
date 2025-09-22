import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const AdminDashboardOverview = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>Admin Dashboard</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>Total Users</Typography>
                            <Typography variant="h5">1,234</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>Pending Approvals</Typography>
                            <Typography variant="h5">56</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>Open Support Tickets</Typography>
                            <Typography variant="h5">23</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboardOverview;