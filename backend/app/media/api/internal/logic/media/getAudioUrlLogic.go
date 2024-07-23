package media

import (
	"context"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetAudioUrlLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get audio presigned url
func NewGetAudioUrlLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetAudioUrlLogic {
	return &GetAudioUrlLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetAudioUrlLogic) GetAudioUrl(req *types.GetAudioUrlReq) (resp *types.GetAudioUrlResp, err error) {
	// todo: add your logic here and delete this line

	return
}
