package media

import (
	"context"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetPerformanceVedioLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get performance vedio
func NewGetPerformanceVedioLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetPerformanceVedioLogic {
	return &GetPerformanceVedioLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetPerformanceVedioLogic) GetPerformanceVedio(req *types.GetPerformanceVedioReq) (resp *types.GetPerformanceVedioResp, err error) {
	// todo: add your logic here and delete this line

	return
}
