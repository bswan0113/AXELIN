import React from 'react';
import { Box, Button, Card, CardContent, Typography, Stack, Chip } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const paymentMethods = [
    { id: 1, type: 'Visa', last4: '4242', default: true },
    { id: 2, type: 'Mastercard', last4: '5555', default: false },
];

const PaymentMethodManager = () => {
    return (
        <Box sx={{ maxWidth: 500, p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Payment Methods
            </Typography>
            <Stack spacing={2}>
                {paymentMethods.map(method => (
                    <Card key={method.id} variant="outlined">
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CreditCardIcon sx={{ mr: 2 }} />
                                <Typography variant="body1">
                                    {method.type} ending in {method.last4}
                                </Typography>
                            </Box>
                            {method.default && <Chip label="Default" size="small" />}
                        </CardContent>
                    </Card>
                ))}
            </Stack>
            <Button variant="contained" sx={{ mt: 3 }}>Add New Payment Method</Button>
        </Box>
    );
};

export default PaymentMethodManager;