package user

import (
	"context"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type DeleteSubUserByNameLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// delete sub-user by name
func NewDeleteSubUserByNameLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeleteSubUserByNameLogic {
	return &DeleteSubUserByNameLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeleteSubUserByNameLogic) DeleteSubUserByName(req *types.DeleteSubUserByNameReq) (resp *types.DeleteSubUserByNameResp, err error) {
	// todo: add your logic here and delete this line

	return
}
