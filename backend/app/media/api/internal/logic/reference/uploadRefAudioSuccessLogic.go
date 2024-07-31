package reference

import (
	"context"
	"fmt"
	"github.com/cedarHH/mygo/app/media/api/internal/logic/media"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UploadRefAudioSuccessLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// upload audio success
func NewUploadRefAudioSuccessLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UploadRefAudioSuccessLogic {
	return &UploadRefAudioSuccessLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UploadRefAudioSuccessLogic) UploadRefAudioSuccess(
	req *types.UploadRefAudioSuccessReq) (resp *types.UploadRefAudioSuccessResp, err error) {

	fileName := req.FileName

	err = l.svcCtx.AudioModel.CheckFileExists(l.ctx, fileName)
	if err != nil {
		return nil, fmt.Errorf("file %s does not exist: %w", fileName, err)
	}

	updates := map[string]interface{}{
		"Audio": fileName,
	}
	err = l.svcCtx.ReferenceModel.UpdateAttributes(l.ctx, req.RefId, updates)
	if err != nil {
		return nil, fmt.Errorf("failed to update audio: %w", err)
	}

	refId := fileName[:len(fileName)-4]

	audioURL, err := l.svcCtx.AudioModel.GetPresignedDownloadURL(l.ctx, fileName, 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned URL: %w", err)
	}
	midiURL, err := l.svcCtx.MidiModel.GetPresignedUploadURL(
		l.ctx, refId+".mid", 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned URL: %w", err)
	}
	sheetURL, err := l.svcCtx.SheetModel.GetPresignedUploadURL(
		l.ctx, refId+".musicxml", 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned URL: %w", err)
	}
	waterfallURL, err := l.svcCtx.WaterfallModel.GetPresignedUploadURL(
		l.ctx, refId+".png", 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned URL: %w", err)
	}
	jsonURL, err := l.svcCtx.ReportModel.GetPresignedUploadURL(
		l.ctx, refId+".json", 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned URL: %w", err)
	}

	jobId := media.GenerateJobId()

	message := fmt.Sprintf(
		`{"isRef":"%s", "jobId":%d, "subUserId":"%s",
				 "recordId":%d, "refId":"%s", "fileName":"%s", 
				"audioURL":"%s", "midiURL":"%s", "sheetURL":"%s", 
				"waterfallURL":"%s", "reportURL":"%s", "jsonURL":"%s"}`,
		"TRUE", jobId, "", 0, refId, refId,
		audioURL, midiURL, sheetURL, waterfallURL, "", jsonURL)

	err = l.svcCtx.AudioProcessingQueue.SendMessage(message)
	if err != nil {
		return nil, fmt.Errorf("failed to send message to RabbitMQ: %w", err)
	}

	return &types.UploadRefAudioSuccessResp{
		Code: 0,
		Msg:  "😥",
	}, nil
}
