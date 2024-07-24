package media

import (
	"context"
	"fmt"

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

func (l *UploadVideoSuccessLogic) UploadVideoSuccess(
	req *types.UploadVideoSuccessReq) (resp *types.UploadVideoSuccessResp, err error) {

	subUserId := fmt.Sprintf(
		"%s_%s",
		l.ctx.Value("uuid").(string),
		req.ProfileName)
	recordId := req.RecordId
	fileName := req.FileName

	err = l.svcCtx.VideoModel.CheckFileExists(l.ctx, fileName)
	if err != nil {
		return nil, fmt.Errorf("file %s does not exist: %w", fileName, err)
	}

	updates := map[string]interface{}{
		"Video": fileName,
	}
	err = l.svcCtx.RecordModel.UpdateAttributes(l.ctx, subUserId, recordId, updates)
	if err != nil {
		return nil, fmt.Errorf("failed to update video: %w", err)
	}
	return &types.UploadVideoSuccessResp{
		Code: 0,
		Msg:  "😥",
	}, nil
}
