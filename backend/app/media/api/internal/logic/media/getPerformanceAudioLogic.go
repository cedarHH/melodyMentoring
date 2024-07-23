package media

import (
	"context"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetPerformanceAudioLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get performance audio
func NewGetPerformanceAudioLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetPerformanceAudioLogic {
	return &GetPerformanceAudioLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetPerformanceAudioLogic) GetPerformanceAudio(req *types.GetPerformanceAudioReq) (resp *types.GetPerformanceAudioResp, err error) {
	// todo: add your logic here and delete this line

	return
}
