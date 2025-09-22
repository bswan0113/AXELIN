import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const products = [
    { id: 1, name: 'Spaceship Model', price: '\$49.99', stock: 50, status: 'Active' },
    { id: 2, name: 'Fantasy Music Pack', price: '\$29.99', stock: 100, status: 'Active' },
];

const ProductManagementTable = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>Product Management</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>{product.status}</TableCell>
                                <TableCell>
                                    <Button size="small" variant="outlined">Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ProductManagementTable;