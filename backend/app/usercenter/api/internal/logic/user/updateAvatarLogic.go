package user

import (
	"context"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateAvatarLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// update avatar
func NewUpdateAvatarLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateAvatarLogic {
	return &UpdateAvatarLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateAvatarLogic) UpdateAvatar(req *types.UpdateAvatarReq) (resp *types.UpdateAvatarResp, err error) {
	// todo: add your logic here and delete this line

	return
}
