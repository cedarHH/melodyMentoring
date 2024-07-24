package media

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetRecordLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get performance record
func NewGetRecordLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetRecordLogic {
	return &GetRecordLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetRecordLogic) GetRecord(req *types.GetRecordReq) (
	resp *types.GetRecordResp, err error) {

	subUserId := fmt.Sprintf(
		"%s_%s",
		l.ctx.Value("uuid").(string),
		req.ProfileName)

	records, err := l.svcCtx.RecordModel.QueryByPartitionKey(
		l.ctx,
		subUserId,
		req.Start,
		req.End,
		req.Offset,
		req.Limit)
	if err != nil {
		return nil, fmt.Errorf("record not found: %v", err)
	}

	var recordsList []types.RecordInfo
	for _, record := range records {
		recordsList = append(recordsList, types.RecordInfo{
			RecordId:    record.Timestamp,
			Composition: record.Composition,
			Reference:   record.Reference,
		})
	}

	return &types.GetRecordResp{
		Code: 0,
		Data: recordsList,
		Msg:  "Ciallo～(∠・ω< )⌒☆",
	}, nil
}
