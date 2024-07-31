package reference

import (
	"context"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetRefImgUrlLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get reference img
func NewGetRefImgUrlLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetRefImgUrlLogic {
	return &GetRefImgUrlLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetRefImgUrlLogic) GetRefImgUrl(
	req *types.GetRefImgUrlReq) (resp *types.GetRefImgUrlResp, err error) {

	fileType := ".png"
	fileName := req.RefId + fileType

	presignedURL, err := l.svcCtx.ThumbnailModel.GetPresignedUploadURL(l.ctx, fileName, 3600)
	if err != nil {
		return &types.GetRefImgUrlResp{
			Code: 500,
			Data: types.UrlDetails{},
			Msg:  "Failed to get presigned URL",
		}, err
	}

	urlDetails := types.UrlDetails{
		PresignedURL: presignedURL,
		FileName:     fileName,
	}

	return &types.GetRefImgUrlResp{
		Code: 0,
		Data: urlDetails,
		Msg:  "",
	}, nil
}
