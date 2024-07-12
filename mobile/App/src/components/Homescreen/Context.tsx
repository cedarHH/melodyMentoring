import React from 'react';

interface ContentContextType {
    activeContent: string;
    setActiveContent: (content: string) => void;
}

const ContentContext = React.createContext<ContentContextType>({
    activeContent: 'home', 
    setActiveContent: () => {}
});

export default ContentContext;

