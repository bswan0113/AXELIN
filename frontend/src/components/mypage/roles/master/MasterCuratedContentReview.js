import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Chip } from '@mui/material';

const contentForReview = [
    { id: 1, title: 'New Sci-Fi Asset Pack', author: 'seller_jane', status: 'Pending' },
    { id: 2, title: 'Tutorial: Advanced Character Rigging', author: 'seller_john', status: 'Pending' },
];

const MasterCuratedContentReview = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>Curated Content Review</Typography>
            <List>
                {contentForReview.map(content => (
                    <ListItem 
                        key={content.id}
                        secondaryAction={
                            <Box>
                                <Button size="small" variant="outlined" sx={{ mr: 1 }}>Approve</Button>
                                <Button size="small" variant="outlined" color="error">Reject</Button>
                            </Box>
                        }
                    >
                        <ListItemText 
                            primary={content.title} 
                            secondary={`By: ${content.author}`} 
                        />
                        <Chip label={content.status} size="small" />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default MasterCuratedContentReview;