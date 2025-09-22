import React from 'react';
import { Box, Grid, Stack } from '@mui/material';

import UserProfileCard from './UserProfileCard';
import UserAccountSettings from './UserAccountSettings';
import NotificationCenter from './NotificationCenter';
import PaymentMethodManager from './PaymentMethodManager';
import ContactSupport from './ContactSupport';
import TermsAndPolicyLink from './TermsAndPolicyLink';

const MypageLayout = ({ children }) => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <UserProfileCard />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Stack spacing={4}>
                        {/* Role-specific content will be rendered here */}
                        {children}
                        
                        {/* Shared components arranged below */}
                        <UserAccountSettings />
                        <NotificationCenter />
                        <PaymentMethodManager />
                        <ContactSupport />
                        <TermsAndPolicyLink />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MypageLayout;
