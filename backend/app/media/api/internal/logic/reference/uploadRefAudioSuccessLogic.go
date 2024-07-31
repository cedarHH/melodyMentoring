package reference

import (
	"context"
	"fmt"

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
	return &types.UploadRefAudioSuccessResp{
		Code: 0,
		Msg:  "😥",
	}, nil
}
