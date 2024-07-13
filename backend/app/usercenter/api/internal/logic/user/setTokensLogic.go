package user

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type SetTokensLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// NewSetTokensLogic setTokens
func NewSetTokensLogic(ctx context.Context, svcCtx *svc.ServiceContext) *SetTokensLogic {
	return &SetTokensLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *SetTokensLogic) SetTokens(req *types.SetTokensReq) (resp *types.SetTokensResp, err error) {
	// todo: add your logic here and delete this line
	fmt.Printf("%s\n", req.IdToken)
	return &types.SetTokensResp{
		Code: 1,
		Msg:  "123",
	}, nil
}
