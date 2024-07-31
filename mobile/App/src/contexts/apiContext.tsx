// ApiContext.tsx
import React, {createContext, ReactNode, useContext, useState} from 'react';
import axios, {AxiosInstance} from 'axios';
import {
    CreateSubUserReq,
    CreateSubUserResp,
    DeleteSubUserByNameReq,
    DeleteSubUserByNameResp,
    GetAvatarReqParams,
    GetAvatarResp,
    GetAvatarUploadUrlReqParams,
    GetAvatarUploadUrlResp,
    GetSubUserByNameReqParams,
    GetSubUserByNameResp,
    GetSubUsersResp,
    UpdateAvatarSuccessReq,
    UpdateAvatarSuccessResp,
    UpdateSubUserAttrReq,
    UpdateSubUserAttrResp,
    VerifypinReq,
    VerifypinResp
} from "./apiParams/usercenterComponents";
import {
    CreateRecordReq,
    CreateRecordResp,
    CreateReferenceReq,
    CreateReferenceResp,
    DeleteRecordReq,
    DeleteRecordResp,
    DeleteReferenceReq,
    DeleteReferenceResp,
    GetAnalysisResultReq,
    GetAnalysisResultResp,
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
    GetRefAudioUrlReq,
    GetRefAudioUrlResp,
    GetReferenceReq,
    GetReferenceResp,
    GetRefImgReq,
    GetRefImgResp,
    GetRefImgUrlReq,
    GetRefImgUrlResp,
    GetRefMidiReq,
    GetRefMidiResp,
    GetRefSheetReq,
    GetRefSheetResp,
    GetRefVideoReq,
    GetRefVideoResp,
    GetRefVideoUrlReq,
    GetRefVideoUrlResp,
    GetRefWaterfallReq,
    GetRefWaterfallResp,
    GetVideoUrlReq,
    GetVideoUrlResp,
    PerformanceAnalysisReq,
    PerformanceAnalysisResp,
    QueryReferenceReq,
    QueryReferenceResp,
    SetAsReferenceReq,
    SetAsReferenceResp,
    UploadAudioSuccessReq,
    UploadAudioSuccessResp,
    UploadRefAudioSuccessReq,
    UploadRefAudioSuccessResp,
    UploadRefImgSuccessReq,
    UploadRefImgSuccessResp,
    UploadRefVideoSuccessReq,
    UploadRefVideoSuccessResp,
    UploadVideoSuccessReq,
    UploadVideoSuccessResp
} from "./apiParams/mediaComponents";


