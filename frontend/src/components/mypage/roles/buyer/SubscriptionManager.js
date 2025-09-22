import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, Chip } from '@mui/material';

const SubscriptionManager = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>My Subscription</Typography>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div">
                        Pro Plan
                    </Typography>
                    <Chip label="Active" color="success" size="small" sx={{ mb: 1.5 }} />
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Renews on: 2023-11-27
                    </Typography>
                    <Typography variant="body2">
                        Access to all premium assets and features.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Cancel Subscription</Button>
                    <Button size="small">Change Plan</Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default SubscriptionManager;