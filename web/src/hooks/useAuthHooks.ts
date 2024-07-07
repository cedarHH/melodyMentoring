import { useState, useEffect } from 'react';
import * as yup from 'yup';

export const useValidNickname = (initialValue: string) => {
    const [nickname, setNickname] = useState(initialValue);
    const [nicknameIsValid, setNicknameIsValid] = useState(true);

    useEffect(() => {
        const nicknameSchema = yup.object().shape({
            nickname: yup.string().min(4).required(),
        })

        if (nickname.length === 0) {
            setNicknameIsValid(false)
            return
        }

        const isValid = nicknameSchema.isValidSync({ nickname })

        setNicknameIsValid(isValid)
    }, [nickname])

    return { nickname, setNickname, nicknameIsValid };
};

export const useValidEmail = (initialValue: string) => {
    const [email, setEmail] = useState(initialValue);
    const [emailIsValid, setEmailIsValid] = useState(true);

    useEffect(() => {
        const emailSchema = yup.object().shape({
            email: yup.string().email().required(),
        });

        if (email.length === 0) {
            setEmailIsValid(false);
            return;
        }

        const isValid = emailSchema.isValidSync({ email });

        setEmailIsValid(isValid);
    }, [email]);

    return { email, setEmail, emailIsValid };
};

export const useValidPassword = (initialValue: string) => {
    const [password, setPassword] = useState(initialValue)
    const [passwordIsValid, setPasswordIsValid] = useState(true)
    const [formatError, setFormatError] = useState<string | null>(null)

    useEffect(() => {
        const specialChars = '^$*.[]{}()?-\"!@#%&/\\,><\':;|_~`+='

        const passwordSchema = yup.object().shape({
            password: yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(/\d/, 'Password must contain at least one number')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(new RegExp(`[${specialChars.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}]`), 'Password must contain at least one special character')
                .required('Password is required'),
        })

        if (password.length === 0) {
            setPasswordIsValid(false)
            setFormatError(null)
            return
        }

        passwordSchema.validate({ password }).then(() => {
            setPasswordIsValid(true)
            setFormatError(null)
        }).catch((err) => {
            setPasswordIsValid(false)
            setFormatError(err.errors[0])
        })
    }, [password])

    return { password, setPassword, passwordIsValid, formatError }
}

export const useValidCode = (initialValue: string) => {
    const [code, setCode] = useState(initialValue)
    const [codeIsValid, setCodeIsValid] = useState(true)

    useEffect(() => {
        const codeSchema = yup.object().shape({
            code: yup.string().min(6).required(),
        })

        if (code.length === 0) {
            setCodeIsValid(false)
            return
        }

        const isValid = codeSchema.isValidSync({ code })

        setCodeIsValid(isValid)
    }, [code])

    return { code, setCode, codeIsValid }
}
