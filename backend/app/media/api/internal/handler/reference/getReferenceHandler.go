package reference

import (
	"net/http"

	"github.com/cedarHH/mygo/app/media/api/internal/logic/reference"
	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

// get reference list
func GetReferenceHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.GetReferenceReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := reference.NewGetReferenceLogic(r.Context(), svcCtx)
		resp, err := l.GetReference(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}