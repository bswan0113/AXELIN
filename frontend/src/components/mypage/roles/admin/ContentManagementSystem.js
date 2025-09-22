import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

const ContentManagementSystem = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>Content Management</Typography>
            <Stack direction="row" spacing={2}>
                <Button variant="contained">Manage Banners</Button>
                <Button variant="contained">Edit Announcements</Button>
                <Button variant="contained">Update FAQs</Button>
            </Stack>
        </Box>
    );
};

export default ContentManagementSystem;