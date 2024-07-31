package reference

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetReferenceLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get reference list
func NewGetReferenceLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetReferenceLogic {
	return &GetReferenceLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetReferenceLogic) GetReference(
	req *types.GetReferenceReq) (resp *types.GetReferenceResp, err error) {

	reference, err := l.svcCtx.ReferenceModel.FindOne(l.ctx, req.RefId)
	if err != nil {
		return nil, fmt.Errorf("user not found: %v", err)
	}

	return &types.GetReferenceResp{
		Code: 0,
		Data: types.QueryResult{
			RefId:      reference.RefId,
			Title:      reference.Title,
			Style:      reference.Style,
			Composer:   reference.Composer,
			Instrument: reference.Instrument,
		},
		Msg: "Ciallo～(∠・ω< )⌒☆",
	}, nil
}
