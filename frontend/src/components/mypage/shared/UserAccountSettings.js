import React from 'react';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';

const UserAccountSettings = () => {
    return (
        <Box sx={{ maxWidth: 500, p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Account Settings
            </Typography>
            <Stack spacing={3}>
                <TextField 
                    label="Username" 
                    variant="outlined" 
                    defaultValue="Test User"
                />
                <TextField 
                    label="Email Address" 
                    variant="outlined" 
                    defaultValue="test@example.com"
                    type="email"
                />
                <TextField 
                    label="New Password" 
                    variant="outlined" 
                    type="password"
                />
                <TextField 
                    label="Confirm New Password" 
                    variant="outlined" 
                    type="password"
                />
                <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>Save Changes</Button>
            </Stack>
        </Box>
    );
};

export default UserAccountSettings;