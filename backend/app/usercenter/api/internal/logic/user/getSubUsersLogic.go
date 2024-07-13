package user

import (
	"context"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetSubUsersLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get the list of sub-users
func NewGetSubUsersLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetSubUsersLogic {
	return &GetSubUsersLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetSubUsersLogic) GetSubUsers() (resp *types.GetSubUsersResp, err error) {
	// todo: add your logic here and delete this line

	return
}
