package user

import (
	"context"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type VerifypinLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// verify pin code
func NewVerifypinLogic(ctx context.Context, svcCtx *svc.ServiceContext) *VerifypinLogic {
	return &VerifypinLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *VerifypinLogic) Verifypin(req *types.VerifypinReq) (resp *types.VerifypinResp, err error) {
	// todo: add your logic here and delete this line

	return
}
