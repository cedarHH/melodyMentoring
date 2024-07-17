package user

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetSubUsersLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get the list of sub-users
func NewGetSubUsersLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetSubUsersLogic {
	return &GetSubUsersLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetSubUsersLogic) GetSubUsers() (resp *types.GetSubUsersResp, err error) {
	uuid := l.ctx.Value("uuid").(string)

	users, err := l.svcCtx.UserModel.QueryByPartitionKey(l.ctx, uuid)
	if err != nil {
		return nil, fmt.Errorf("failed query: %v", err)
	}

	var userList []types.SubUser
	for _, user := range users {
		userList = append(userList, types.SubUser{
			ProfileName: user.ProfileName,
			Avatar:      user.Avatar,
		})
	}

	return &types.GetSubUsersResp{
		Code: 0,
		Data: userList,
		Msg:  "😋🤮",
	}, nil
}
