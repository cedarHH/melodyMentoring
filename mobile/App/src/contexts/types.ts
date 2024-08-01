export type RootStackParamList = {
    Home: {
        profileName: string;
    };
    User: {
        profileName:string;
    };
    Upload: {
        title: string;
        refId: string;
        profileName:string;
    };

    Welcome: undefined;
    SubUser: undefined;

    Main: {
        profileName: string;
    };
    Search: {
        profileName: string;
    };
    History: {
        profileName: string;
    };
    Music: {
        title: string;
        refId: string;
        image: string | undefined;
        profileName: string;
        // others
    }
    Result: {
        profileName: string;
        recordId: number;
        referenceId: string;
        analysisId: number;
    };
    Feedback: {
        profileName: string;
        comment: string,
        Errors: string,
        feedback: string
        recommendations: string
    };
    Configure: {
        profileName: string;
    };

    UploadMethod: undefined;
    CameraRecorder: undefined;
    Practice: undefined;
};
