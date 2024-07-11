import React from 'react';
import styled from 'styled-components';

interface SidebarProps {
    activeKid: string;
    setActiveKid: (kid: string) => void;
}

const Aside = styled.aside`
  width: 100%;
  background-color: #252525;
  padding: 20px;
  box-sizing: border-box;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

interface ListItemProps {
    $isActive: boolean;
}

const ListItem = styled.li<ListItemProps>`
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.$isActive ? '#3a3a3a' : 'transparent')};
  border-radius: ${(props) => (props.$isActive ? '5px' : '0')};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ activeKid, setActiveKid }) => {
    return (
        <Aside>
            <List>
                {['Daniel', 'Amy', 'Tom'].map((kid) => (
                    <ListItem
                        key={kid}
                        $isActive={activeKid === kid}
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