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
    GetAnalysisResultReq, GetAnalysisResultReqParams,
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
        getAnalysisResult: (req: GetAnalysisResultReqParams) => Promise<GetAnalysisResultResp>;
    };
    setIdToken: (token:string) => void
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
    children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({children}) => {
    const [token, setToken] = useState<string | null>(null);
    const userUrl = 'http://10.4.131.115:8888';
    const mediaUrl = 'http://10.4.131.115:8889'

    const axiosInstance: AxiosInstance = axios.create({
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
            const response = await axiosInstance.get<GetSubUsersResp>(`${userUrl}/api/user/getSubUsers`);
            return response.data;
        },

        /**
         * @description "get sub-user by name"
         * @param params
         */
        getSubUserByName: async (params: GetSubUserByNameReqParams): Promise<GetSubUserByNameResp> => {
            const response = await axiosInstance.get<GetSubUserByNameResp>(`${userUrl}/api/user/getSubUserByName?profileName=${params.profileName}`);
            return response.data;
        },

        /**
         * @description "create sub-user"
         * @param req
         */
        createSubUser: async (req: CreateSubUserReq): Promise<CreateSubUserResp> => {
            const response = await axiosInstance.post<CreateSubUserResp>(`${userUrl}/api/user/createSubUser`, req);
            return response.data;
        },

        /**
         * @description "delete sub-user by name"
         * @param req
         */
        deleteSubUserByName: async (req: DeleteSubUserByNameReq): Promise<DeleteSubUserByNameResp> => {
            const response = await axiosInstance.post<DeleteSubUserByNameResp>(`${userUrl}/api/user/deleteSubUserByName`, req);
            return response.data;
        },

        /**
         * @description "get avatar url"
         * @param params
         */
        getAvatar: async (params: GetAvatarReqParams): Promise<GetAvatarResp> => {
            const response = await axiosInstance.get<GetAvatarResp>(`${userUrl}/api/user/getAvatar?profileName=${params.profileName}`);
            return response.data;
        },

        /**
         * @description "get avatar upload url"
         * @param params
         */
        getAvatarUploadUrl: async (params: GetAvatarUploadUrlReqParams): Promise<GetAvatarUploadUrlResp> => {
            const response = await axiosInstance.get<GetAvatarUploadUrlResp>(`${userUrl}/api/user/getAvatarUploadUrl?profileName=${params.profileName}`);
            return response.data;
        },

        /**
         * @description "update avatar"
         * @param req
         */
        updateAvatarSuccess: async (req: UpdateAvatarSuccessReq): Promise<UpdateAvatarSuccessResp> => {
            const response = await axiosInstance.post<UpdateAvatarSuccessResp>(`${userUrl}/api/user/updateAvatarSuccess`, req);
            return response.data;
        },

        /**
         * @description "update sub-user attr"
         * @param req
         */
        updateSubUserAttr: async (req: UpdateSubUserAttrReq): Promise<UpdateSubUserAttrResp> => {
            const response = await axiosInstance.post<UpdateSubUserAttrResp>(`${userUrl}/api/user/updateSubUserAttr`, req);
            return response.data;
        },

        /**
         * @description "verify pin code"
         * @param req
         */
        verifyPin: async (req: VerifypinReq): Promise<VerifypinResp> => {
            const response = await axiosInstance.post<VerifypinResp>(`${userUrl}/api/user/verifypin`, req);
            return response.data;
        }
    };

    const record = {
        /**
         * @description "create new performance record"
         * @param req
         */
        createRecord: async (req: CreateRecordReq): Promise<CreateRecordResp> => {
            const response = await axiosInstance.post<CreateRecordResp>(`${mediaUrl}/api/media/record/createRecord`, req);
            return response.data;
        },

        /**
         * @description "delete performance record"
         * @param req
         */
        deleteRecord: async (req: DeleteRecordReq): Promise<DeleteRecordResp> => {
            const response = await axiosInstance.post<DeleteRecordResp>(`${mediaUrl}/api/media/record/deleteRecord`, req);
            return response.data;
        },

        /**
         * @description "get audio presigned url"
         * @param req
         */
        getAudioUrl: async (req: GetAudioUrlReq): Promise<GetAudioUrlResp> => {
            const response = await axiosInstance.post<GetAudioUrlResp>(`${mediaUrl}/api/media/record/getAudioUrl`, req);
            return response.data;
        },

        /**
         * @description "get performance audio"
         * @param req
         */
        getPerformanceAudio: async (req: GetPerformanceAudioReq): Promise<GetPerformanceAudioResp> => {
            const response = await axiosInstance.post<GetPerformanceAudioResp>(`${mediaUrl}/api/media/record/getPerformanceAudio`, req);
            return response.data;
        },

        /**
         * @description "get performance thumbnail"
         * @param req
         */
        getPerformanceImg: async (req: GetPerformanceImgReq): Promise<GetPerformanceImgResp> => {
            const response = await axiosInstance.post<GetPerformanceImgResp>(`${mediaUrl}/api/media/record/getPerformanceImg`, req);
            return response.data;
        },

        /**
         * @description "get performance midi"
         * @param req
         */
        getPerformanceMidi: async (req: GetPerformanceMidiReq): Promise<GetPerformanceMidiResp> => {
            const response = await axiosInstance.post<GetPerformanceMidiResp>(`${mediaUrl}/api/media/record/getPerformanceMidi`, req);
            return response.data;
        },

        /**
         * @description "get performance report"
         * @param req
         */
        getPerformanceReport: async (req: GetPerformanceReportReq): Promise<GetPerformanceReportResp> => {
            const response = await axiosInstance.post<GetPerformanceReportResp>(`${mediaUrl}/api/media/record/getPerformanceReport`, req);
            return response.data;
        },

        /**
         * @description "get performance sheet"
         * @param req
         */
        getPerformanceSheet: async (req: GetPerformanceSheetReq): Promise<GetPerformanceSheetResp> => {
            const response = await axiosInstance.post<GetPerformanceSheetResp>(`${mediaUrl}/api/media/record/getPerformanceSheet`, req);
            return response.data;
        },

        /**
         * @description "get performance video"
         * @param req
         */
        getPerformanceVideo: async (req: GetPerformanceVideoReq): Promise<GetPerformanceVideoResp> => {
            const response = await axiosInstance.post<GetPerformanceVideoResp>(`${mediaUrl}/api/media/record/getPerformanceVideo`, req);
            return response.data;
        },

        /**
         * @description "get performance waterfall"
         * @param req
         */
        getPerformanceWaterfall: async (req: GetPerformanceWaterfallReq): Promise<GetPerformanceWaterfallResp> => {
            const response = await axiosInstance.post<GetPerformanceWaterfallResp>(`${mediaUrl}/api/media/record/getPerformanceWaterfall`, req);
            return response.data;
        },

        /**
         * @description "get performance record"
         * @param req
         */
        getRecord: async (req: GetRecordReq): Promise<GetRecordResp> => {
            const response = await axiosInstance.post<GetRecordResp>(`${mediaUrl}/api/media/record/getRecord`, req);
            return response.data;
        },

        /**
         * @description "get video presigned url"
         * @param req
         */
        getVideoUrl: async (req: GetVideoUrlReq): Promise<GetVideoUrlResp> => {
            const response = await axiosInstance.post<GetVideoUrlResp>(`${mediaUrl}/api/media/record/getVideoUrl`, req);
            return response.data;
        },

        /**
         * @description "set a performance record as reference"
         * @param req
         */
        setAsReference: async (req: SetAsReferenceReq): Promise<SetAsReferenceResp> => {
            const response = await axiosInstance.post<SetAsReferenceResp>(`${mediaUrl}/api/media/record/setAsReference`, req);
            return response.data;
        },

        /**
         * @description "upload audio success"
         * @param req
         */
        uploadAudioSuccess: async (req: UploadAudioSuccessReq): Promise<UploadAudioSuccessResp> => {
            const response = await axiosInstance.post<UploadAudioSuccessResp>(`${mediaUrl}/api/media/record/uploadAudioSuccess`, req);
            return response.data;
        },

        /**
         * @description "upload video success"
         * @param req
         */
        uploadVideoSuccess: async (req: UploadVideoSuccessReq): Promise<UploadVideoSuccessResp> => {
            const response = await axiosInstance.post<UploadVideoSuccessResp>(`${mediaUrl}/api/media/record/uploadVideoSuccess`, req);
            return response.data;
        },
    };

    const reference = {
        /**
         * @description "create new reference"
         * @param req
         */
        createReference: async (req: CreateReferenceReq): Promise<CreateReferenceResp> => {
            const response = await axiosInstance.post<CreateReferenceResp>(`${mediaUrl}/api/media/reference/createReference`, req);
            return response.data;
        },

        /**
         * @description "delete reference"
         * @param req
         */
        deleteReference: async (req: DeleteReferenceReq): Promise<DeleteReferenceResp> => {
            const response = await axiosInstance.post<DeleteReferenceResp>(`${mediaUrl}/api/media/reference/deleteReference`, req);
            return response.data;
        },

        /**
         * @description "get reference audio"
         * @param req
         */
        getRefAudio: async (req: GetRefAudioReq): Promise<GetRefAudioResp> => {
            const response = await axiosInstance.post<GetRefAudioResp>(`${mediaUrl}/api/media/reference/getRefAudio`, req);
            return response.data;
        },

        /**
         * @description "get reference audio URL"
         * @param req
         */
        getRefAudioUrl: async (req: GetRefAudioUrlReq): Promise<GetRefAudioUrlResp> => {
            const response = await axiosInstance.post<GetRefAudioUrlResp>(`${mediaUrl}/api/media/reference/getRefAudioUrl`, req);
            return response.data;
        },

        /**
         * @description "get reference image"
         * @param req
         */
        getRefImg: async (req: GetRefImgReq): Promise<GetRefImgResp> => {
            const response = await axiosInstance.post<GetRefImgResp>(`${mediaUrl}/api/media/reference/getRefImg`, req);
            return response.data;
        },

        /**
         * @description "get reference image URL"
         * @param req
         */
        getRefImgUrl: async (req: GetRefImgUrlReq): Promise<GetRefImgUrlResp> => {
            const response = await axiosInstance.post<GetRefImgUrlResp>(`${mediaUrl}/api/media/reference/getRefImgUrl`, req);
            return response.data;
        },

        /**
         * @description "get reference MIDI"
         * @param req
         */
        getRefMidi: async (req: GetRefMidiReq): Promise<GetRefMidiResp> => {
            const response = await axiosInstance.post<GetRefMidiResp>(`${mediaUrl}/api/media/reference/getRefMidi`, req);
            return response.data;
        },

        /**
         * @description "get reference sheet"
         * @param req
         */
        getRefSheet: async (req: GetRefSheetReq): Promise<GetRefSheetResp> => {
            const response = await axiosInstance.post<GetRefSheetResp>(`${mediaUrl}/api/media/reference/getRefSheet`, req);
            return response.data;
        },

        /**
         * @description "get reference video"
         * @param req
         */
        getRefVideo: async (req: GetRefVideoReq): Promise<GetRefVideoResp> => {
            const response = await axiosInstance.post<GetRefVideoResp>(`${mediaUrl}/api/media/reference/getRefVideo`, req);
            return response.data;
        },

        /**
         * @description "get reference video URL"
         * @param req
         */
        getRefVideoUrl: async (req: GetRefVideoUrlReq): Promise<GetRefVideoUrlResp> => {
            const response = await axiosInstance.post<GetRefVideoUrlResp>(`${mediaUrl}/api/media/reference/getRefVideoUrl`, req);
            return response.data;
        },

        /**
         * @description "get reference waterfall"
         * @param req
         */
        getRefWaterfall: async (req: GetRefWaterfallReq): Promise<GetRefWaterfallResp> => {
            const response = await axiosInstance.post<GetRefWaterfallResp>(`${mediaUrl}/api/media/reference/getRefWaterfall`, req);
            return response.data;
        },

        /**
         * @description "get reference"
         * @param req
         */
        getReference: async (req: GetReferenceReq): Promise<GetReferenceResp> => {
            const response = await axiosInstance.post<GetReferenceResp>(`${mediaUrl}/api/media/reference/getReference`, req);
            return response.data;
        },

        /**
         * @description "query reference"
         * @param req
         */
        queryReference: async (req: QueryReferenceReq): Promise<QueryReferenceResp> => {
            const response = await axiosInstance.post<QueryReferenceResp>(`${mediaUrl}/api/media/reference/queryReference`, req);
            return response.data;
        },

        /**
         * @description "upload reference audio success"
         * @param req
         */
        uploadRefAudioSuccess: async (req: UploadRefAudioSuccessReq): Promise<UploadRefAudioSuccessResp> => {
            const response = await axiosInstance.post<UploadRefAudioSuccessResp>(`${mediaUrl}/api/media/reference/uploadRefAudioSuccess`, req);
            return response.data;
        },

        /**
         * @description "upload reference image success"
         * @param req
         */
        uploadRefImgSuccess: async (req: UploadRefImgSuccessReq): Promise<UploadRefImgSuccessResp> => {
            const response = await axiosInstance.post<UploadRefImgSuccessResp>(`${mediaUrl}/api/media/reference/uploadRefImgSuccess`, req);
            return response.data;
        },

        /**
         * @description "upload reference video success"
         * @param req
         */
        uploadRefVideoSuccess: async (req: UploadRefVideoSuccessReq): Promise<UploadRefVideoSuccessResp> => {
            const response = await axiosInstance.post<UploadRefVideoSuccessResp>(`${mediaUrl}/api/media/reference/uploadRefVideoSuccess`, req);
            return response.data;
        },

    };

    const analysis = {
        /**
         * @description "performance analysis"
         * @param req
         */
        performanceAnalysis: async (req: PerformanceAnalysisReq): Promise<PerformanceAnalysisResp> => {
            const response = await axiosInstance.post<PerformanceAnalysisResp>(`${mediaUrl}/api/media/analysis/performanceAnalysis`, req);
            return response.data;
        },

        /**
         * @description "get analysis result"
         * @param req
         */
        getAnalysisResult: async (req: GetAnalysisResultReqParams): Promise<GetAnalysisResultResp> => {
            const response = await axiosInstance.get<GetAnalysisResultResp>(`${mediaUrl}/api/media/analysis/getAnalysisResult?analysisResult=analysisId=${req.analysisId}`);
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
