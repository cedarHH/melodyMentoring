import React from 'react';
import styled from 'styled-components';

const TaglineContainer = styled.div<{}>`
    font-size: 3vw;
    margin-bottom: 5vh;
`;


const Tagline: React.FC = () => (
    <TaglineContainer>
        Discover Your Sound
    </TaglineContainer>
);

export default Tagline;
