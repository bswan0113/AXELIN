import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material';

const inquiries = [
    { id: 1, subject: 'Question about Spaceship Model', from: 'buyer123', date: '2 hours ago' },
    { id: 2, subject: 'Issue with Music Pack download', from: 'musiclover', date: '1 day ago' },
];

const CustomerInquiryManager = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>Customer Inquiries</Typography>
            <List sx={{ bgcolor: 'background.paper' }}>
                {inquiries.map((inquiry, index) => (
                    <React.Fragment key={inquiry.id}>
                        <ListItem 
                            alignItems="flex-start"
                            secondaryAction={<Button size="small">Reply</Button>}
                        >
                            <ListItemText
                                primary={inquiry.subject}
                                secondary={`From: ${inquiry.from} - ${inquiry.date}`}
                            />
                        </ListItem>
                        {index < inquiries.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
};

export default CustomerInquiryManager;