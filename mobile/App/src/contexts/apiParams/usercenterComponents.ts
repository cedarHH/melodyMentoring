
export interface AvatarFile {
	presignedurl: string
	fileName: string
}

export interface CreateSubUserReq {
	profileName: string
	pin: string
}

export interface CreateSubUserResp {
	code: number
	msg: string
}

export interface DeleteSubUserByNameReq {
	profileName: string
	pin: string
}

export interface DeleteSubUserByNameResp {
	code: number
	msg: string
}

export interface GetAvatarReq {
}
export interface GetAvatarReqParams {
	profileName: string
}

export interface GetAvatarResp {
	code: number
	presignedurl: string
	msg: string
}

export interface GetAvatarUploadUrlReq {
}
export interface GetAvatarUploadUrlReqParams {
	profileName: string
}

export interface GetAvatarUploadUrlResp {
	code: number
	data: AvatarFile
	msg: string
}

export interface GetSubUserByNameReq {
}
export interface GetSubUserByNameReqParams {
	profileName: string
}

export interface GetSubUserByNameResp {
	code: number
	data: User
	msg: string
}

export interface GetSubUsersResp {
	code: number
	data: Array<SubUser>
	msg: string
}

export interface RefreshTokensResp {
	code: number
	msg: string
}

export interface SetTokensReq {
	idToken: string
	accessToken: string
	refreshToken: string
}

export interface SetTokensResp {
	code: number
	msg: string
}

export interface SubUser {
	profileName: string
	avatar: string
}

export interface UpdateAvatarSuccessReq {
	profileName: string
	fileName: string
}

export interface UpdateAvatarSuccessResp {
	code: number
	msg: string
}

export interface UpdateSubUserAttrReq {
	profileName: string
	gender?: string
	dob?: string
	level?: string
	instrument?: string
	badge?: string
}

export interface UpdateSubUserAttrResp {
	code: number
	msg: string
}

export interface User {
	uuid: string
	profileName: string
	pin: string
	avatar: string
	gender: string
	dob: string
	level: string
	instrument: string
	totaltime: number
	notesplayed: number
	lastplaydate: string
	consecutivedays: number
	badges: Array<string>
}

export interface VerifypinReq {
	profileName: string
	pin: string
}

export interface VerifypinResp {
	code: number
	msg: string
}

