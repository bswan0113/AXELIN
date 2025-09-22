import React from 'react';
import * as S from './UserProfileCard.styles';
import { Avatar, Button } from '@mui/material';

const UserProfileCard = ({ user = { name: 'Test User', email: 'test@example.com', avatarUrl: '' } }) => {
    return (
        <S.Card>
            <Avatar 
                src={user.avatarUrl} 
                alt="User Avatar" 
                sx={{ width: 80, height: 80, margin: '0 auto 16px' }} 
            />
            <S.Name>{user.name}</S.Name>
            <S.Email>{user.email}</S.Email>
            <Button variant="contained">Edit Profile</Button>
        </S.Card>
    );
};

export default UserProfileCard;