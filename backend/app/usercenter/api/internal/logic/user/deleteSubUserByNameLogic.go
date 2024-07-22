package user

import (
	"context"
	"fmt"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type DeleteSubUserByNameLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// delete sub-user by name
func NewDeleteSubUserByNameLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeleteSubUserByNameLogic {
	return &DeleteSubUserByNameLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeleteSubUserByNameLogic) DeleteSubUserByName(
	req *types.DeleteSubUserByNameReq) (resp *types.DeleteSubUserByNameResp, err error) {

	uuid := l.ctx.Value("uuid").(string)
	profileName := req.ProfileName

	user, err := l.svcCtx.UserModel.FindOne(l.ctx, uuid, profileName)
	if err != nil {
		return nil, fmt.Errorf("user not found: %v", err)
	}

	if user.Pin != req.Pin {
		return nil, fmt.Errorf("incorrect PIN")
	}

	err = l.svcCtx.UserModel.Delete(l.ctx, uuid, profileName)
	if err != nil {
		return nil, fmt.Errorf("failed to delete: %v", err)
	}

	return &types.DeleteSubUserByNameResp{
		Code: 0,
		Msg:  "Deleted successfully",
	}, nil
}
