package reference

import (
	"context"
	"github.com/cedarHH/mygo/app/media/model/dynamodb"
	"github.com/google/uuid"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type CreateReferenceLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// create a new reference
func NewCreateReferenceLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateReferenceLogic {
	return &CreateReferenceLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateReferenceLogic) CreateReference(
	req *types.CreateReferenceReq) (resp *types.CreateReferenceResp, err error) {

	refId := uuid.New().String()
	reference := &dynamodb.Reference{
		RefId:      refId,
		Title:      req.Title,
		Style:      req.Style,
		Composer:   req.Composer,
		Instrument: req.Instrument,
		Image:      "",
		Video:      "",
		Audio:      "",
		Midi:       "",
		Sheet:      "",
		Waterfall:  "",
		Json:       "",
	}

	err = l.svcCtx.ReferenceModel.Insert(l.ctx, reference)
	if err != nil {
		return nil, err
	}

	return &types.CreateReferenceResp{
		Code:  0,
		RefId: refId,
		Msg:   "Ciallo～(∠・ω< )⌒☆",
	}, nil
}
