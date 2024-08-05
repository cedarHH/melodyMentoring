import React, {createContext, useState, useEffect, ReactNode, useContext} from 'react';
import webapi from './api/gocliRequest';
import {BASE_URL} from "../constants/apiConf";
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
import {
    CreateRecordReq,
    CreateRecordResp,
    DeleteRecordReq,
    DeleteRecordResp,
    GetAudioUrlReq,
    GetAudioUrlResp,
    GetPerformanceAudioReq,
    GetPerformanceAudioResp,
    GetPerformanceImgReq,
    GetPerformanceImgResp,
    GetPerformanceMidiReq,
    GetPerformanceMidiResp,
    GetPerformanceReportReq,
    GetPerformanceReportResp,
    GetPerformanceSheetReq,
    GetPerformanceSheetResp,
    GetPerformanceVideoReq,
    GetPerformanceVideoResp,
    GetPerformanceWaterfallReq,
    GetPerformanceWaterfallResp,
    GetRecordReq,
    GetRecordResp,
    GetRefAudioReq,
    GetRefAudioResp,
    GetReferenceReq,
    GetReferenceResp,
    GetRefSheetReq, GetRefSheetResp,
    GetRefVideoReq,
    GetRefVideoResp, GetRefWaterfallReq, GetRefWaterfallResp,
    GetVideoUrlReq,
    GetVideoUrlResp,
    SetAsReferenceReq,
    SetAsReferenceResp,
    UploadAudioSuccessReq,
    UploadAudioSuccessResp,
    UploadVideoSuccessReq,
    UploadVideoSuccessResp
} from "./api/mediaComponents";

interface ApiProviderProps {
    children: ReactNode;
}

interface IUserApiContext {
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

interface IRecordApiContext {
    createRecord: (req: CreateRecordReq) => Promise<CreateRecordResp>;
    deleteRecord: (req: DeleteRecordReq) => Promise<DeleteRecordResp>;
    getAudioUrl: (req: GetAudioUrlReq) => Promise<GetAudioUrlResp>;
    getPerformanceAudio: (req: GetPerformanceAudioReq) => Promise<GetPerformanceAudioResp>;
    getPerformanceImg: (req: GetPerformanceImgReq) => Promise<GetPerformanceImgResp>;
    getPerformanceMidi: (req: GetPerformanceMidiReq) => Promise<GetPerformanceMidiResp>;
    getPerformanceReport: (req: GetPerformanceReportReq) => Promise<GetPerformanceReportResp>;
    getPerformanceSheet: (req: GetPerformanceSheetReq) => Promise<GetPerformanceSheetResp>;
    getPerformanceVideo: (req: GetPerformanceVideoReq) => Promise<GetPerformanceVideoResp>;
    getPerformanceWaterfall: (req: GetPerformanceWaterfallReq) => Promise<GetPerformanceWaterfallResp>;
    getRecord: (req: GetRecordReq) => Promise<GetRecordResp>;
    getVideoUrl: (req: GetVideoUrlReq) => Promise<GetVideoUrlResp>;
    setAsReference: (req: SetAsReferenceReq) => Promise<SetAsReferenceResp>;
    uploadAudioSuccess: (req: UploadAudioSuccessReq) => Promise<UploadAudioSuccessResp>;
    uploadVideoSuccess: (req: UploadVideoSuccessReq) => Promise<UploadVideoSuccessResp>;
    getReference: (req: GetReferenceReq) => Promise<GetReferenceResp>;
    getRefAudio: (req: GetRefAudioReq) => Promise<GetRefAudioResp>;
    getRefSheet: (req: GetRefSheetReq) => Promise<GetRefSheetResp>;
    getRefVideo: (req: GetRefVideoReq) => Promise<GetRefVideoResp>;
    getRefWaterfall: (req: GetRefWaterfallReq) => Promise<GetRefWaterfallResp>;
}

export interface IApiContext {
    user: IUserApiContext;
    record: IRecordApiContext;
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
        return webapi.post<SetTokensResp>(`${BASE_URL}/api/user/setTokens`, req);
    }

    /**
     * @description "refreshTokens"
     */
    const refreshTokens = async () => {
        return webapi.get<RefreshTokensResp>(`${BASE_URL}/api/user/refreshTokens`, {});
    }

