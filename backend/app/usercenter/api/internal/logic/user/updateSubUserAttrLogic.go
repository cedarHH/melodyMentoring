package user

import (
	"context"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateSubUserAttrLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// update sub-user attr
func NewUpdateSubUserAttrLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateSubUserAttrLogic {
	return &UpdateSubUserAttrLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateSubUserAttrLogic) UpdateSubUserAttr(req *types.UpdateSubUserAttrReq) (resp *types.UpdateSubUserAttrResp, err error) {
	// todo: add your logic here and delete this line
	return
}
