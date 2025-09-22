import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const wishlistItems = [
    { id: 1, name: 'Cyberpunk Environment Pack' },
    { id: 2, name: 'Orchestral Score Collection' },
];

const WishlistManager = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>My Wishlist</Typography>
            <List>
                {wishlistItems.map(item => (
                    <ListItem 
                        key={item.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default WishlistManager;