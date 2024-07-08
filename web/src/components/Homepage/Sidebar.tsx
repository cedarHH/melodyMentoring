import React from 'react';
import styled from 'styled-components';

interface SidebarProps {
    activeKid: string;
    setActiveKid: (kid: string) => void;
}

const Aside = styled.aside`
    width: 200px;
    background-color: #252525;
    padding: 20px;
`;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ListItem = styled.li<{ isActive: boolean }>`
    padding: 10px;
    cursor: pointer;
    background-color: ${(props) => (props.isActive ? '#3a3a3a' : 'transparent')};
    border-radius: ${(props) => (props.isActive ? '5px' : '0')};

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const Sidebar: React.FC<SidebarProps> = ({ activeKid, setActiveKid }) => {
    return (
        <Aside>
            <List>
                {['Kid1', 'Kid2', 'Kid3'].map((kid) => (
                    <ListItem
                        key={kid}
                        isActive={activeKid === kid}
                        onClick={() => setActiveKid(kid)}
                    >
                        {kid}
                    </ListItem>
                ))}
            </List>
        </Aside>
    );
};

export default Sidebar;