interface ApiContextType {
    user: {
        getSubUsers: () => Promise<GetSubUsersResp>;
        getSubUserByName: (params: GetSubUserByNameReqParams) => Promise<GetSubUserByNameResp>;
        createSubUser: (req: CreateSubUserReq) => Promise<CreateSubUserResp>;
        deleteSubUserByName: (req: DeleteSubUserByNameReq) => Promise<DeleteSubUserByNameResp>;
        getAvatar: (params: GetAvatarReqParams) => Promise<GetAvatarResp>;
        getAvatarUploadUrl: (params: GetAvatarUploadUrlReqParams) => Promise<GetAvatarUploadUrlResp>;
        updateAvatarSuccess: (req: UpdateAvatarSuccessReq) => Promise<UpdateAvatarSuccessResp>;
        updateSubUserAttr: (req: UpdateSubUserAttrReq) => Promise<UpdateSubUserAttrResp>;
        verifyPin: (req: VerifypinReq) => Promise<VerifypinResp>;
    };
    record: {
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
    };
    reference: {
        createReference: (req: CreateReferenceReq) => Promise<CreateReferenceResp>;
        deleteReference: (req: DeleteReferenceReq) => Promise<DeleteReferenceResp>;
        getRefAudio: (req: GetRefAudioReq) => Promise<GetRefAudioResp>;
        getRefAudioUrl: (req: GetRefAudioUrlReq) => Promise<GetRefAudioUrlResp>;
        getRefImg: (req: GetRefImgReq) => Promise<GetRefImgResp>;
        getRefImgUrl: (req: GetRefImgUrlReq) => Promise<GetRefImgUrlResp>;
        getRefMidi: (req: GetRefMidiReq) => Promise<GetRefMidiResp>;
        getRefSheet: (req: GetRefSheetReq) => Promise<GetRefSheetResp>;
        getRefVideo: (req: GetRefVideoReq) => Promise<GetRefVideoResp>;
        getRefVideoUrl: (req: GetRefVideoUrlReq) => Promise<GetRefVideoUrlResp>;
        getRefWaterfall: (req: GetRefWaterfallReq) => Promise<GetRefWaterfallResp>;
        getReference: (req: GetReferenceReq) => Promise<GetReferenceResp>;
        queryReference: (req: QueryReferenceReq) => Promise<QueryReferenceResp>;
        uploadRefAudioSuccess: (req: UploadRefAudioSuccessReq) => Promise<UploadRefAudioSuccessResp>;
        uploadRefImgSuccess: (req: UploadRefImgSuccessReq) => Promise<UploadRefImgSuccessResp>;
        uploadRefVideoSuccess: (req: UploadRefVideoSuccessReq) => Promise<UploadRefVideoSuccessResp>;
    };
    analysis: {
        performanceAnalysis: (req: PerformanceAnalysisReq) => Promise<PerformanceAnalysisResp>;
        getAnalysisResult: (req: GetAnalysisResultReq) => Promise<GetAnalysisResultResp>;
    };
    setIdToken: (token:string) => void
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
    children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({children}) => {
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
        /**
         * @description "get the list of sub-users"
         */
        getSubUsers: async (): Promise<GetSubUsersResp> => {
            const response = await axiosInstance.get<GetSubUsersResp>('/api/user/getSubUsers');
            return response.data;
        },

        /**
         * @description "get sub-user by name"
         * @param params
         */
        getSubUserByName: async (params: GetSubUserByNameReqParams): Promise<GetSubUserByNameResp> => {
            const response = await axiosInstance.get<GetSubUserByNameResp>(`/api/user/getSubUserByName?profileName=${params.profileName}`);
            return response.data;
        },

        /**
         * @description "create sub-user"
         * @param req
         */
        createSubUser: async (req: CreateSubUserReq): Promise<CreateSubUserResp> => {
            const response = await axiosInstance.post<CreateSubUserResp>('/api/user/createSubUser', req);
            return response.data;
        },

        /**
         * @description "delete sub-user by name"
         * @param req
         */
        deleteSubUserByName: async (req: DeleteSubUserByNameReq): Promise<DeleteSubUserByNameResp> => {
            const response = await axiosInstance.post<DeleteSubUserByNameResp>('/api/user/deleteSubUserByName', req);
            return response.data;
        },

        /**
         * @description "get avatar url"
         * @param params
         */
        getAvatar: async (params: GetAvatarReqParams): Promise<GetAvatarResp> => {
            const response = await axiosInstance.get<GetAvatarResp>(`/api/user/getAvatar?profileName=${params.profileName}`);
            return response.data;
        },

        /**
         * @description "get avatar upload url"
         * @param params
         */
        getAvatarUploadUrl: async (params: GetAvatarUploadUrlReqParams): Promise<GetAvatarUploadUrlResp> => {
            const response = await axiosInstance.get<GetAvatarUploadUrlResp>(`/api/user/getAvatarUploadUrl?profileName=${params.profileName}`);
            return response.data;
        },

        /**
         * @description "update avatar"
         * @param req
         */
        updateAvatarSuccess: async (req: UpdateAvatarSuccessReq): Promise<UpdateAvatarSuccessResp> => {
            const response = await axiosInstance.post<UpdateAvatarSuccessResp>('/api/user/updateAvatarSuccess', req);
            return response.data;
        },

        /**
         * @description "update sub-user attr"
         * @param req
         */
        updateSubUserAttr: async (req: UpdateSubUserAttrReq): Promise<UpdateSubUserAttrResp> => {
            const response = await axiosInstance.post<UpdateSubUserAttrResp>('/api/user/updateSubUserAttr', req);
            return response.data;
        },

        /**
         * @description "verify pin code"
         * @param req
         */
        verifyPin: async (req: VerifypinReq): Promise<VerifypinResp> => {
            const response = await axiosInstance.post<VerifypinResp>('/api/user/verifyPin', req);
            return response.data;
        }
    };

