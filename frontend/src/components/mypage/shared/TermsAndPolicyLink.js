import React from 'react';
import { Box, Link, Typography, Stack } from '@mui/material';

const TermsAndPolicyLink = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Legal
            </Typography>
            <Stack spacing={1} direction="row">
                <Link href="/terms" underline="hover">
                    Terms of Service
                </Link>
                <Typography variant="body2">-</Typography>
                <Link href="/privacy" underline="hover">
                    Privacy Policy
                </Link>
            </Stack>
        </Box>
    );
};

export default TermsAndPolicyLink;