import React from 'react';
import { Box, Typography, TextField, Button, Rating, Stack } from '@mui/material';

const ReviewAndRatingManager = () => {
    const [value, setValue] = React.useState(2);

    return (
        <Box>
            <Typography variant="h6" gutterBottom>Leave a Review</Typography>
            <Stack spacing={2}>
                <Typography component="legend">Rating</Typography>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
                <TextField
                    label="Review Title"
                    variant="outlined"
                />
                <TextField
                    label="Review Content"
                    variant="outlined"
                    multiline
                    rows={4}
                />
                <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>Submit Review</Button>
            </Stack>
        </Box>
    );
};

export default ReviewAndRatingManager;