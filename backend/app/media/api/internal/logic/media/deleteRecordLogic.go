package media

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type DeleteRecordLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// delete performance record
func NewDeleteRecordLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeleteRecordLogic {
	return &DeleteRecordLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeleteRecordLogic) DeleteRecord(
	req *types.DeleteRecordReq) (resp *types.DeleteRecordResp, err error) {

	subUserId := fmt.Sprintf(
		"%s_%s",
		l.ctx.Value("uuid").(string),
		req.ProfileName)
	recordId := req.RecordId

	err = l.svcCtx.RecordModel.Delete(l.ctx, subUserId, recordId)
	if err != nil {
		return nil, fmt.Errorf("failed to delete: %v", err)
	}

	return &types.DeleteRecordResp{
		Code: 0,
		Msg:  "Deleted successfully",
	}, nil
}
