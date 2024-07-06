import React from 'react';
import styled from 'styled-components';

interface NotificationProps {
    width: string;
    height?: string;
    message: string;
}

const NotificationContainer = styled.div<{ width: string; height?: string }>`
    background-color: #f8d7da;
    color: #721c24;
    padding: 2vh 1vw;
    border-radius: 4px;
    width: ${(props) => props.width};
    height: ${(props) => props.height || 'auto'};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #f5c6cb;
    margin: 1vh 0;
`;

const Notification: React.FC<NotificationProps> = ({ width, height, message }) => {
    return (
        <NotificationContainer width={width} height={height}>
            {message}
        </NotificationContainer>
    );
};

export default Notification;
