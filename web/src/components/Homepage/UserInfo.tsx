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
    background-color: #1B1C1E;
    padding: 20px;
    border-radius: 10px;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden; /* 确保没有纵向滚动条 */
    border: 2px solid #4B4B4B;
`;

const Avatar = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  flex-shrink: 0; /* 防止图像被缩小 */
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 25px;
  flex-grow: 1;
`;

const ProgressBlock = styled.div`
    font-weight: bold;
    font-size: 19px;
    font-family: 'Cambria', serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    flex-shrink: 0; /* 防止进度条被缩小 */
    min-width: 150px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const InfoLabel = styled.p`
    font-weight: bold;
    font-size: 18px;
    font-family: 'Cambria', serif;
    width: 80px; /* Adjust width as needed */
    margin: 0;
`;

const InfoValue = styled.p`
    font-size: 18px;
    font-family: 'Cambria', serif;
    margin: 0;
`;

const ProgressBarContainer = styled.div`
  width: 100px;
  background-color: #C0C0C0;
  border-radius: 5px;
  margin-top: 10px;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 10px;
  background-color: #08A52D;
  border-radius: 5px;
`;

const ProgressLabel = styled.p`
    margin: 0;
    text-align: center;
    font-weight: bold;
`;

const UserInfo: React.FC<UserInfoProps> = ({ activeKid }) => {
    const childInfo: ChildInfo = childrenData[activeKid];
    const progress = 70;

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
            <ProgressBlock>
                <ProgressLabel>Progress</ProgressLabel>
                <ProgressBarContainer>
                    <ProgressBar progress={progress} />
                </ProgressBarContainer>
            </ProgressBlock>
        </UserInfoContainer>
    );
};

export default UserInfo;
