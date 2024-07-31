// Code generated by goctl. DO NOT EDIT.
package types

type CreateRecordReq struct {
	ProfileName string `json:"profileName"`
	Reference   string `json:"reference"`
}

type CreateRecordResp struct {
	Code     int64  `json:"code"`
	RecordId int64  `json:"recordId"`
	Msg      string `json:"msg"`
}

type CreateReferenceReq struct {
	Title      string `json:"title"`
	Style      string `json:"style"`
	Composer   string `json:"composer"`
	Instrument string `json:"instrument"`
}

type CreateReferenceResp struct {
	Code  int64  `json:"code"`
	RefId string `json:"refId"`
	Msg   string `json:"msg"`
}

type DeleteRecordReq struct {
	ProfileName string `json:"profileName"`
	RecordId    int64  `json:"recordId"`
}

type DeleteRecordResp struct {
	Code int64  `json:"code"`
	Msg  string `json:"msg"`
}

type DeleteReferenceReq struct {
	RefId string `json:"refId"`
}

type DeleteReferenceResp struct {
	Code int64  `json:"code"`
	Msg  string `json:"msg"`
}

type FileDetails struct {
	PresignedURL string `json:"presignedurl"`
	FileName     string `json:"fileName"`
}

type GetAnalysisResultReq struct {
	AnalysisId int64 `form:"analysisId"`
}

type GetAnalysisResultResp struct {
	Code int64      `json:"code"`
	Data ResultData `json:"data"`
	Msg  string     `json:"msg"`
}

type GetAudioUrlReq struct {
	ProfileName string `json:"profileName"`
	RecordId    int64  `json:"recordId"`
}

type GetAudioUrlResp struct {
	Code int64       `json:"code"`
	Data FileDetails `json:"data"`
	Msg  string      `json:"msg"`
}

type GetPerformanceAudioReq struct {
	ProfileName string `json:"profileName"`
	RecordId    int64  `json:"recordId"`
}

type GetPerformanceAudioResp struct {
	Code         int64  `json:"code"`
	PresignedURL string `json:"presignedurl"`
	Msg          string `json:"msg"`
}

type GetPerformanceImgReq struct {
	ProfileName string `json:"profileName"`
	RecordId    int64  `json:"recordId"`
}

type GetPerformanceImgResp struct {
	Code         int64  `json:"code"`
	PresignedURL string `json:"presignedurl"`
	Msg          string `json:"msg"`
}

type GetPerformanceMidiReq struct {
	ProfileName string `json:"profileName"`
	RecordId    int64  `json:"recordId"`
}

type GetPerformanceMidiResp struct {
	Code         int64  `json:"code"`
	PresignedURL string `json:"presignedurl"`
	Msg          string `json:"msg"`
}

type GetPerformanceReportReq struct {
	ProfileName string `json:"profileName"`
	RecordId    int64  `json:"recordId"`
}

type GetPerformanceReportResp struct {
	Code         int64  `json:"code"`
	PresignedURL string `json:"presignedurl"`
	Msg          string `json:"msg"`
}

type GetPerformanceSheetReq struct {
	ProfileName string `json:"profileName"`
	RecordId    int64  `json:"recordId"`
}

type GetPerformanceSheetResp struct {
	Code         int64  `json:"code"`
	PresignedURL string `json:"presignedurl"`
	Msg          string `json:"msg"`
}

type GetPerformanceVideoReq struct {
	ProfileName string `json:"profileName"`
	RecordId    int64  `json:"recordId"`
}

type GetPerformanceVideoResp struct {
	Code         int64  `json:"code"`
	PresignedURL string `json:"presignedurl"`
	Msg          string `json:"msg"`
}

type GetPerformanceWaterfallReq struct {
	ProfileName string `json:"profileName"`
	RecordId    int64  `json:"recordId"`
}

type GetPerformanceWaterfallResp struct {
	Code         int64  `json:"code"`
	PresignedURL string `json:"presignedurl"`
	Msg          string `json:"msg"`
}

type GetRecordReq struct {
	ProfileName string `json:"profileName"`
	Limit       int64  `json:"limit"`
	Offset      int64  `json:"offset,optional"`
	Start       int64  `json:"start"`
	End         int64  `json:"end"`
}

type GetRecordResp struct {
	Code int64        `json:"code"`
	Data []RecordInfo `json:"data"`
	Msg  string       `json:"msg"`
}

type GetRefAudioReq struct {
	RefId string `json:"refId"`
}

type GetRefAudioResp struct {
	Code         int64  `json:"code"`
	PresignedURL string `json:"presignedurl"`
	Msg          string `json:"msg"`
}

type GetRefAudioUrlReq struct {
	RefId string `json:"refId"`
}

type GetRefAudioUrlResp struct {
	Code int64      `json:"code"`
	Data UrlDetails `json:"data"`
	Msg  string     `json:"msg"`
}

type GetRefImgReq struct {
	RefId string `json:"refId"`
}

type GetRefImgResp struct {
	Code         int64  `json:"code"`
	PresignedURL string `json:"presignedurl"`
	Msg          string `json:"msg"`
}

type GetRefImgUrlReq struct {
	RefId string `json:"refId"`
}

type GetRefImgUrlResp struct {
	Code int64      `json:"code"`
	Data UrlDetails `json:"data"`
	Msg  string     `json:"msg"`
}

type GetRefMidiReq struct {
	RefId string `json:"refId"`
}

