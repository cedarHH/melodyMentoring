package media

import (
	"context"
	"fmt"
	"strconv"

	"github.com/cedarHH/mygo/app/media/api/internal/svc"
	"github.com/cedarHH/mygo/app/media/api/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetVideoUrlLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get video presigned url
func NewGetVideoUrlLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetVideoUrlLogic {
	return &GetVideoUrlLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetVideoUrlLogic) GetVideoUrl(
	req *types.GetVideoUrlReq) (resp *types.GetVideoUrlResp, err error) {

	subUserId := fmt.Sprintf(
		"%s_%s",
		l.ctx.Value("uuid").(string),
		req.ProfileName)
	recordId := req.RecordId

	fileType := ".mp4"
	fileName := subUserId + "_" + strconv.Itoa(int(recordId)) + fileType

	presignedURL, err := l.svcCtx.VideoModel.GetPresignedUploadURL(l.ctx, fileName, 3600)
	if err != nil {
		return &types.GetVideoUrlResp{
			Code: 500,
			Data: types.FileDetails{},
			Msg:  "Failed to get presigned URL",
		}, err
	}

	fileDetails := types.FileDetails{
		PresignedURL: presignedURL,
		FileName:     fileName,
	}

	return &types.GetVideoUrlResp{
		Code: 0,
		Data: fileDetails,
		Msg:  "",
	}, nil
}
