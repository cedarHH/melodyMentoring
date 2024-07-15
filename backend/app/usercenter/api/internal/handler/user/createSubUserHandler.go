package user

import (
	"net/http"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/logic/user"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

// create sub-user
func CreateSubUserHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.CreateSubUserReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := user.NewCreateSubUserLogic(r.Context(), svcCtx)
		resp, err := l.CreateSubUser(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
