import React, {createContext, useState, useEffect, ReactNode, useContext} from 'react';
import webapi from './api/gocliRequest';
import {
    SetTokensReq,
    SetTokensResp,
    RefreshTokensResp,
    CreateSubUserReq,
    CreateSubUserResp,
    DeleteSubUserByNameReq,
    DeleteSubUserByNameResp,
    GetAvatarResp,
    GetAvatarUploadUrlResp,
    GetSubUserByNameResp,
    GetSubUsersResp,
    UpdateAvatarSuccessReq,
    UpdateAvatarSuccessResp,
    UpdateSubUserAttrReq,
    UpdateSubUserAttrResp,
    VerifypinReq,
    VerifypinResp,
    GetSubUserByNameReqParams,
    GetAvatarUploadUrlReqParams,
    GetAvatarReqParams,
} from './api/usercenterComponents';
import {USER_URL} from "../constants/apiConf";

interface ApiProviderProps {
    children: ReactNode;
}

interface IApiContext {
    setTokens: (req: SetTokensReq) => Promise<SetTokensResp>;
    refreshTokens: () => Promise<RefreshTokensResp>;
    getSubUsers: () => Promise<GetSubUsersResp>;
    getSubUserByName: (params: GetSubUserByNameReqParams) => Promise<GetSubUserByNameResp>;
    createSubUser: (req: CreateSubUserReq) => Promise<CreateSubUserResp>;
    deleteSubUserByName: (req: DeleteSubUserByNameReq) => Promise<DeleteSubUserByNameResp>;
    getAvatar: (params: GetAvatarReqParams) => Promise<GetAvatarResp>;
    getAvatarUploadUrl: (params: GetAvatarUploadUrlReqParams) => Promise<GetAvatarUploadUrlResp>;
    updateAvatarSuccess: (req: UpdateAvatarSuccessReq) => Promise<UpdateAvatarSuccessResp>;
    updateSubUserAttr: (req: UpdateSubUserAttrReq) => Promise<UpdateSubUserAttrResp>;
    verifyPin: (req: VerifypinReq) => Promise<VerifypinResp>;
}

export const ApiContext = createContext<IApiContext | undefined>(undefined);

export const ApiProvider = ({ children }: ApiProviderProps) => {
    const defaultConfig = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    /**
     * @description "setTokens"
     * @param req
     */
    const setTokens = async (req: SetTokensReq) => {
        return webapi.post<SetTokensResp>(`${USER_URL}/api/user/setTokens`, req);
    }

    /**
     * @description "refreshTokens"
     */
    const refreshTokens = async () => {
        return webapi.get<RefreshTokensResp>(`${USER_URL}/api/user/refreshTokens`, {});
    }

    /**
     * @description "get the list of sub-users"
     */
    const getSubUsers = async () => {
        return webapi.get<GetSubUsersResp>(`${USER_URL}/api/user/getSubUsers`, {}, defaultConfig);
    };

    /**
     * @description "get sub-user by name"
     * @param params
     */
    const getSubUserByName = async (params: GetSubUserByNameReqParams) => {
        return webapi.get<GetSubUserByNameResp>(`${USER_URL}/api/user/getSubUserByName?profileName=${params.profileName}`, {}, defaultConfig);
    };

    /**
     * @description "create sub-user"
     * @param req
     */
    const createSubUser = async (req: CreateSubUserReq) => {
        return webapi.post<CreateSubUserResp>(`${USER_URL}/api/user/createSubUser`, req, defaultConfig);
    };

    /**
     * @description "delete sub-user by name"
     * @param req
     */
    const deleteSubUserByName = async (req: DeleteSubUserByNameReq) => {
        return webapi.post<DeleteSubUserByNameResp>(`${USER_URL}/api/user/deleteSubUserByName`, req, defaultConfig);
    };

    /**
     * @description "get avatar url"
     * @param params
     */
    const getAvatar = async (params: GetAvatarReqParams) => {
        return webapi.get<GetAvatarResp>(`${USER_URL}/api/user/getAvatar?profileName=${params.profileName}`, {}, defaultConfig);
    };

    /**
     * @description "get avatar uploda url"
     * @param params
     */
    const getAvatarUploadUrl = async (params: GetAvatarUploadUrlReqParams) => {
        return webapi.get<GetAvatarUploadUrlResp>(`${USER_URL}/api/user/getAvatarUploadUrl?profileName=${params.profileName}`, {}, defaultConfig);
    };

    /**
     * @description "update avatar"
     * @param req
     */
    const updateAvatarSuccess = async (req: UpdateAvatarSuccessReq) => {
        return webapi.post<UpdateAvatarSuccessResp>(`${USER_URL}/api/user/updateAvatarSuccess`, req, defaultConfig);
    };

    /**
     * @description "update sub-user attr"
     * @param req
     */
    const updateSubUserAttr = async (req: UpdateSubUserAttrReq) => {
        return webapi.post<UpdateSubUserAttrResp>(`${USER_URL}/api/user/updateSubUserAttr`, req, defaultConfig);
    };

    /**
     * @description "verify pin code"
     * @param req
     */
    const verifyPin = async (req: VerifypinReq) => {
        return webapi.post<VerifypinResp>(`${USER_URL}/api/user/verifyPin`, req, defaultConfig);
    };

    const api: IApiContext = {
        setTokens,
        refreshTokens,
        getSubUsers,
        getSubUserByName,
        createSubUser,
        deleteSubUserByName,
        getAvatar,
        getAvatarUploadUrl,
        updateAvatarSuccess,
        updateSubUserAttr,
        verifyPin,
    };

    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export default ApiProvider