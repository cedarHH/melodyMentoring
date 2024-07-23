package media

import (
	"context"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateRecordLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// create new performance record
func NewCreateRecordLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateRecordLogic {
	return &CreateRecordLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateRecordLogic) CreateRecord(req *types.CreateRecordReq) (resp *types.CreateRecordResp, err error) {
	// todo: add your logic here and delete this line

	return
}
