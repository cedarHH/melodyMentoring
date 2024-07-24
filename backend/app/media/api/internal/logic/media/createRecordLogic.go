package media

import (
	"context"
	"fmt"
	"github.com/cedarHH/mygo/app/media/model/dynamodb"
	"time"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateRecordLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// NewCreateRecordLogic create new performance record
func NewCreateRecordLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateRecordLogic {
	return &CreateRecordLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateRecordLogic) CreateRecord(
	req *types.CreateRecordReq) (resp *types.CreateRecordResp, err error) {

	subUserId := fmt.Sprintf(
		"%s_%s",
		l.ctx.Value("uuid").(string),
		req.ProfileName)
	recordId := time.Now().Unix()

	record := &dynamodb.Record{
		SubUserId:   subUserId,
		Timestamp:   recordId,
		Composition: "",
		Reference:   req.Reference,
		Image:       "",
		Video:       "",
		Audio:       "",
		Midi:        "",
		Sheet:       "",
		Diff:        "",
		Waterfall:   "",
		Report:      "",
		IsRef:       false,
	}

	err = l.svcCtx.RecordModel.Insert(l.ctx, record)
	if err != nil {
		return nil, err
	}
	return &types.CreateRecordResp{
		Code:     0,
		RecordId: recordId,
		Msg:      "Ciallo～(∠・ω< )⌒☆",
	}, nil
}
