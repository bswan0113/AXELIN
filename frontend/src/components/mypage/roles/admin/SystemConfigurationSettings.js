import React from 'react';
import { Box, Typography, TextField, Button, Stack, FormControlLabel, Switch } from '@mui/material';

const SystemConfigurationSettings = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>System Configuration</Typography>
            <Stack spacing={3} sx={{ maxWidth: 400 }}>
                <TextField label="Platform Name" defaultValue="AXELIN" />
                <TextField label="Support Email" defaultValue="support@axelin.com" />
                <FormControlLabel control={<Switch defaultChecked />} label="Enable Maintenance Mode" />
                <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>Save Settings</Button>
            </Stack>
        </Box>
    );
};

export default SystemConfigurationSettings;