package user

import (
	"net/http"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/logic/user"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/zeromicro/go-zero/rest/httpx"
)

// refreshTokens
func RefreshTokensHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := user.NewRefreshTokensLogic(r.Context(), svcCtx)
		resp, err := l.RefreshTokens()
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
