package media

import (
	"context"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetVedioUrlLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get vedio presigned url
func NewGetVedioUrlLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetVedioUrlLogic {
	return &GetVedioUrlLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetVedioUrlLogic) GetVedioUrl(req *types.GetVedioUrlReq) (resp *types.GetVedioUrlResp, err error) {
	// todo: add your logic here and delete this line

	return
}
