export type RootStackParamList = {
    Home: {
        profileName: string;
    };
    User: {
        profileName:string;
    };
    Upload: {
        title: string;
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
        image: string | undefined;
        profileName: string;
        // others
    }
    Result: {
        profileName: string;
        recordId: number;
    };
    Feedback: undefined;
    Configure: {
        profileName: string;
    };

    UploadMethod: undefined;
    CameraRecorder: undefined;
    Practice: undefined;
};
