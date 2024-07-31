package reference

import (
	"context"
	"fmt"
	"github.com/cedarHH/mygo/app/media/model/dynamodb"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type QueryReferenceLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// query reference
func NewQueryReferenceLogic(ctx context.Context, svcCtx *svc.ServiceContext) *QueryReferenceLogic {
	return &QueryReferenceLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *QueryReferenceLogic) QueryReference(
	req *types.QueryReferenceReq) (resp *types.QueryReferenceResp, err error) {

	references, err := l.svcCtx.ReferenceModel.FindByStyle(l.ctx, req.Style)
	if err != nil {
		return nil, fmt.Errorf("reference not found: %v", err)
	}

	return &types.QueryReferenceResp{
		Code: 0,
		Data: mapReferencesToQueryResults(references),
		Msg:  "😋",
	}, nil
}

func mapReferencesToQueryResults(references []dynamodb.Reference) []types.QueryResult {
	var results []types.QueryResult
	for _, ref := range references {
		result := types.QueryResult{
			RefId:      ref.RefId,
			Title:      ref.Title,
			Style:      ref.Style,
			Composer:   ref.Composer,
			Instrument: ref.Instrument,
		}
		results = append(results, result)
	}
	return results
}
