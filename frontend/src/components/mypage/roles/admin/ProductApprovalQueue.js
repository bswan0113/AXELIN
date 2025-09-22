import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const approvalQueue = [
    { id: 1, name: 'Futuristic City Pack', seller: 'seller_x' },
    { id: 2, name: 'Cute Voxel Animals', seller: 'seller_y' },
];

const ProductApprovalQueue = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>Product Approval Queue</Typography>
            <List>
                {approvalQueue.map(item => (
                    <ListItem 
                        key={item.id}
                        secondaryAction={
                            <Box>
                                <Button size="small" variant="outlined" sx={{ mr: 1 }}>Approve</Button>
                                <Button size="small" variant="outlined" color="error">Reject</Button>
                            </Box>
                        }
                    >
                        <ListItemText primary={item.name} secondary={`By: ${item.seller}`} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ProductApprovalQueue;