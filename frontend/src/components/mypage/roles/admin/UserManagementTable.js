import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip } from '@mui/material';

const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'BUYER', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'SELLER', status: 'Active' },
    { id: 3, name: 'Master Yoda', email: 'yoda@example.com', role: 'MASTER', status: 'Banned' },
];

const UserManagementTable = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>User Management</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell><Chip label={user.role} size="small" /></TableCell>
                                <TableCell><Chip label={user.status} color={user.status === 'Active' ? 'success' : 'error'} size="small" /></TableCell>
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

export default UserManagementTable;