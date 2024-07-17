package user

import (
	"context"
	"fmt"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"
	"github.com/zeromicro/go-zero/core/logx"
)

type CreateSubUserLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// create sub-user
func NewCreateSubUserLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateSubUserLogic {
	return &CreateSubUserLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

type testData struct {
	Uuid        string // Hash key, a.k.a. partition key
	ProfileName string // Range key, a.k.a. sort key
	Pin         int
}

func (l *CreateSubUserLogic) CreateSubUser(req *types.CreateSubUserReq) (resp *types.CreateSubUserResp, err error) {
	// todo: add your logic here and delete this line

	errs := l.svcCtx.DynamoDBClient.Table(l.svcCtx.Config.DynamoDBConf.TableName).Put(&testData{
		Uuid:        "qwe",
		ProfileName: "qweww",
		Pin:         1234,
	}).Run(l.ctx)
	if errs != nil {
		fmt.Printf("%s", errs)
	}
	return &types.CreateSubUserResp{
		Code: 0,
		Msg:  "Ciallo～(∠・ω< )⌒☆",
	}, nil
}
