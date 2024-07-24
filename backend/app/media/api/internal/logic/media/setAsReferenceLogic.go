package media

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type SetAsReferenceLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// set a performance record as reference
func NewSetAsReferenceLogic(ctx context.Context, svcCtx *svc.ServiceContext) *SetAsReferenceLogic {
	return &SetAsReferenceLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *SetAsReferenceLogic) SetAsReference(
	req *types.SetAsReferenceReq) (resp *types.SetAsReferenceResp, err error) {

	subUserId := fmt.Sprintf(
		"%s_%s",
		l.ctx.Value("uuid").(string),
		req.ProfileName)
	recordId := req.RecordId

	updates := map[string]interface{}{
		"IsRef": req.IsRef,
	}
	err = l.svcCtx.RecordModel.UpdateAttributes(l.ctx, subUserId, recordId, updates)
	if err != nil {
		return nil, fmt.Errorf("failed to update record: %w", err)
	}
	return &types.SetAsReferenceResp{
		Code: 0,
		Msg:  "😥",
	}, nil
}
