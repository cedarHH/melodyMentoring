package user

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateAvatarSuccessLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// update avatar
func NewUpdateAvatarSuccessLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateAvatarSuccessLogic {
	return &UpdateAvatarSuccessLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateAvatarSuccessLogic) UpdateAvatarSuccess(
	req *types.UpdateAvatarSuccessReq) (resp *types.UpdateAvatarSuccessResp, err error) {

	uuid := l.ctx.Value("uuid").(string)
	profileName := req.ProfileName
	fileName := req.FileName

	err = l.svcCtx.AvatarModel.CheckFileExists(l.ctx, fileName)
	if err != nil {
		return nil, fmt.Errorf("file %s does not exist: %w", fileName, err)
	}

	updates := map[string]interface{}{
		"Avatar": fileName,
	}
	err = l.svcCtx.UserModel.UpdateAttributes(l.ctx, uuid, profileName, updates)
	if err != nil {
		return nil, fmt.Errorf("failed to update user attributes: %w", err)
	}
	return &types.UpdateAvatarSuccessResp{
		Code: 0,
		Msg:  "😥",
	}, nil
}
