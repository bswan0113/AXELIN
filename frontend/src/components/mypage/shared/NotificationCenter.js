import React from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';

const notifications = [
    { id: 1, primary: 'Your product \'Awesome Gadget\' has been sold!', secondary: '5 minutes ago' },
    { id: 2, primary: 'You have a new message from a buyer.', secondary: '1 hour ago' },
    { id: 3, primary: 'Your weekly sales report is ready.', secondary: 'Yesterday' },
];

const NotificationCenter = () => {
    return (
        <Box sx={{ maxWidth: 500, p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Notifications
            </Typography>
            <List sx={{ bgcolor: 'background.paper' }}>
                {notifications.map((notification, index) => (
                    <React.Fragment key={notification.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={notification.primary}
                                secondary={notification.secondary}
                            />
                        </ListItem>
                        {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
            <Button variant="outlined" sx={{ mt: 2 }}>Clear All</Button>
        </Box>
    );
};

export default NotificationCenter;