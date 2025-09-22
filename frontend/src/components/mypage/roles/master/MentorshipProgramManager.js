import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, List, ListItem, ListItemText } from '@mui/material';

const MentorshipProgramManager = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>Mentorship Program</Typography>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Manage Your Mentees
                    </Typography>
                    <List dense>
                        <ListItem>
                            <ListItemText primary="Mentee: buyer_bob" secondary="Status: Active" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Mentee: new_creator" secondary="Status: Pending Application" />
                        </ListItem>
                    </List>
                </CardContent>
                <CardActions>
                    <Button size="small">View Applications</Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default MentorshipProgramManager;