    const record = {
        /**
         * @description "create new performance record"
         * @param req
         */
        createRecord: async (req: CreateRecordReq): Promise<CreateRecordResp> => {
            const response = await axiosInstance.post<CreateRecordResp>('/api/media/record/createRecord', req);
            return response.data;
        },

        /**
         * @description "delete performance record"
         * @param req
         */
        deleteRecord: async (req: DeleteRecordReq): Promise<DeleteRecordResp> => {
            const response = await axiosInstance.post<DeleteRecordResp>('/api/media/record/deleteRecord', req);
            return response.data;
        },

        /**
         * @description "get audio presigned url"
         * @param req
         */
        getAudioUrl: async (req: GetAudioUrlReq): Promise<GetAudioUrlResp> => {
            const response = await axiosInstance.post<GetAudioUrlResp>('/api/media/record/getAudioUrl', req);
            return response.data;
        },

        /**
         * @description "get performance audio"
         * @param req
         */
        getPerformanceAudio: async (req: GetPerformanceAudioReq): Promise<GetPerformanceAudioResp> => {
            const response = await axiosInstance.post<GetPerformanceAudioResp>('/api/media/record/getPerformanceAudio', req);
            return response.data;
        },

        /**
         * @description "get performance thumbnail"
         * @param req
         */
        getPerformanceImg: async (req: GetPerformanceImgReq): Promise<GetPerformanceImgResp> => {
            const response = await axiosInstance.post<GetPerformanceImgResp>('/api/media/record/getPerformanceImg', req);
            return response.data;
        },

        /**
         * @description "get performance midi"
         * @param req
         */
        getPerformanceMidi: async (req: GetPerformanceMidiReq): Promise<GetPerformanceMidiResp> => {
            const response = await axiosInstance.post<GetPerformanceMidiResp>('/api/media/record/getPerformanceMidi', req);
            return response.data;
        },

        /**
         * @description "get performance report"
         * @param req
         */
        getPerformanceReport: async (req: GetPerformanceReportReq): Promise<GetPerformanceReportResp> => {
            const response = await axiosInstance.post<GetPerformanceReportResp>('/api/media/record/getPerformanceReport', req);
            return response.data;
        },

        /**
         * @description "get performance sheet"
         * @param req
         */
        getPerformanceSheet: async (req: GetPerformanceSheetReq): Promise<GetPerformanceSheetResp> => {
            const response = await axiosInstance.post<GetPerformanceSheetResp>('/api/media/record/getPerformanceSheet', req);
            return response.data;
        },

        /**
         * @description "get performance video"
         * @param req
         */
        getPerformanceVideo: async (req: GetPerformanceVideoReq): Promise<GetPerformanceVideoResp> => {
            const response = await axiosInstance.post<GetPerformanceVideoResp>('/api/media/record/getPerformanceVideo', req);
            return response.data;
        },

        /**
         * @description "get performance waterfall"
         * @param req
         */
        getPerformanceWaterfall: async (req: GetPerformanceWaterfallReq): Promise<GetPerformanceWaterfallResp> => {
            const response = await axiosInstance.post<GetPerformanceWaterfallResp>('/api/media/record/getPerformanceWaterfall', req);
            return response.data;
        },

        /**
         * @description "get performance record"
         * @param req
         */
        getRecord: async (req: GetRecordReq): Promise<GetRecordResp> => {
            const response = await axiosInstance.post<GetRecordResp>('/api/media/record/getRecord', req);
            return response.data;
        },

        /**
         * @description "get video presigned url"
         * @param req
         */
        getVideoUrl: async (req: GetVideoUrlReq): Promise<GetVideoUrlResp> => {
            const response = await axiosInstance.post<GetVideoUrlResp>('/api/media/record/getVideoUrl', req);
            return response.data;
        },

        /**
         * @description "set a performance record as reference"
         * @param req
         */
        setAsReference: async (req: SetAsReferenceReq): Promise<SetAsReferenceResp> => {
            const response = await axiosInstance.post<SetAsReferenceResp>('/api/media/record/setAsReference', req);
            return response.data;
        },

        /**
         * @description "upload audio success"
         * @param req
         */
        uploadAudioSuccess: async (req: UploadAudioSuccessReq): Promise<UploadAudioSuccessResp> => {
            const response = await axiosInstance.post<UploadAudioSuccessResp>('/api/media/record/uploadAudioSuccess', req);
            return response.data;
        },

        /**
         * @description "upload video success"
         * @param req
         */
        uploadVideoSuccess: async (req: UploadVideoSuccessReq): Promise<UploadVideoSuccessResp> => {
            const response = await axiosInstance.post<UploadVideoSuccessResp>('/api/media/record/uploadVideoSuccess', req);
            return response.data;
        },
    };

