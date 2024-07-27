package media

import (
	"context"
	"fmt"

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

func (l *UploadAudioSuccessLogic) UploadAudioSuccess(
	req *types.UploadAudioSuccessReq) (resp *types.UploadAudioSuccessResp, err error) {

	subUserId := fmt.Sprintf(
		"%s_%s",
		l.ctx.Value("uuid").(string),
		req.ProfileName)
	recordId := req.RecordId
	fileName := req.FileName

	err = l.svcCtx.AudioModel.CheckFileExists(l.ctx, fileName)
	if err != nil {
		return nil, fmt.Errorf("file %s does not exist: %w", fileName, err)
	}

	message := fmt.Sprintf(`{"subUserId":"%s"}`, subUserId)
	err = l.svcCtx.RabbitMQ.SendMessage(message)
	if err != nil {
		return nil, fmt.Errorf("failed to send message to RabbitMQ: %w", err)
	}

	updates := map[string]interface{}{
		"Audio": fileName,
	}
	err = l.svcCtx.RecordModel.UpdateAttributes(l.ctx, subUserId, recordId, updates)
	if err != nil {
		return nil, fmt.Errorf("failed to update audio: %w", err)
	}
	return &types.UploadAudioSuccessResp{
		Code: 0,
		Msg:  "😥",
	}, nil
}