type GetRefMidiResp struct {
	Code         int64  `json:"code"`
	PresignedURL string `json:"presignedurl"`
	Msg          string `json:"msg"`
}

type GetRefSheetReq struct {
	RefId string `json:"refId"`
}

type GetRefSheetResp struct {
	Code         int64  `json:"code"`
	PresignedURL string `json:"presignedurl"`
	Msg          string `json:"msg"`
}

type GetRefVideoReq struct {
	RefId string `json:"refId"`
}

type GetRefVideoResp struct {
	Code         int64  `json:"code"`
	PresignedURL string `json:"presignedurl"`
	Msg          string `json:"msg"`
}

type GetRefVideoUrlReq struct {
	RefId string `json:"refId"`
}

type GetRefVideoUrlResp struct {
	Code int64      `json:"code"`
	Data UrlDetails `json:"data"`
	Msg  string     `json:"msg"`
}

type GetRefWaterfallReq struct {
	RefId string `json:"refId"`
}

type GetRefWaterfallResp struct {
	Code         int64  `json:"code"`
	PresignedURL string `json:"presignedurl"`
	Msg          string `json:"msg"`
}

type GetReferenceReq struct {
	RefId string `json:"refId"`
}

type GetReferenceResp struct {
	Code int64       `json:"code"`
	Data QueryResult `json:"data"`
	Msg  string      `json:"msg"`
}

type GetVideoUrlReq struct {
	ProfileName string `json:"profileName"`
	RecordId    int64  `json:"recordId"`
}

type GetVideoUrlResp struct {
	Code int64       `json:"code"`
	Data FileDetails `json:"data"`
	Msg  string      `json:"msg"`
}

type PerformanceAnalysisReq struct {
	ProfileName string `json:"profileName"`
	RecordId    int64  `json:"recordId"`
}

type PerformanceAnalysisResp struct {
	Code       int64  `json:"code"`
	AnalysisId int64  `json:"analysisId"`
	Msg        string `json:"msg"`
}

type QueryReferenceReq struct {
	Title      string `json:"title"`
	Style      string `json:"style"`
	Composer   string `json:"composer"`
	Instrument string `json:"instrument"`
}

type QueryReferenceResp struct {
	Code int64         `json:"code"`
	Data []QueryResult `json:"data"`
	Msg  string        `json:"msg"`
}

type QueryResult struct {
	RefId      string `json:"refId"`
	Title      string `json:"title"`
	Style      string `json:"style"`
	Composer   string `json:"composer"`
	Instrument string `json:"instrument"`
}

type Record struct {
	SubUserId   string `json:"subUserId"`
	Timestamp   int64  `json:"timestamp"`
	Composition string `json:"composition"`
	Reference   string `json:"reference"`
	Image       string `json:"image"`
	Video       string `json:"video"`
	Audio       string `json:"audio"`
	Midi        string `json:"midi"`
	Sheet       string `json:"sheet"`
	Diff        string `json:"diff"`
	Waterfall   string `json:"waterfall"`
	Report      string `json:"report"`
	IsRef       bool   `json:"isRef"`
}

type RecordInfo struct {
	RecordId    int64  `json:"RecordId"`
	Composition string `json:"composition"`
	Reference   string `json:"reference"`
}

type Reference struct {
	RefId      string `json:"refId"`
	Title      string `json:"title"`
	Style      string `json:"style"`
	Composer   string `json:"composer"`
	Instrument string `json:"instrument"`
	Image      string `json:"image"`
	Video      string `json:"video"`
	Audio      string `json:"audio"`
	Midi       string `json:"midi"`
	Sheet      string `json:"sheet"`
	Waterfall  string `json:"waterfall"`
	Json       string `json:"json"`
}

type ResultData struct {
	AnalysisRank int64 `json:"analysisRank"`
}

type SetAsReferenceReq struct {
	ProfileName string `json:"profileName"`
	RecordId    int64  `json:"recordId"`
	IsRef       bool   `json:"isRef"`
}

type SetAsReferenceResp struct {
	Code int64  `json:"code"`
	Msg  string `json:"msg"`
}

type UploadAudioSuccessReq struct {
	ProfileName string `json:"profileName"`
	RecordId    int64  `json:"recordId"`
	FileName    string `json:"fileName"`
}

type UploadAudioSuccessResp struct {
	Code int64  `json:"code"`
	Msg  string `json:"msg"`
}

type UploadRefAudioSuccessReq struct {
	RefId    string `json:"refId"`
	FileName string `json:"fileName"`
}

type UploadRefAudioSuccessResp struct {
	Code int64  `json:"code"`
	Msg  string `json:"msg"`
}

type UploadRefImgSuccessReq struct {
	RefId    string `json:"refId"`
	FileName string `json:"fileName"`
}

type UploadRefImgSuccessResp struct {
	Code int64  `json:"code"`
	Msg  string `json:"msg"`
}

type UploadRefVideoSuccessReq struct {
	RefId    string `json:"refId"`
	FileName string `json:"fileName"`
}

type UploadRefVideoSuccessResp struct {
	Code int64  `json:"code"`
	Msg  string `json:"msg"`
}

type UploadVideoSuccessReq struct {
	ProfileName string `json:"profileName"`
	RecordId    int64  `json:"recordId"`
	FileName    string `json:"fileName"`
}

type UploadVideoSuccessResp struct {
	Code int64  `json:"code"`
	Msg  string `json:"msg"`
}

type UrlDetails struct {
	PresignedURL string `json:"presignedurl"`
	FileName     string `json:"fileName"`
}
