package reference

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UploadRefImgSuccessLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// upload image success
func NewUploadRefImgSuccessLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UploadRefImgSuccessLogic {
	return &UploadRefImgSuccessLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UploadRefImgSuccessLogic) UploadRefImgSuccess(
	req *types.UploadRefImgSuccessReq) (resp *types.UploadRefImgSuccessResp, err error) {

	fileName := req.FileName

	err = l.svcCtx.ThumbnailModel.CheckFileExists(l.ctx, fileName)
	if err != nil {
		return nil, fmt.Errorf("file %s does not exist: %w", fileName, err)
	}

	updates := map[string]interface{}{
		"Image": fileName,
	}
	err = l.svcCtx.ReferenceModel.UpdateAttributes(l.ctx, req.RefId, updates)
	if err != nil {
		return nil, fmt.Errorf("failed to update img: %w", err)
	}
	return &types.UploadRefImgSuccessResp{
		Code: 0,
		Msg:  "😥",
	}, nil
}
