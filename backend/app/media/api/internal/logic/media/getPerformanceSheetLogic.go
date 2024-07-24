package media

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetPerformanceSheetLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get performance sheet
func NewGetPerformanceSheetLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetPerformanceSheetLogic {
	return &GetPerformanceSheetLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetPerformanceSheetLogic) GetPerformanceSheet(
	req *types.GetPerformanceSheetReq) (resp *types.GetPerformanceSheetResp, err error) {

	subUserId := fmt.Sprintf(
		"%s_%s",
		l.ctx.Value("uuid").(string),
		req.ProfileName)
	recordId := req.RecordId

	record, err := l.svcCtx.RecordModel.FindOne(l.ctx, subUserId, recordId)
	if err != nil {
		return nil, fmt.Errorf("record not found: %v", err)
	}

	presignedURL, err := l.svcCtx.SheetModel.GetPresignedDownloadURL(l.ctx, record.Sheet, 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned download URL: %w", err)
	}

	return &types.GetPerformanceSheetResp{
		Code:         0,
		PresignedURL: presignedURL,
		Msg:          "🍾",
	}, nil
}
