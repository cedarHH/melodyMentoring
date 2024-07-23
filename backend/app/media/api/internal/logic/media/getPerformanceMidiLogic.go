package media

import (
	"context"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetPerformanceMidiLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get performance midi
func NewGetPerformanceMidiLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetPerformanceMidiLogic {
	return &GetPerformanceMidiLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetPerformanceMidiLogic) GetPerformanceMidi(req *types.GetPerformanceMidiReq) (resp *types.GetPerformanceMidiResp, err error) {
	// todo: add your logic here and delete this line

	return
}
