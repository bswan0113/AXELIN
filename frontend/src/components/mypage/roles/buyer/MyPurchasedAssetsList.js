import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Avatar, ListItemAvatar } from '@mui/material';

const purchasedAssets = [
    { id: 1, name: '3D Model of a Spaceship', price: '\$49.99', imageUrl: '' },
    { id: 2, name: 'Medieval Fantasy Music Pack', price: '\$29.99', imageUrl: '' },
];

const MyPurchasedAssetsList = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>My Purchased Assets</Typography>
            <List>
                {purchasedAssets.map(asset => (
                    <ListItem key={asset.id}>
                        <ListItemAvatar>
                            <Avatar src={asset.imageUrl} />
                        </ListItemAvatar>
                        <ListItemText primary={asset.name} secondary={asset.price} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default MyPurchasedAssetsList;