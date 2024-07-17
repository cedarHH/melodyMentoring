import React from 'react';
import styled from 'styled-components/native';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

interface ButtonProps {
    text: string;
    onPress: () => void;
    style?: object;
}

const StyledTouchableOpacity = styled.TouchableOpacity<{}>`
    padding: ${responsiveHeight(2)}px;
    border-radius: 20px;
    margin-top: ${responsiveHeight(1)}px;
    margin-bottom: ${responsiveHeight(1)}px;
    width: 80%;
    height: ${responsiveHeight(7)}px;
    text-align: center;
    background-color: #00BBFF;
    justify-content: center;
    align-items: center;
`;

const StyledText = styled.Text`
    color: white;
    font-size: ${responsiveFontSize(2)}px;
`;

const Button: React.FC<ButtonProps> = ({ text, onPress, style }) => (
    <StyledTouchableOpacity onPress={onPress} style={style}>
        <StyledText>{text}</StyledText>
    </StyledTouchableOpacity>
);

export default Button;
