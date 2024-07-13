package user

import (
	"net/http"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/logic/user"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/zeromicro/go-zero/rest/httpx"
)

// get the list of sub-users
func GetSubUsersHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := user.NewGetSubUsersLogic(r.Context(), svcCtx)
		resp, err := l.GetSubUsers()
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
