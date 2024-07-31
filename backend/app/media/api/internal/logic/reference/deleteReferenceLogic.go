package reference

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type DeleteReferenceLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// delete a reference
func NewDeleteReferenceLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeleteReferenceLogic {
	return &DeleteReferenceLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeleteReferenceLogic) DeleteReference(
	req *types.DeleteReferenceReq) (resp *types.DeleteReferenceResp, err error) {

	err = l.svcCtx.ReferenceModel.Delete(l.ctx, req.RefId)
	if err != nil {
		return nil, fmt.Errorf("failed to delete: %v", err)
	}

	return &types.DeleteReferenceResp{
		Code: 0,
		Msg:  "Deleted successfully",
	}, nil
}
