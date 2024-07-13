package user

import (
	"context"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateSubUserLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// create sub-user
func NewCreateSubUserLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateSubUserLogic {
	return &CreateSubUserLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateSubUserLogic) CreateSubUser(req *types.CreateSubUserReq) (resp *types.CreateSubUserResp, err error) {
	// todo: add your logic here and delete this line

	return
}
