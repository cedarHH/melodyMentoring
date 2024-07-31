// UploadContext.tsx
import React, { createContext, ReactNode } from 'react';

interface UploadContextProps {
    title: string;
    profileName: string;
}

interface UploadProviderProps {
    children: ReactNode;
    title: string;
    profileName: string;
}

const UploadContext = createContext<UploadContextProps | undefined>(undefined);

const UploadProvider: React.FC<UploadProviderProps> = ({ children, title, profileName }) => {
    return (
        <UploadContext.Provider value={{ title, profileName }}>
            {children}
        </UploadContext.Provider>
    );
};

export { UploadContext, UploadProvider };
