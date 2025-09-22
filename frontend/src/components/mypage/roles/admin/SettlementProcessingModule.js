import React from 'react';
import { Box, Typography, Card, CardContent, Button, List, ListItem, ListItemText } from '@mui/material';

const pendingSettlements = [
    { id: 1, seller: 'seller_jane', amount: '\$1,234.56' },
    { id: 2, seller: 'seller_john', amount: '\$789.00' },
];

const SettlementProcessingModule = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>Settlement Processing</Typography>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Pending Requests
                    </Typography>
                    <List dense>
                        {pendingSettlements.map(settlement => (
                            <ListItem 
                                key={settlement.id}
                                secondaryAction={<Button size="small">Process</Button>}
                            >
                                <ListItemText primary={`Seller: ${settlement.seller}`} secondary={`Amount: ${settlement.amount}`} />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Box>
    );
};

export default SettlementProcessingModule;