package reference

import (
	"context"
	"fmt"
	"github.com/cedarHH/mygo/app/media/api/internal/logic/media"

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

	refId := fileName[:len(fileName)-4]

	videoURL, err := l.svcCtx.VideoModel.GetPresignedDownloadURL(l.ctx, fileName, 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned URL: %w", err)
	}
	audioURL, err := l.svcCtx.AudioModel.GetPresignedUploadURL(
		l.ctx, refId+".mp3", 3600)
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
				"videoURL":"%s", "audioURL":"%s", "midiURL":"%s", "sheetURL":"%s", 
				"waterfallURL":"%s", "reportURL":"%s", "jsonURL":"%s"}`,
		"TRUE", jobId, "", 0, refId, refId, videoURL,
		audioURL, midiURL, sheetURL, waterfallURL, "", jsonURL)

	err = l.svcCtx.AudioProcessingQueue.SendMessage(message)
	if err != nil {
		return nil, fmt.Errorf("failed to send message to RabbitMQ: %w", err)
	}

	return &types.UploadRefVideoSuccessResp{
		Code: 0,
		Msg:  "😥",
	}, nil
}