    /**
     * @description "get the list of sub-users"
     */
    const getSubUsers = async () => {
        return webapi.get<GetSubUsersResp>(`${BASE_URL}/api/user/getSubUsers`, {}, defaultConfig);
    };

    /**
     * @description "get sub-user by name"
     * @param params
     */
    const getSubUserByName = async (params: GetSubUserByNameReqParams) => {
        return webapi.get<GetSubUserByNameResp>(`${BASE_URL}/api/user/getSubUserByName?profileName=${params.profileName}`, {}, defaultConfig);
    };

    /**
     * @description "create sub-user"
     * @param req
     */
    const createSubUser = async (req: CreateSubUserReq) => {
        return webapi.post<CreateSubUserResp>(`${BASE_URL}/api/user/createSubUser`, req, defaultConfig);
    };

    /**
     * @description "delete sub-user by name"
     * @param req
     */
    const deleteSubUserByName = async (req: DeleteSubUserByNameReq) => {
        return webapi.post<DeleteSubUserByNameResp>(`${BASE_URL}/api/user/deleteSubUserByName`, req, defaultConfig);
    };

    /**
     * @description "get avatar url"
     * @param params
     */
    const getAvatar = async (params: GetAvatarReqParams) => {
        return webapi.get<GetAvatarResp>(`${BASE_URL}/api/user/getAvatar?profileName=${params.profileName}`, {}, defaultConfig);
    };

    /**
     * @description "get avatar uploda url"
     * @param params
     */
    const getAvatarUploadUrl = async (params: GetAvatarUploadUrlReqParams) => {
        return webapi.get<GetAvatarUploadUrlResp>(`${BASE_URL}/api/user/getAvatarUploadUrl?profileName=${params.profileName}`, {}, defaultConfig);
    };

    /**
     * @description "update avatar"
     * @param req
     */
    const updateAvatarSuccess = async (req: UpdateAvatarSuccessReq) => {
        return webapi.post<UpdateAvatarSuccessResp>(`${BASE_URL}/api/user/updateAvatarSuccess`, req, defaultConfig);
    };

    /**
     * @description "update sub-user attr"
     * @param req
     */
    const updateSubUserAttr = async (req: UpdateSubUserAttrReq) => {
        return webapi.post<UpdateSubUserAttrResp>(`${BASE_URL}/api/user/updateSubUserAttr`, req, defaultConfig);
    };

    /**
     * @description "verify pin code"
     * @param req
     */
    const verifyPin = async (req: VerifypinReq) => {
        return webapi.post<VerifypinResp>(`${BASE_URL}/api/user/verifyPin`, req, defaultConfig);
    };

    /**
     * @description "create new performance record"
     * @param req
     */
    const createRecord = async (req: CreateRecordReq) => {
        return webapi.post<CreateRecordResp>(`${BASE_URL}/api/media/record/createRecord`, req);
    };

    /**
     * @description "delete performance record"
     * @param req
     */
    const deleteRecord = async (req: DeleteRecordReq) => {
        return webapi.post<DeleteRecordResp>(`${BASE_URL}/api/media/record/deleteRecord`, req);
    };

    /**
     * @description "get audio presigned url"
     * @param req
     */
    const getAudioUrl = async (req: GetAudioUrlReq) => {
        return webapi.post<GetAudioUrlResp>(`${BASE_URL}/api/media/record/getAudioUrl`, req);
    };

    /**
     * @description "get performance audio"
     * @param req
     */
    const getPerformanceAudio = async (req: GetPerformanceAudioReq) => {
        return webapi.post<GetPerformanceAudioResp>(`${BASE_URL}/api/media/record/getPerformanceAudio`, req);
    };

    /**
     * @description "get performance thumbnail"
     * @param req
     */
    const getPerformanceImg = async (req: GetPerformanceImgReq) => {
        return webapi.post<GetPerformanceImgResp>(`${BASE_URL}/api/media/record/getPerformanceImg`, req);
    };

    /**
     * @description "get performance midi"
     * @param req
     */
    const getPerformanceMidi = async (req: GetPerformanceMidiReq) => {
        return webapi.post<GetPerformanceMidiResp>(`${BASE_URL}/api/media/record/getPerformanceMidi`, req);
    };

    /**
     * @description "get performance report"
     * @param req
     */
    const getPerformanceReport = async (req: GetPerformanceReportReq) => {
        return webapi.post<GetPerformanceReportResp>(`${BASE_URL}/api/media/record/getPerformanceReport`, req);
    };

