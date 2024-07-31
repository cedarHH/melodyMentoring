package reference

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UploadRefVideoSuccessLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// upload video success
func NewUploadRefVideoSuccessLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UploadRefVideoSuccessLogic {
	return &UploadRefVideoSuccessLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UploadRefVideoSuccessLogic) UploadRefVideoSuccess(
	req *types.UploadRefVideoSuccessReq) (resp *types.UploadRefVideoSuccessResp, err error) {

	fileName := req.FileName

	err = l.svcCtx.VideoModel.CheckFileExists(l.ctx, fileName)
	if err != nil {
		return nil, fmt.Errorf("file %s does not exist: %w", fileName, err)
	}

	updates := map[string]interface{}{
		"Video": fileName,
	}
	err = l.svcCtx.ReferenceModel.UpdateAttributes(l.ctx, req.RefId, updates)
	if err != nil {
		return nil, fmt.Errorf("failed to update video: %w", err)
	}
	return &types.UploadRefVideoSuccessResp{
		Code: 0,
		Msg:  "😥",
	}, nil
}
