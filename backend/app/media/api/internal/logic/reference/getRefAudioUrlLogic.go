package reference

import (
	"context"
	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetRefAudioUrlLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get reference audio
func NewGetRefAudioUrlLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetRefAudioUrlLogic {
	return &GetRefAudioUrlLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetRefAudioUrlLogic) GetRefAudioUrl(
	req *types.GetRefAudioUrlReq) (resp *types.GetRefAudioUrlResp, err error) {

	fileType := ".mp3"
	fileName := req.RefId + fileType

	presignedURL, err := l.svcCtx.AudioModel.GetPresignedUploadURL(l.ctx, fileName, 3600)
	if err != nil {
		return &types.GetRefAudioUrlResp{
			Code: 500,
			Data: types.UrlDetails{},
			Msg:  "Failed to get presigned URL",
		}, err
	}

	urlDetails := types.UrlDetails{
		PresignedURL: presignedURL,
		FileName:     fileName,
	}

	return &types.GetRefAudioUrlResp{
		Code: 0,
		Data: urlDetails,
		Msg:  "",
	}, nil
}
