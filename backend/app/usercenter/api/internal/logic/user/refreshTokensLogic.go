package user

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type RefreshTokensLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// refreshTokens
func NewRefreshTokensLogic(ctx context.Context, svcCtx *svc.ServiceContext) *RefreshTokensLogic {
	return &RefreshTokensLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *RefreshTokensLogic) RefreshTokens() (resp *types.RefreshTokensResp, err error) {

	return &types.RefreshTokensResp{
		Code: 0,
		Msg:  fmt.Sprintf("refresh_token: %s", l.ctx.Value("refresh_token").(string)),
	}, nil
}
