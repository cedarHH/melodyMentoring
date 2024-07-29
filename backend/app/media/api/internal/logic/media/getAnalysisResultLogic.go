package media

import (
	"context"
	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetAnalysisResultLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get the ranking of the tasks to be analysed, if it is 0, the analysis is finished
func NewGetAnalysisResultLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetAnalysisResultLogic {
	return &GetAnalysisResultLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetAnalysisResultLogic) GetAnalysisResult(
	req *types.GetAnalysisResultReq) (resp *types.GetAnalysisResultResp, err error) {

	msg := "Task not completed yet"
	rank := req.AnalysisId - l.svcCtx.ResultConsumer.GetLatestCompletedJobId()
	if rank <= 0 {
		rank = 0
		msg = "Success"
	}

	return &types.GetAnalysisResultResp{
		Code: 1,
		Data: types.ResultData{AnalysisRank: rank},
		Msg:  msg,
	}, nil
}
