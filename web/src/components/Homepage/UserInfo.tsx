import React from 'react';
import styled from 'styled-components';
import userAvatar from '../../assets/img/home/kid-avatar.jpg';

interface UserInfoProps {
    activeKid: string;
}

const UserInfoContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #2c2c2c;
    padding: 30px;
    border-radius: 10px;
    gap: 20px;
`;

const Avatar = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 50%;
`;

const InfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    
    p {
        margin: 0;
    }
`;

const UserInfo: React.FC<UserInfoProps> = ({ activeKid }) => {
    return (
        <UserInfoContainer>
            <Avatar src={userAvatar} alt="Kid Avatar" />
            <InfoBlock>
                <p><strong>Name:</strong></p>
                <p><strong>Age:</strong></p>
                <p><strong>Level:</strong></p>
            </InfoBlock>
            <InfoBlock>
                <p><strong>{activeKid}</strong></p>
                <p><strong>11</strong></p>
                <p><strong>Entry &nbsp;&#9733;&#9734;&#9734;&#9734;&#9734;</strong></p>
            </InfoBlock>
        </UserInfoContainer>
    );
};

export default UserInfo;
