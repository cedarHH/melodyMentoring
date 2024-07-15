import React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface NotificationProps {
    width: string;
    height?: string;
}

const NotificationContainer = styled.View<{ width: string; height?: string }>`
    background-color: #f8d7da;
    color: #721c24;
    padding: 2vh 1vw;
    border-radius: 4px;
    width: ${(props: { width: string; }) => props.width};
    height: ${(props: { height: string; }) => props.height || 'auto'};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #f5c6cb;
    margin: 1vh 0;
`;

const NotificationText = styled.Text`
    color: #721c24;
`;

const Notification: React.FC<NotificationProps> = ({ width, height }) => {
    const notification = useSelector((state: RootState) => state.notification);

    if (!notification.visible) return null;

    return (
        <NotificationContainer width={width} height={height}>
            <NotificationText>{notification.message}</NotificationText>
        </NotificationContainer>
    );
};

export default Notification;
