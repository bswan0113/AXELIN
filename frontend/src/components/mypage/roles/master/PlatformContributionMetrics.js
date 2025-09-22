import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const PlatformContributionMetrics = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>Platform Contribution Metrics</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>Curated Assets</Typography>
                            <Typography variant="h5">152</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>Mentees Guided</Typography>
                            <Typography variant="h5">12</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PlatformContributionMetrics;