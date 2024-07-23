package media

import (
	"context"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UploadAudioSuccessLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// upload audio success
func NewUploadAudioSuccessLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UploadAudioSuccessLogic {
	return &UploadAudioSuccessLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UploadAudioSuccessLogic) UploadAudioSuccess(req *types.UploadAudioSuccessReq) (resp *types.UploadAudioSuccessResp, err error) {
	// todo: add your logic here and delete this line

	return
}
