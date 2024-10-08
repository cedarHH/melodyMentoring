package media

import (
	"context"
	"fmt"
	"strconv"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetAudioUrlLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get audio presigned url
func NewGetAudioUrlLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetAudioUrlLogic {
	return &GetAudioUrlLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetAudioUrlLogic) GetAudioUrl(
	req *types.GetAudioUrlReq) (resp *types.GetAudioUrlResp, err error) {

	subUserId := fmt.Sprintf(
		"%s_%s",
		l.ctx.Value("uuid").(string),
		req.ProfileName)
	recordId := req.RecordId

	fileType := ".mp3"
	fileName := subUserId + "_" + strconv.Itoa(int(recordId)) + fileType

	presignedURL, err := l.svcCtx.AudioModel.GetPresignedUploadURL(l.ctx, fileName, 3600)
	if err != nil {
		return &types.GetAudioUrlResp{
			Code: 500,
			Data: types.FileDetails{},
			Msg:  "Failed to get presigned URL",
		}, err
	}

	fileDetails := types.FileDetails{
		PresignedURL: presignedURL,
		FileName:     fileName,
	}

	return &types.GetAudioUrlResp{
		Code: 0,
		Data: fileDetails,
		Msg:  "",
	}, nil
}
