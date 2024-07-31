package reference

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetRefVideoLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get reference video
func NewGetRefVideoLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetRefVideoLogic {
	return &GetRefVideoLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetRefVideoLogic) GetRefVideo(
	req *types.GetRefVideoReq) (resp *types.GetRefVideoResp, err error) {

	reference, err := l.svcCtx.ReferenceModel.FindOne(l.ctx, req.RefId)
	if err != nil {
		return nil, fmt.Errorf("reference not found: %v", err)
	}

	presignedURL, err := l.svcCtx.VideoModel.GetPresignedDownloadURL(l.ctx, reference.Video, 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned download URL: %w", err)
	}

	return &types.GetRefVideoResp{
		Code:         0,
		PresignedURL: presignedURL,
		Msg:          "🀄",
	}, nil
}
