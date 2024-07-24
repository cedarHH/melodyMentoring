package s3

import (
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/cedarHH/mygo/common/commonModel"
)

type VideoModel struct {
	*commonModel.S3Model
}

func NewVideoModel(client *s3.Client, presignClient *s3.PresignClient, bucket string) commonModel.IS3Model {
	return &VideoModel{
		&commonModel.S3Model{
			Client:        client,
			PresignClient: presignClient,
			Bucket:        bucket,
		},
	}
}
