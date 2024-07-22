package user

import (
	"context"
	"net/http"
	"time"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type SetTokensLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// setTokens
func NewSetTokensLogic(ctx context.Context, svcCtx *svc.ServiceContext) *SetTokensLogic {
	return &SetTokensLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *SetTokensLogic) SetTokens(
	req *types.SetTokensReq, w http.ResponseWriter) (resp *types.SetTokensResp, err error) {

	setCookie := func(name, value string, duration time.Duration) {
		http.SetCookie(w, &http.Cookie{
			Name:     name,
			Value:    value,
			Path:     "/",
			Domain:   "localhost",
			Expires:  time.Now().Add(duration),
			HttpOnly: true,
			Secure:   true,
		})
	}

	setCookie("id_token", req.IdToken, 50*time.Minute)
	setCookie("access_token", req.AccessToken, 50*time.Minute)
	setCookie("refresh_token", req.RefreshToken, 24*time.Hour)

	return &types.SetTokensResp{
		Code: 0,
		Msg:  "Tokens set successfully",
	}, nil
}
