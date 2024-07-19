import React from 'react';
import styled from 'styled-components/native';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { TextStyle } from 'react-native';

interface ButtonProps {
    text: string;
    onPress: () => void;
    style?: object;
    textStyle?: TextStyle;
}

const StyledTouchableOpacity = styled.TouchableOpacity<{}>`
    padding: ${(props: { style: { padding: undefined; }; }) => props.style?.padding !== undefined ? props.style.padding : responsiveHeight(2)}px;
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

const StyledText = styled.Text<{ textStyle?: TextStyle }>`
    color: white;
    font-size: ${responsiveFontSize(1.5)}px;
    ${(props: { textStyle: any; }) => props.textStyle && { ...props.textStyle }}
`;

const Button: React.FC<ButtonProps> = ({ text, textStyle, onPress, style }) => (
    <StyledTouchableOpacity onPress={onPress} style={style}>
        <StyledText textStyle={textStyle}>{text}</StyledText>
    </StyledTouchableOpacity>
);

export default Button;
