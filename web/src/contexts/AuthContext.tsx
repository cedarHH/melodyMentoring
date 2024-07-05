import React, { useState, useEffect, useContext } from 'react'

import * as cognito from '../libs/cognito'

export enum AuthStatus {
    Loading,
    SignedIn,
    SignedOut,
}

export interface IAuth {
    sessionInfo?: { username?: string; email?: string; sub?: string; accessToken?: string; refreshToken?: string }
    attrInfo?: any
    authStatus?: AuthStatus
    signInWithEmail?: (username: string, password: string) => Promise<void>
    signUpWithEmail?: (username: string, email: string, password: string) => Promise<void>
    signOut?: () => void
    verifyCode?: (username: string, code: string) => Promise<void>
    getSession?: () => Promise<any>
    sendCode?: (username: string) => Promise<void>
    forgotPassword?: (username: string, code: string, password: string) => Promise<void>
    changePassword?: (oldPassword: string, newPassword: string) => Promise<void>
    getAttributes?: () => Promise<any>
    setAttribute?: (attr: any) => Promise<any>
}

const defaultState: IAuth = {
    sessionInfo: {},
    authStatus: AuthStatus.Loading,
}

type Props = {
    children?: React.ReactNode
}

export const AuthContext = React.createContext(defaultState)

export const AuthIsSignedIn = ({ children }: Props) => {
    const { authStatus }: IAuth = useContext(AuthContext)

    return <>{authStatus === AuthStatus.SignedIn ? children : null}</>
}

export const AuthIsNotSignedIn = ({ children }: Props) => {
    const { authStatus }: IAuth = useContext(AuthContext)

    return <>{authStatus === AuthStatus.SignedOut ? children : null}</>
}

const AuthProvider = ({ children }: Props) => {
    const [authStatus, setAuthStatus] = useState(AuthStatus.Loading)
    const [sessionInfo, setSessionInfo] = useState({})
    const [attrInfo, setAttrInfo] = useState([])

    useEffect(() => {
        async function getSessionInfo() {
            try {
                const session: any = await getSession()
                setSessionInfo({
                    accessToken: session.accessToken.jwtToken,
                    refreshToken: session.refreshToken.token,
                })
                window.localStorage.setItem('accessToken', `${session.accessToken.jwtToken}`)
                window.localStorage.setItem('refreshToken', `${session.refreshToken.token}`)
                const attr: any = await getAttributes()
                setAttrInfo(attr)
                setAuthStatus(AuthStatus.SignedIn)
            } catch (err) {
                setAuthStatus(AuthStatus.SignedOut)
            }
        }
        getSessionInfo().then(_ => {})
    }, [setAuthStatus, authStatus])

    if (authStatus === AuthStatus.Loading) {
        return null
    }

    async function signInWithEmail(email: string, password: string) {
        try {
            await cognito.signInWithEmail(email, password)
            setAuthStatus(AuthStatus.SignedIn)
        } catch (err) {
            setAuthStatus(AuthStatus.SignedOut)
            throw err
        }
    }

    async function signUpWithEmail(username: string, email: string, password: string) {
        try {
            await cognito.signUpUserWithEmail(username, email, password)
        } catch (err) {
            throw err
        }
    }

    function signOut() {
        cognito.signOut()
        setAuthStatus(AuthStatus.SignedOut)
    }

    async function verifyCode(email: string, code: string) {
        try {
            await cognito.verifyCode(email, code)
        } catch (err) {
            throw err
        }
    }

    async function getSession() {
        try {
            return await cognito.getSession()
        } catch (err) {
            throw err
        }
    }

    async function getAttributes() {
        try {
            return await cognito.getAttributes()
        } catch (err) {
            throw err
        }
    }

    async function setAttribute(attr: any) {
        try {
            return await cognito.setAttribute(attr)
        } catch (err) {
            throw err
        }
    }

    async function sendCode(email: string) {
        try {
            await cognito.sendCode(email)
        } catch (err) {
            throw err
        }
    }

    async function forgotPassword(email: string, code: string, password: string) {
        try {
            await cognito.forgotPassword(email, code, password)
        } catch (err) {
            throw err
        }
    }

    async function changePassword(oldPassword: string, newPassword: string) {
        try {
            await cognito.changePassword(oldPassword, newPassword)
        } catch (err) {
            throw err
        }
    }

    const state: IAuth = {
        authStatus,
        sessionInfo,
        attrInfo,
        signUpWithEmail,
        signInWithEmail,
        signOut,
        verifyCode,
        getSession,
        sendCode,
        forgotPassword,
        changePassword,
        getAttributes,
        setAttribute,
    }

    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export default AuthProvider
