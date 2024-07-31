package reference

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetRefSheetLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get reference sheet
func NewGetRefSheetLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetRefSheetLogic {
	return &GetRefSheetLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetRefSheetLogic) GetRefSheet(
	req *types.GetRefSheetReq) (resp *types.GetRefSheetResp, err error) {

	reference, err := l.svcCtx.ReferenceModel.FindOne(l.ctx, req.RefId)
	if err != nil {
		return nil, fmt.Errorf("reference not found: %v", err)
	}

	presignedURL, err := l.svcCtx.SheetModel.GetPresignedDownloadURL(l.ctx, reference.Sheet, 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned download URL: %w", err)
	}

	return &types.GetRefSheetResp{
		Code:         0,
		PresignedURL: presignedURL,
		Msg:          "🀄",
	}, nil
}
