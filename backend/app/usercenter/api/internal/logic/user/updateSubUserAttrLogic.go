package user

import (
	"context"
	"fmt"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateSubUserAttrLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// update sub-user attr
func NewUpdateSubUserAttrLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateSubUserAttrLogic {
	return &UpdateSubUserAttrLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateSubUserAttrLogic) UpdateSubUserAttr(
	req *types.UpdateSubUserAttrReq) (resp *types.UpdateSubUserAttrResp, err error) {

	if req.Gender == "" && req.Dob == "" && req.Level == "" && req.Instrument == "" && req.Badge == "" {
		return nil, fmt.Errorf("no attributes to update")
	}

	uuid := l.ctx.Value("uuid").(string)
	profileName := req.ProfileName

	updates := map[string]interface{}{}
	if req.Gender != "" {
		updates["Gender"] = req.Gender
	}
	if req.Dob != "" {
		updates["Dob"] = req.Dob
	}
	if req.Level != "" {
		updates["Level"] = req.Level
	}
	if req.Instrument != "" {
		updates["Instrument"] = req.Instrument
	}
	if req.Badge != "" {
		updates["Badges"] = req.Badge
	}

	err = l.svcCtx.UserModel.UpdateAttributes(l.ctx, uuid, profileName, updates)
	if err != nil {
		return nil, fmt.Errorf("failed to update user attributes: %v", err)
	}

	return &types.UpdateSubUserAttrResp{
		Code: 0,
		Msg:  "🍥😒😅🍥",
	}, nil
}
