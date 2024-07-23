package media

import (
	"context"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetPerformanceSheetLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get performance sheet
func NewGetPerformanceSheetLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetPerformanceSheetLogic {
	return &GetPerformanceSheetLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetPerformanceSheetLogic) GetPerformanceSheet(req *types.GetPerformanceSheetReq) (resp *types.GetPerformanceSheetResp, err error) {
	// todo: add your logic here and delete this line

	return
}
