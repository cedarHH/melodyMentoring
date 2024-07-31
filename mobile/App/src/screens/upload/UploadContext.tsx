// UploadContext.tsx
import React, { createContext, ReactNode } from 'react';

interface UploadContextProps {
    title: string;
    refId: string;
    profileName: string;
}

interface UploadProviderProps {
    children: ReactNode;
    title: string;
    refId: string;
    profileName: string;
}

const UploadContext = createContext<UploadContextProps | undefined>(undefined);

const UploadProvider: React.FC<UploadProviderProps> = ({ children, title, refId, profileName }) => {
    return (
        <UploadContext.Provider value={{ title, refId, profileName }}>
            {children}
        </UploadContext.Provider>
    );
};

export { UploadContext, UploadProvider };
