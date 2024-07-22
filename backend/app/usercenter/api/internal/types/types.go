// Code generated by goctl. DO NOT EDIT.
package types

type AvatarFile struct {
	PresignedURL string `json:"presignedurl"`
	FileName     string `json:"fileName"`
}

type CreateSubUserReq struct {
	ProfileName string `json:"profileName"`
	Pin         string `json:"pin"`
}

type CreateSubUserResp struct {
	Code int    `json:"code"`
	Msg  string `json:"msg"`
}

type DeleteSubUserByNameReq struct {
	ProfileName string `json:"profileName"`
	Pin         string `json:"pin"`
}

type DeleteSubUserByNameResp struct {
	Code int    `json:"code"`
	Msg  string `json:"msg"`
}

type GetAvatarReq struct {
	ProfileName string `header:"profileName"`
}

type GetAvatarResp struct {
	Code         int    `json:"code"`
	PresignedURL string `json:"presignedurl"`
	Msg          string `json:"msg"`
}

type GetAvatarUploadUrlReq struct {
	ProfileName string `header:"profileName"`
}

type GetAvatarUploadUrlResp struct {
	Code int        `json:"code"`
	Data AvatarFile `json:"data"`
	Msg  string     `json:"msg"`
}

type GetSubUserByNameReq struct {
	ProfileName string `header:"profileName"`
}

type GetSubUserByNameResp struct {
	Code int    `json:"code"`
	Data User   `json:"data"`
	Msg  string `json:"msg"`
}

type GetSubUsersResp struct {
	Code int       `json:"code"`
	Data []SubUser `json:"data"`
	Msg  string    `json:"msg"`
}

type RefreshTokensResp struct {
	Code int    `json:"code"`
	Msg  string `json:"msg"`
}

type SetTokensReq struct {
	IdToken      string `json:"idToken"`
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}

type SetTokensResp struct {
	Code int    `json:"code"`
	Msg  string `json:"msg"`
}

type SubUser struct {
	ProfileName string `json:"profileName"`
	Avatar      string `json:"avatar"`
}

type UpdateAvatarSuccessReq struct {
	ProfileName string `json:"profileName"`
	FileName    string `json:"fileName"`
}

type UpdateAvatarSuccessResp struct {
	Code int    `json:"code"`
	Msg  string `json:"msg"`
}

type UpdateSubUserAttrReq struct {
	ProfileName string `json:"profileName"`
	Gender      string `json:"gender,optional"`
	Dob         string `json:"dob,optional"`
	Level       string `json:"level,optional"`
	Instrument  string `json:"instrument,optional"`
	Badge       string `json:"badge,optional"`
}

type UpdateSubUserAttrResp struct {
	Code int    `json:"code"`
	Msg  string `json:"msg"`
}

type User struct {
	Uuid            string   `json:"uuid"`
	ProfileName     string   `json:"profileName"`
	Pin             string   `json:"pin"`
	Avatar          string   `json:"avatar"`
	Gender          string   `json:"gender"`
	Dob             string   `json:"dob"`
	Level           string   `json:"level"`
	Instrument      string   `json:"instrument"`
	TotalTime       int64    `json:"totaltime"`
	NotesPlayed     int64    `json:"notesplayed"`
	LastPlayDate    string   `json:"lastplaydate"`
	ConsecutiveDays int64    `json:"consecutivedays"`
	Badges          []string `json:"badges"`
}

type VerifypinReq struct {
	ProfileName string `json:"profileName"`
	Pin         string `json:"pin"`
}

type VerifypinResp struct {
	Code int    `json:"code"`
	Msg  string `json:"msg"`
}
