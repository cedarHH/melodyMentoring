package media

import (
	"context"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UploadVideoSuccessLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// upload video success
func NewUploadVideoSuccessLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UploadVideoSuccessLogic {
	return &UploadVideoSuccessLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UploadVideoSuccessLogic) UploadVideoSuccess(req *types.UploadVideoSuccessReq) (resp *types.UploadVideoSuccessResp, err error) {
	// todo: add your logic here and delete this line

	return
}
