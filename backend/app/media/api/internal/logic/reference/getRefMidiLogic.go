package reference

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetRefMidiLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get reference midi
func NewGetRefMidiLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetRefMidiLogic {
	return &GetRefMidiLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetRefMidiLogic) GetRefMidi(
	req *types.GetRefMidiReq) (resp *types.GetRefMidiResp, err error) {

	reference, err := l.svcCtx.ReferenceModel.FindOne(l.ctx, req.RefId)
	if err != nil {
		return nil, fmt.Errorf("reference not found: %v", err)
	}

	presignedURL, err := l.svcCtx.MidiModel.GetPresignedDownloadURL(l.ctx, reference.Midi, 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned download URL: %w", err)
	}

	return &types.GetRefMidiResp{
		Code:         0,
		PresignedURL: presignedURL,
		Msg:          "🀄",
	}, nil
}
