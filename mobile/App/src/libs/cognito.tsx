import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    CognitoUserSession,
    ICognitoUserPoolData
} from 'amazon-cognito-identity-js';
import {REACT_APP_USER_POOL_ID, REACT_APP_CLIENT_ID} from '@env';

const POOL_DATA: ICognitoUserPoolData = {
    UserPoolId: REACT_APP_USER_POOL_ID || '',
    ClientId: REACT_APP_CLIENT_ID || '',
}

const userPool = new CognitoUserPool(POOL_DATA);
let currentUser: CognitoUser | null = userPool.getCurrentUser();

export function getCurrentUser() {
    return currentUser;
}

function getCognitoUser(email: string): CognitoUser {
    const userData = {
        Username: email,
        Pool: userPool,
    };
    return new CognitoUser(userData);
}

export async function getSession(): Promise<CognitoUserSession> {
    if (!currentUser) {
        currentUser = userPool.getCurrentUser();
    }

    return new Promise((resolve, reject) => {
        if (currentUser) {
            currentUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(session as CognitoUserSession);
                }
            });
        } else {
            reject(new Error("No current user"));
        }
    });
}

export async function signUpUserWithEmail(username: string, email: string, password: string, name: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const attributeList = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: email,
            }), new CognitoUserAttribute({
                Name: 'name',
                Value: name,
            })
        ];

        userPool.signUp(username, password, attributeList, [], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

export async function verifyCode(email: string, code: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const cognitoUser = getCognitoUser(email);

        cognitoUser.confirmRegistration(code, true, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

export async function signInWithEmail(email: string, password: string): Promise<any> {
    try {
        const authenticationData = {
            Username: email,
            Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        currentUser = getCognitoUser(email);

        return new Promise((resolve, reject) => {
            if (currentUser) {
                currentUser.authenticateUser(authenticationDetails, {
                    onSuccess: (res) => {
                        resolve(res);
                    },
                    onFailure: (err) => {
                        console.error('Error during authentication:', err);
                        reject(err);
                    },
                });
            } else {
                console.log('No user is currently logged in.');
            }
        });
    } catch (err) {
        console.error('Error during authentication:', err);
        throw err;
    }
}

export function signOut() {
    if (currentUser) {
        currentUser.signOut();
    }
}

export async function getAttributes(): Promise<any> {
    return new Promise((resolve, reject) => {
        if (currentUser) {
            currentUser.getUserAttributes((err, attributes) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(attributes);
                }
            });
        } else {
            reject(new Error("No current user"));
        }
    });
}

export async function setAttribute(attribute: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const attributeList = [];
        const res = new CognitoUserAttribute(attribute);
        attributeList.push(res);

        if (currentUser) {
            currentUser.updateAttributes(attributeList, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        } else {
            reject(new Error("No current user"));
        }
    });
}

export async function sendCode(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const cognitoUser = getCognitoUser(email);

        if (!cognitoUser) {
            reject(`could not find ${email}`);
            return;
        }

        cognitoUser.forgotPassword({
            onSuccess: function (res) {
                resolve(res);
            },
            onFailure: function (err) {
                reject(err);
            },
        });
    });
}

export async function forgotPassword(email: string, code: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const cognitoUser = getCognitoUser(email);

        if (!cognitoUser) {
            reject(`could not find ${email}`);
            return;
        }

        cognitoUser.confirmPassword(code, password, {
            onSuccess: function () {
                resolve('password updated');
            },
            onFailure: function (err) {
                reject(err);
            },
        });
    });
}

export async function changePassword(oldPassword: string, newPassword: string): Promise<any> {
    return new Promise((resolve, reject) => {
        if (currentUser) {
            currentUser.changePassword(oldPassword, newPassword, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        } else {
            reject(new Error("No current user"));
        }
    });
}
