export type RootStackParamList = {
    Home: {
        profileName: string;
    };
    User: undefined;
    Upload: {
        title: string;
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

    UploadMethod: {
        title: string;
    };
    CameraRecorder: undefined;
    Practice: undefined;
};
