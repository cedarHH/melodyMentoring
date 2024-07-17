package user

import (
	"context"
	"fmt"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetSubUserByNameLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get sub-user by name
func NewGetSubUserByNameLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetSubUserByNameLogic {
	return &GetSubUserByNameLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetSubUserByNameLogic) GetSubUserByName(req *types.GetSubUserByNameReq) (resp *types.GetSubUserByNameResp, err error) {
	uuid := l.ctx.Value("uuid").(string)
	profileName := req.ProfileName

	user, err := l.svcCtx.UserModel.FindOne(l.ctx, uuid, profileName)
	if err != nil {
		return nil, fmt.Errorf("user not found: %v", err)
	}

	return &types.GetSubUserByNameResp{
		Code: 0,
		Data: types.User{
			Uuid:            user.Uuid,
			ProfileName:     user.ProfileName,
			Pin:             user.Pin,
			Avatar:          user.Avatar,
			Gender:          user.Gender,
			Dob:             user.Dob,
			Level:           user.Level,
			Instrument:      user.Instrument,
			TotalTime:       user.TotalTime,
			NotesPlayed:     user.NotesPlayed,
			LastPlayDate:    user.LastPlayDate,
			ConsecutiveDays: user.ConsecutiveDays,
			Badges:          user.Badges,
		},
		Msg: "Ciallo～(∠・ω< )⌒☆",
	}, nil
}
