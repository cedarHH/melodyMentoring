package user

import (
	"context"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetSubUserByNameLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get sub-user by name
func NewGetSubUserByNameLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetSubUserByNameLogic {
	return &GetSubUserByNameLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetSubUserByNameLogic) GetSubUserByName(req *types.GetSubUserByNameReq) (resp *types.GetSubUserByNameResp, err error) {
	// todo: add your logic here and delete this line

	return
}
