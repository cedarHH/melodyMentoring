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
    History: undefined;
    Music: {
        title: string;
        image: string| undefined;
        // others
    }
    
    UploadMethod: {
        title: string;
    };
    CameraRecorder: undefined;
    Practice: undefined;
};
