package media

import (
	"context"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetPerformanceWaterfallLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get performance waterfall
func NewGetPerformanceWaterfallLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetPerformanceWaterfallLogic {
	return &GetPerformanceWaterfallLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetPerformanceWaterfallLogic) GetPerformanceWaterfall(req *types.GetPerformanceWaterfallReq) (resp *types.GetPerformanceWaterfallResp, err error) {
	// todo: add your logic here and delete this line

	return
}
