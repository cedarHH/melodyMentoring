package reference

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetRefImgLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get reference image
func NewGetRefImgLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetRefImgLogic {
	return &GetRefImgLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetRefImgLogic) GetRefImg(
	req *types.GetRefImgReq) (resp *types.GetRefImgResp, err error) {

	reference, err := l.svcCtx.ReferenceModel.FindOne(l.ctx, req.RefId)
	if err != nil {
		return nil, fmt.Errorf("reference not found: %v", err)
	}

	presignedURL, err := l.svcCtx.ThumbnailModel.GetPresignedDownloadURL(l.ctx, reference.Image, 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned download URL: %w", err)
	}

	return &types.GetRefImgResp{
		Code:         0,
		PresignedURL: presignedURL,
		Msg:          "🀄",
	}, nil
}
