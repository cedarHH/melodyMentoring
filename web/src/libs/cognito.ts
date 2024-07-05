import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js'
import {POOL_DATA} from "../constants/awsCognitoConf";

const userPool: CognitoUserPool = new CognitoUserPool(POOL_DATA)

let currentUser: any = userPool.getCurrentUser()

export function getCurrentUser() {
    return currentUser
}

function getCognitoUser(email: string) {
    const userData = {
        Username: email,
        Pool: userPool,
    }
    return new CognitoUser(userData)
}

export async function getSession() {
    if (!currentUser) {
        currentUser = userPool.getCurrentUser()
    }

    return new Promise(function (resolve, reject) {
        currentUser.getSession(function (err: any, session: any) {
            if (err) {
                reject(err)
            } else {
                resolve(session)
            }
        })
    }).catch((err) => {
        throw err
    })
}

export async function signUpUserWithEmail(username: string, email: string, password: string) {
    return new Promise(function (resolve, reject) {
        const attributeList = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: email,
            }),
        ]

        userPool.signUp(username, password, attributeList, [], function (err, res) {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    }).catch((err) => {
        throw err
    })
}

export async function verifyCode(email: string, code: string) {
    return new Promise(function (resolve, reject) {
        const cognitoUser = getCognitoUser(email)

        cognitoUser.confirmRegistration(code, true, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    }).catch((err) => {
        throw err
    })
}

export async function signInWithEmail(email: string, password: string) {
    return new Promise(function (resolve, reject) {
        const authenticationData = {
            Username: email,
            Password: password,
        }
        const authenticationDetails = new AuthenticationDetails(authenticationData)

        currentUser = getCognitoUser(email)

        currentUser.authenticateUser(authenticationDetails, {
            onSuccess: function (res: any) {
                resolve(res)
            },
            onFailure: function (err: any) {
                reject(err)
            },
        })
    }).catch((err) => {
        throw err
    })
}

export function signOut() {
    if (currentUser) {
        currentUser.signOut()
    }
}

export async function getAttributes() {
    return new Promise(function (resolve, reject) {
        currentUser.getUserAttributes(function (err: any, attributes: any) {
            if (err) {
                reject(err)
            } else {
                resolve(attributes)
            }
        })
    }).catch((err) => {
        throw err
    })
}

export async function setAttribute(attribute: any) {
    return new Promise(function (resolve, reject) {
        const attributeList = []
        const res = new CognitoUserAttribute(attribute)
        attributeList.push(res)

        currentUser.updateAttributes(attributeList, (err: any, res: any) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    }).catch((err) => {
        throw err
    })
}

export async function sendCode(email: string) {
    return new Promise(function (resolve, reject) {
        const cognitoUser = getCognitoUser(email)

        if (!cognitoUser) {
            reject(`could not find ${email}`)
            return
        }

        cognitoUser.forgotPassword({
            onSuccess: function (res) {
                resolve(res)
            },
            onFailure: function (err) {
                reject(err)
            },
        })
    }).catch((err) => {
        throw err
    })
}

export async function forgotPassword(email: string, code: string, password: string) {
    return new Promise(function (resolve, reject) {
        const cognitoUser = getCognitoUser(email)

        if (!cognitoUser) {
            reject(`could not find ${email}`)
            return
        }

        cognitoUser.confirmPassword(code, password, {
            onSuccess: function () {
                resolve('password updated')
            },
            onFailure: function (err) {
                reject(err)
            },
        })
    })
}

export async function changePassword(oldPassword: string, newPassword: string) {
    return new Promise(function (resolve, reject) {
        currentUser.changePassword(oldPassword, newPassword, function (err: any, res: any) {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
