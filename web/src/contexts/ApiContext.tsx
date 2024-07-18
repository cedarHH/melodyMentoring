import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface IApiContext {
    subUsers: string[];
    fetchSubUsers: () => void;
    addSubUser: (profileName: string, pin: string) => Promise<void>;
    deleteSubUser: (profileName: string, pin: string) => Promise<void>;
}

const defaultState: IApiContext = {
    subUsers: [],
    fetchSubUsers: () => {},
    addSubUser: async () => {},
    deleteSubUser: async () => {},
};

type Props = {
    children?: React.ReactNode;
};

export const ApiContext = createContext<IApiContext>(defaultState);

const ApiProvider = ({ children }: Props) => {
    const [subUsers, setSubUsers] = useState<string[]>([]);

    useEffect(() => {
        fetchSubUsers();
    }, []);

    const fetchSubUsers = async () => {
        try {
            const response = await axios.get('/api/user/getSubUsers', {
                withCredentials: true,
            });
            const subUsersData = response.data.data.map((user: any) => user.profileName);
            setSubUsers(subUsersData);
        } catch (error) {
            console.error('Error fetching sub users:', error);
        }
    };

    const addSubUser = async (profileName: string, pin: string) => {
        try {
            await axios.post('/api/user/createSubUser', { profileName, pin }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await fetchSubUsers();
        } catch (error) {
            console.error('Error adding sub user:', error);
        }
    };

    const deleteSubUser = async (profileName: string, pin: string) => {
        try {
            await axios.post('/api/user/deleteSubUserByName', { profileName, pin }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await fetchSubUsers();
        } catch (error) {
            console.error('Error deleting sub user:', error);
        }
    };

    const state: IApiContext = {
        subUsers,
        fetchSubUsers,
        addSubUser,
        deleteSubUser,
    };

    return <ApiContext.Provider value={state}>{children}</ApiContext.Provider>;
};

export default ApiProvider;
