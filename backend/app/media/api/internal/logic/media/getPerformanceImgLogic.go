package media

import (
	"context"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetPerformanceImgLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get performance thumbnail
func NewGetPerformanceImgLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetPerformanceImgLogic {
	return &GetPerformanceImgLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetPerformanceImgLogic) GetPerformanceImg(req *types.GetPerformanceImgReq) (resp *types.GetPerformanceImgResp, err error) {
	// todo: add your logic here and delete this line

	return
}
