package media

import (
	"context"
	"fmt"
	"sync"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

var jobIdCounter int64 = 0
var mu sync.Mutex

func generateJobId() int64 {
	mu.Lock()
	defer mu.Unlock()
	jobIdCounter++
	return jobIdCounter
}

type PerformanceAnalysisLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// start analysing the performance
func NewPerformanceAnalysisLogic(ctx context.Context, svcCtx *svc.ServiceContext) *PerformanceAnalysisLogic {
	return &PerformanceAnalysisLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *PerformanceAnalysisLogic) PerformanceAnalysis(
	req *types.PerformanceAnalysisReq) (resp *types.PerformanceAnalysisResp, err error) {

	subUserId := fmt.Sprintf(
		"%s_%s",
		l.ctx.Value("uuid").(string),
		req.ProfileName)
	recordId := req.RecordId

	record, err := l.svcCtx.RecordModel.FindOne(l.ctx, subUserId, recordId)
	if err != nil {
		return nil, fmt.Errorf("failed to get record: %w", err)
	}

	fileName := record.Audio[:len(record.Audio)-4]

	audioURL, err := l.svcCtx.AudioModel.GetPresignedDownloadURL(l.ctx, record.Audio, 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned URL: %w", err)
	}
	midiURL, err := l.svcCtx.MidiModel.GetPresignedUploadURL(
		l.ctx, fileName+".mid", 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned URL: %w", err)
	}
	sheetURL, err := l.svcCtx.SheetModel.GetPresignedUploadURL(
		l.ctx, fileName+".musicxml", 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned URL: %w", err)
	}
	waterfallURL, err := l.svcCtx.WaterfallModel.GetPresignedUploadURL(
		l.ctx, fileName+".png", 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned URL: %w", err)
	}
	reportURL, err := l.svcCtx.ReportModel.GetPresignedUploadURL(
		l.ctx, fileName+".json", 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned URL: %w", err)
	}

	jobId := generateJobId()

	message := fmt.Sprintf(
		`{"jobId":%d, "subUserId":"%s", "recordId":%d, "fileName":"%s", "audioURL":"%s", "midiURL":"%s", "sheetURL":"%s", "waterfallURL":"%s", "reportURL":"%s"}`,
		jobId, subUserId, recordId, fileName, audioURL, midiURL, sheetURL, waterfallURL, reportURL)
	err = l.svcCtx.RabbitMQ.SendMessage(message)
	if err != nil {
		return nil, fmt.Errorf("failed to send message to RabbitMQ: %w", err)
	}

	return &types.PerformanceAnalysisResp{
		Code:       0,
		AnalysisId: jobId,
		Msg:        "😭😭😭",
	}, nil
}
