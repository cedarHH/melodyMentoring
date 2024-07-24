package media

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetPerformanceReportLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get performance report
func NewGetPerformanceReportLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetPerformanceReportLogic {
	return &GetPerformanceReportLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetPerformanceReportLogic) GetPerformanceReport(
	req *types.GetPerformanceReportReq) (resp *types.GetPerformanceReportResp, err error) {

	subUserId := fmt.Sprintf(
		"%s_%s",
		l.ctx.Value("uuid").(string),
		req.ProfileName)
	recordId := req.RecordId

	record, err := l.svcCtx.RecordModel.FindOne(l.ctx, subUserId, recordId)
	if err != nil {
		return nil, fmt.Errorf("record not found: %v", err)
	}

	presignedURL, err := l.svcCtx.ReportModel.GetPresignedDownloadURL(l.ctx, record.Report, 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned download URL: %w", err)
	}

	return &types.GetPerformanceReportResp{
		Code:         0,
		PresignedURL: presignedURL,
		Msg:          "🍥",
	}, nil
}
