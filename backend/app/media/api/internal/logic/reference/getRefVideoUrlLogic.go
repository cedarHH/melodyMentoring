package reference

import (
	"context"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetRefVideoUrlLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get reference video
func NewGetRefVideoUrlLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetRefVideoUrlLogic {
	return &GetRefVideoUrlLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetRefVideoUrlLogic) GetRefVideoUrl(
	req *types.GetRefVideoUrlReq) (resp *types.GetRefVideoUrlResp, err error) {

	fileType := ".mp4"
	fileName := req.RefId + fileType

	presignedURL, err := l.svcCtx.VideoModel.GetPresignedUploadURL(l.ctx, fileName, 3600)
	if err != nil {
		return &types.GetRefVideoUrlResp{
			Code: 500,
			Data: types.UrlDetails{},
			Msg:  "Failed to get presigned URL",
		}, err
	}

	urlDetails := types.UrlDetails{
		PresignedURL: presignedURL,
		FileName:     fileName,
	}

	return &types.GetRefVideoUrlResp{
		Code: 0,
		Data: urlDetails,
		Msg:  "",
	}, nil
}
