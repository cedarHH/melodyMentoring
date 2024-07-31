package reference

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetRefAudioLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get reference audio
func NewGetRefAudioLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetRefAudioLogic {
	return &GetRefAudioLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetRefAudioLogic) GetRefAudio(
	req *types.GetRefAudioReq) (resp *types.GetRefAudioResp, err error) {

	reference, err := l.svcCtx.ReferenceModel.FindOne(l.ctx, req.RefId)
	if err != nil {
		return nil, fmt.Errorf("reference not found: %v", err)
	}

	presignedURL, err := l.svcCtx.AudioModel.GetPresignedDownloadURL(l.ctx, reference.Audio, 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned download URL: %w", err)
	}

	return &types.GetRefAudioResp{
		Code:         0,
		PresignedURL: presignedURL,
		Msg:          "🀄",
	}, nil
}
