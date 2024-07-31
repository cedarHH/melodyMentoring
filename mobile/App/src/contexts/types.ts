export type RootStackParamList = {
    Home: {
        profileName:string;
    };
    User: undefined;
    Upload: {
        title: string;
    };

    Welcome: undefined;
    SubUser: undefined;

    Main: undefined;
    Search: undefined;
    History: {
        profileName:string;
    };
    Music: {
        title: string;
        image: string| undefined;
        // others
    }
    Result: {
       recordId: string;
    };
    Feedback: undefined;
    Configure: {
        profileName:string;
    };
    
    UploadMethod: {
        title: string;
    };
    CameraRecorder: undefined;
    Practice: undefined;
};
