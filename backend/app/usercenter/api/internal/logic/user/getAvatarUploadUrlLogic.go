package user

import (
	"context"

	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetAvatarUploadUrlLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get avatar uploda url
func NewGetAvatarUploadUrlLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetAvatarUploadUrlLogic {
	return &GetAvatarUploadUrlLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetAvatarUploadUrlLogic) GetAvatarUploadUrl(
	req *types.GetAvatarUploadUrlReq) (resp *types.GetAvatarUploadUrlResp, err error) {

	uuid := l.ctx.Value("uuid").(string)
	profileName := req.ProfileName

	fileType := ".png"
	fileName := uuid + "_" + profileName + fileType

	presignedURL, err := l.svcCtx.AvatarModel.GetPresignedUploadURL(l.ctx, fileName, 3600)
	if err != nil {
		return &types.GetAvatarUploadUrlResp{
			Code: 500,
			Msg:  "Failed to get presigned URL",
		}, err
	}

	respData := types.AvatarFile{
		PresignedURL: presignedURL,
		FileName:     fileName,
	}

	return &types.GetAvatarUploadUrlResp{
		Code: 0,
		Data: respData,
		Msg:  "😪😶‍🌫️",
	}, nil
}
