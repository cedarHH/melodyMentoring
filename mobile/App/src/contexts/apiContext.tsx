// ApiContext.tsx
import React, {createContext, ReactNode, useContext, useState} from 'react';
import axios, { AxiosInstance } from 'axios';
import {CreateSubUserReq, CreateSubUserResp} from "./apiParams/usercenterComponents";
import {CreateRecordReq, CreateRecordResp} from "./apiParams/mediaComponents";

interface ApiContextType {
    user: {
        createSubUser: (reqParams: CreateSubUserReq) => Promise<CreateSubUserResp>;
    };
    record: {
        createRecord: (reqParams: CreateRecordReq) => Promise<CreateRecordResp>;
    };
    setIdToken: (token:string) => void
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
    children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    const axiosInstance: AxiosInstance = axios.create({
        baseURL: 'https://mygo.bar',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const setIdToken = (idToken: string) => {
        setToken(idToken)
    }

    const user = {
        createSubUser: async (reqParams: CreateSubUserReq): Promise<CreateSubUserResp> => {
            const response = await axiosInstance.post<CreateSubUserResp>('/api/user/createSubUser', reqParams);
            return response.data;
        },
    };

    const record = {
        createRecord: async (reqParams: CreateRecordReq): Promise<CreateRecordResp> => {
            const response = await axiosInstance.post<CreateRecordResp>('/api/media/record/createRecord', reqParams);
            return response.data;
        },
    };

    return (
        <ApiContext.Provider value={{ user, record, setIdToken}}>
            {children}
        </ApiContext.Provider>
    );
};

export const setIdToken = (idToken: string) => {

}

export const useApi = (): ApiContextType => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};