    const reference = {
        /**
         * @description "create new reference"
         * @param req
         */
        createReference: async (req: CreateReferenceReq): Promise<CreateReferenceResp> => {
            const response = await axiosInstance.post<CreateReferenceResp>('/api/media/reference/createReference', req);
            return response.data;
        },

        /**
         * @description "delete reference"
         * @param req
         */
        deleteReference: async (req: DeleteReferenceReq): Promise<DeleteReferenceResp> => {
            const response = await axiosInstance.post<DeleteReferenceResp>('/api/media/reference/deleteReference', req);
            return response.data;
        },

        /**
         * @description "get reference audio"
         * @param req
         */
        getRefAudio: async (req: GetRefAudioReq): Promise<GetRefAudioResp> => {
            const response = await axiosInstance.post<GetRefAudioResp>('/api/media/reference/getAudio', req);
            return response.data;
        },

        /**
         * @description "get reference audio URL"
         * @param req
         */
        getRefAudioUrl: async (req: GetRefAudioUrlReq): Promise<GetRefAudioUrlResp> => {
            const response = await axiosInstance.post<GetRefAudioUrlResp>('/api/media/reference/getAudioUrl', req);
            return response.data;
        },

        /**
         * @description "get reference image"
         * @param req
         */
        getRefImg: async (req: GetRefImgReq): Promise<GetRefImgResp> => {
            const response = await axiosInstance.post<GetRefImgResp>('/api/media/reference/getImg', req);
            return response.data;
        },

        /**
         * @description "get reference image URL"
         * @param req
         */
        getRefImgUrl: async (req: GetRefImgUrlReq): Promise<GetRefImgUrlResp> => {
            const response = await axiosInstance.post<GetRefImgUrlResp>('/api/media/reference/getImgUrl', req);
            return response.data;
        },

        /**
         * @description "get reference MIDI"
         * @param req
         */
        getRefMidi: async (req: GetRefMidiReq): Promise<GetRefMidiResp> => {
            const response = await axiosInstance.post<GetRefMidiResp>('/api/media/reference/getMidi', req);
            return response.data;
        },

        /**
         * @description "get reference sheet"
         * @param req
         */
        getRefSheet: async (req: GetRefSheetReq): Promise<GetRefSheetResp> => {
            const response = await axiosInstance.post<GetRefSheetResp>('/api/media/reference/getSheet', req);
            return response.data;
        },

        /**
         * @description "get reference video"
         * @param req
         */
        getRefVideo: async (req: GetRefVideoReq): Promise<GetRefVideoResp> => {
            const response = await axiosInstance.post<GetRefVideoResp>('/api/media/reference/getVideo', req);
            return response.data;
        },

        /**
         * @description "get reference video URL"
         * @param req
         */
        getRefVideoUrl: async (req: GetRefVideoUrlReq): Promise<GetRefVideoUrlResp> => {
            const response = await axiosInstance.post<GetRefVideoUrlResp>('/api/media/reference/getVideoUrl', req);
            return response.data;
        },

        /**
         * @description "get reference waterfall"
         * @param req
         */
        getRefWaterfall: async (req: GetRefWaterfallReq): Promise<GetRefWaterfallResp> => {
            const response = await axiosInstance.post<GetRefWaterfallResp>('/api/media/reference/getWaterfall', req);
            return response.data;
        },

        /**
         * @description "get reference"
         * @param req
         */
        getReference: async (req: GetReferenceReq): Promise<GetReferenceResp> => {
            const response = await axiosInstance.post<GetReferenceResp>('/api/media/reference/getReference', req);
            return response.data;
        },

        /**
         * @description "query reference"
         * @param req
         */
        queryReference: async (req: QueryReferenceReq): Promise<QueryReferenceResp> => {
            const response = await axiosInstance.post<QueryReferenceResp>('/api/media/reference/query', req);
            return response.data;
        },

        /**
         * @description "upload reference audio success"
         * @param req
         */
        uploadRefAudioSuccess: async (req: UploadRefAudioSuccessReq): Promise<UploadRefAudioSuccessResp> => {
            const response = await axiosInstance.post<UploadRefAudioSuccessResp>('/api/media/reference/uploadAudioSuccess', req);
            return response.data;
        },

        /**
         * @description "upload reference image success"
         * @param req
         */
        uploadRefImgSuccess: async (req: UploadRefImgSuccessReq): Promise<UploadRefImgSuccessResp> => {
            const response = await axiosInstance.post<UploadRefImgSuccessResp>('/api/media/reference/uploadImgSuccess', req);
            return response.data;
        },

        /**
         * @description "upload reference video success"
         * @param req
         */
        uploadRefVideoSuccess: async (req: UploadRefVideoSuccessReq): Promise<UploadRefVideoSuccessResp> => {
            const response = await axiosInstance.post<UploadRefVideoSuccessResp>('/api/media/reference/uploadVideoSuccess', req);
            return response.data;
        },

    };

    const analysis = {
        /**
         * @description "performance analysis"
         * @param req
         */
        performanceAnalysis: async (req: PerformanceAnalysisReq): Promise<PerformanceAnalysisResp> => {
            const response = await axiosInstance.post<PerformanceAnalysisResp>('/api/media/analysis/performance', req);
            return response.data;
        },

        /**
         * @description "get analysis result"
         * @param req
         */
        getAnalysisResult: async (req: GetAnalysisResultReq): Promise<GetAnalysisResultResp> => {
            const response = await axiosInstance.post<GetAnalysisResultResp>('/api/media/analysis/getResult', req);
            return response.data;
        },
    };

    return (
        <ApiContext.Provider value={{ user, record, reference, analysis, setIdToken}}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = (): ApiContextType => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};
