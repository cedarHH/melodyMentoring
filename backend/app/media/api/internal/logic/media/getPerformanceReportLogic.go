package media

import (
	"context"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetPerformanceReportLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get performance report
func NewGetPerformanceReportLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetPerformanceReportLogic {
	return &GetPerformanceReportLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetPerformanceReportLogic) GetPerformanceReport(req *types.GetPerformanceReportReq) (resp *types.GetPerformanceReportResp, err error) {
	// todo: add your logic here and delete this line

	return
}