    /**
     * @description "get performance sheet"
     * @param req
     */
    const getPerformanceSheet = async (req: GetPerformanceSheetReq) => {
        return webapi.post<GetPerformanceSheetResp>(`${BASE_URL}/api/media/record/getPerformanceSheet`, req);
    };

    /**
     * @description "get performance video"
     * @param req
     */
    const getPerformanceVideo = async (req: GetPerformanceVideoReq) => {
        return webapi.post<GetPerformanceVideoResp>(`${BASE_URL}/api/media/record/getPerformanceVideo`, req);
    };

    /**
     * @description "get performance waterfall"
     * @param req
     */
    const getPerformanceWaterfall = async (req: GetPerformanceWaterfallReq) => {
        return webapi.post<GetPerformanceWaterfallResp>(`${BASE_URL}/api/media/record/getPerformanceWaterfall`, req);
    };

    /**
     * @description "get performance record"
     * @param req
     */
    const getRecord = async (req: GetRecordReq) => {
        return webapi.post<GetRecordResp>(`${BASE_URL}/api/media/record/getRecord`, req);
    };

    /**
     * @description "get video presigned url"
     * @param req
     */
    const getVideoUrl = async (req: GetVideoUrlReq) => {
        return webapi.post<GetVideoUrlResp>(`${BASE_URL}/api/media/record/getVideoUrl`, req);
    };

    /**
     * @description "set a performance record as reference"
     * @param req
     */
    const setAsReference = async (req: SetAsReferenceReq) => {
        return webapi.post<SetAsReferenceResp>(`${BASE_URL}/api/media/record/setAsReference`, req);
    };

    /**
     * @description "upload audio success"
     * @param req
     */
    const uploadAudioSuccess = async (req: UploadAudioSuccessReq) => {
        return webapi.post<UploadAudioSuccessResp>(`${BASE_URL}/api/media/record/uploadAudioSuccess`, req);
    };

    /**
     * @description "upload video success"
     * @param req
     */
    const uploadVideoSuccess = async (req: UploadVideoSuccessReq) => {
        return webapi.post<UploadVideoSuccessResp>(`${BASE_URL}/api/media/record/uploadVideoSuccess`, req);
    };

    /**
     * @description "get reference"
     * @param req
     */
    const getReference = async (req: GetReferenceReq) => {
        return webapi.post<GetReferenceResp>(`${BASE_URL}/api/media/reference/getReference`, req);
    };

    /**
     * @description "get reference video"
     * @param req
     */
    const getRefVideo = async (req: GetRefVideoReq) => {
        return webapi.post<GetRefVideoResp>(`${BASE_URL}/api/media/reference/getRefVideo`, req);
    };

    /**
     * @description "get reference audio"
     * @param req
     */
    const getRefAudio = async (req: GetRefAudioReq) => {
        return webapi.post<GetRefAudioResp>(`${BASE_URL}/api/media/reference/getRefAudio`, req);
    };

    /**
     * @description "get reference sheet"
     * @param req
     */
    const getRefSheet = async (req: GetRefSheetReq) => {
        return webapi.post<GetRefSheetResp>(`${BASE_URL}/api/media/reference/getRefSheet`, req);
    };

    /**
     * @description "get reference waterfall"
     * @param req
     */
    const getRefWaterfall = async (req: GetRefWaterfallReq) => {
        return webapi.post<GetRefWaterfallResp>(`${BASE_URL}/api/media/reference/getRefWaterfall`, req);
    };

    const userApi: IUserApiContext = {
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

    const recordApi: IRecordApiContext = {
        createRecord,
        deleteRecord,
        getAudioUrl,
        getPerformanceAudio,
        getPerformanceImg,
        getPerformanceMidi,
        getPerformanceReport,
        getPerformanceSheet,
        getPerformanceVideo,
        getPerformanceWaterfall,
        getRecord,
        getVideoUrl,
        setAsReference,
        uploadAudioSuccess,
        uploadVideoSuccess,
        getReference,
        getRefVideo,
        getRefAudio,
        getRefSheet,
        getRefWaterfall
    };

    const api: IApiContext = {
        user: userApi,
        record: recordApi,
    };

    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export default ApiProvider
