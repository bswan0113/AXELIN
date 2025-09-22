import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Checkbox } from '@mui/material';

const tasks = [
    { id: 1, description: 'Review 10 new asset submissions.', completed: true },
    { id: 2, description: 'Resolve 5 user-reported content flags.', completed: false },
];

const DelegatedAdminTasks = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>Delegated Admin Tasks</Typography>
            <List>
                {tasks.map(task => (
                    <ListItem key={task.id} dense>
                        <Checkbox edge="start" checked={task.completed} tabIndex={-1} disableRipple />
                        <ListItemText primary={task.description} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default DelegatedAdminTasks;