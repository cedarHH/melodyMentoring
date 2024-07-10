import React from 'react';
import styled from 'styled-components';
import userAvatar from '../../assets/img/home/kid-avatar.jpg';
import { childrenData, ChildInfo } from '../../constants/childrenData';

interface UserInfoProps {
    activeKid: string;
}

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  gap: 20px;
  max-width: 100%;
`;

const Avatar = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const InfoLabel = styled.p`
  font-weight: bold;
  width: 80px; /* Adjust width as needed */
  margin: 0;
`;

const InfoValue = styled.p`
  margin: 0;
`;

const UserInfo: React.FC<UserInfoProps> = ({ activeKid }) => {
    const childInfo: ChildInfo = childrenData[activeKid];

    return (
        <UserInfoContainer>
            <Avatar src={userAvatar} alt="Kid Avatar" />
            <InfoBlock>
                <InfoRow>
                    <InfoLabel>Name:</InfoLabel>
                    <InfoValue>{activeKid}</InfoValue>
                </InfoRow>
                <InfoRow>
                    <InfoLabel>Age:</InfoLabel>
                    <InfoValue>{childInfo.age}</InfoValue>
                </InfoRow>
                <InfoRow>
                    <InfoLabel>Level:</InfoLabel>
                    <InfoValue>{childInfo.level}</InfoValue>
                </InfoRow>
            </InfoBlock>
        </UserInfoContainer>
    );
};

export default UserInfo;
