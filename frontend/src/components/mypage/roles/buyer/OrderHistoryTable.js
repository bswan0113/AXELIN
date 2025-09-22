import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const orders = [
    { id: '#12345', date: '2023-10-27', total: '\$79.98', status: 'Completed' },
    { id: '#12344', date: '2023-10-25', total: '\$19.99', status: 'Completed' },
];

const OrderHistoryTable = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>Order History</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.total}</TableCell>
                                <TableCell>{order.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default OrderHistoryTable;