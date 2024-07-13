package user

import (
	"context"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetAvatarUploadUrlLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get avatar uploda url
func NewGetAvatarUploadUrlLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetAvatarUploadUrlLogic {
	return &GetAvatarUploadUrlLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetAvatarUploadUrlLogic) GetAvatarUploadUrl(req *types.GetAvatarUploadUrlReq) (resp *types.GetAvatarUploadUrlResp, err error) {
	// todo: add your logic here and delete this line

	return
}
