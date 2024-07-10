import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js'
// import {POOL_DATA} from "../constants/awsCognitoConf";

const POOL_DATA = {
    UserPoolId: 'ap-southeast-2_kaM46A0bi',
    ClientId: `32a7ka2btgropvqe7u0lr7qr5k`,
  }

const userPool = new CognitoUserPool(POOL_DATA);
let currentUser = userPool.getCurrentUser();

export function getCurrentUser() {
    return currentUser;
}

function getCognitoUser(email) {
    const userData = {
        Username: email,
        Pool: userPool,
    };
    return new CognitoUser(userData);
}

export async function getSession() {
    if (!currentUser) {
        currentUser = userPool.getCurrentUser();
    }

    return new Promise(function (resolve, reject) {
        currentUser.getSession(function (err, session) {
            if (err) {
                reject(err);
            } else {
                resolve(session);
            }
        });
    }).catch((err) => {
        throw err;
    });
}

export async function signUpUserWithEmail(username, email, password, name) {
    return new Promise(function (resolve, reject) {
        const attributeList = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: email,
            }), new CognitoUserAttribute({
                Name: 'name',
                Value: name,
            })
        ];

        userPool.signUp(username, password, attributeList, [], function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    }).catch((err) => {
        throw err;
    });
}

export async function verifyCode(email, code) {
    return new Promise(function (resolve, reject) {
        const cognitoUser = getCognitoUser(email);

        cognitoUser.confirmRegistration(code, true, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    }).catch((err) => {
        throw err;
    });
}


export async function signInWithEmail(email, password) {
    return new Promise(function (resolve, reject) {
        const authenticationData = {
            Username: email,
            Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        currentUser = getCognitoUser(email);

        currentUser.authenticateUser(authenticationDetails, {
            onSuccess: function (res) {
                resolve(res);
            },
            onFailure: function (err) {
                reject(err);
            },
        });
    }).catch((err) => {
        throw err;
    });
}


export function signOut() {
    if (currentUser) {
        currentUser.signOut();
    }
}


export async function getAttributes() {
    return new Promise(function (resolve, reject) {
        currentUser.getUserAttributes(function (err, attributes) {
            if (err) {
                reject(err);
            } else {
                resolve(attributes);
            }
        });
    }).catch((err) => {
        throw err;
    });
}


export async function setAttribute(attribute) {
    return new Promise(function (resolve, reject) {
        const attributeList = [];
        const res = new CognitoUserAttribute(attribute);
        attributeList.push(res);

        currentUser.updateAttributes(attributeList, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    }).catch((err) => {
        throw err;
    });
}


export async function sendCode(email) {
    return new Promise(function (resolve, reject) {
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
    }).catch((err) => {
        throw err;
    });
}


export async function forgotPassword(email, code, password) {
    return new Promise(function (resolve, reject) {
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


export async function changePassword(oldPassword, newPassword) {
    return new Promise(function (resolve, reject) {
        currentUser.changePassword(oldPassword, newPassword, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}