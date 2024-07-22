package user

import (
	"context"
	"fmt"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetAvatarLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get avatar url
func NewGetAvatarLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetAvatarLogic {
	return &GetAvatarLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetAvatarLogic) GetAvatar(req *types.GetAvatarReq) (resp *types.GetAvatarResp, err error) {
	uuid := l.ctx.Value("uuid").(string)
	profileName := req.ProfileName

	fileType := ".png"
	fileName := uuid + "_" + profileName + fileType

	presignedURL, err := l.svcCtx.AvatarModel.GetPresignedDownloadURL(l.ctx, fileName, 3600)
	if err != nil {
		return nil, fmt.Errorf("failed to get presigned download URL: %w", err)
	}
	return &types.GetAvatarResp{
		Code:         0,
		PresignedURL: presignedURL,
		Msg:          "🦪🦪🦪",
	}, nil
}
