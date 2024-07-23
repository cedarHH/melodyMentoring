package media

import (
	"context"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetRecordLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get performance record
func NewGetRecordLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetRecordLogic {
	return &GetRecordLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetRecordLogic) GetRecord(req *types.GetRecordReq) (resp *types.GetRecordResp, err error) {
	// todo: add your logic here and delete this line

	return
}
