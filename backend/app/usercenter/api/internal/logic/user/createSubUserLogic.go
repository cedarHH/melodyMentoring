package user

import (
	"context"
	"fmt"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"
	"github.com/cedarHH/mygo/app/usercenter/model/dynamodb"
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

func (l *CreateSubUserLogic) CreateSubUser(
	req *types.CreateSubUserReq) (resp *types.CreateSubUserResp, err error) {

	user := &dynamodb.User{
		Uuid:            l.ctx.Value("uuid").(string),
		ProfileName:     req.ProfileName,
		Pin:             req.Pin,
		Avatar:          "",
		Gender:          "",
		Dob:             "",
		Level:           "",
		Instrument:      "",
		TotalTime:       0,
		NotesPlayed:     0,
		LastPlayDate:    "",
		ConsecutiveDays: 0,
		Badges:          []string{},
	}

	err = l.svcCtx.UserModel.Insert(l.ctx, user)
	fmt.Printf("%s\n", err)
	if err != nil {
		return nil, err
	}
	return &types.CreateSubUserResp{
		Code: 0,
		Msg:  "Ciallo～(∠・ω< )⌒☆",
	}, nil
}
