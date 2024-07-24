package media

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetPerformanceVideoLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get performance video
func NewGetPerformanceVideoLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetPerformanceVideoLogic {
	return &GetPerformanceVideoLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetPerformanceVideoLogic) GetPerformanceVideo(
	req *types.GetPerformanceVideoReq) (resp *types.GetPerformanceVideoResp, err error) {

	subUserId := fmt.Sprintf(
		"%s_%s",
		l.ctx.Value("uuid").(string),
		req.ProfileName)
	recordId := req.RecordId

	record, err := l.svcCtx.RecordModel.FindOne(l.ctx, subUserId, recordId)
	if err != nil {
		return nil, fmt.Errorf("record not found: %v", err)
	}

	presignedURL, err := l.svcCtx.VideoModel.GetPresignedDownloadURL(l.ctx, record.Video, 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned download URL: %w", err)
	}

	return &types.GetPerformanceVideoResp{
		Code:         0,
		PresignedURL: presignedURL,
		Msg:          "😋",
	}, nil
}
