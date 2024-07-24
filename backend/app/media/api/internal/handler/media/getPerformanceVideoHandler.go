package media

import (
	"net/http"

	"github.com/cedarHH/mygo/app/media/api/internal/logic/media"
	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

// get performance video
func GetPerformanceVideoHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.GetPerformanceVideoReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := media.NewGetPerformanceVideoLogic(r.Context(), svcCtx)
		resp, err := l.GetPerformanceVideo(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
