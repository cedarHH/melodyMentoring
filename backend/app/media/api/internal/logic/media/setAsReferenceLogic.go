package media

import (
	"context"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type SetAsReferenceLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// set a performance record as reference
func NewSetAsReferenceLogic(ctx context.Context, svcCtx *svc.ServiceContext) *SetAsReferenceLogic {
	return &SetAsReferenceLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *SetAsReferenceLogic) SetAsReference(req *types.SetAsReferenceReq) (resp *types.SetAsReferenceResp, err error) {
	// todo: add your logic here and delete this line

	return
}
