import React from 'react';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';

const ContactSupport = () => {
    return (
        <Box sx={{ maxWidth: 500, p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Contact Support
            </Typography>
            <Stack spacing={3}>
                <TextField 
                    label="Subject" 
                    variant="outlined" 
                />
                <TextField 
                    label="Message" 
                    variant="outlined" 
                    multiline
                    rows={6}
                />
                <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>Send Message</Button>
            </Stack>
        </Box>
    );
};

export default ContactSupport;