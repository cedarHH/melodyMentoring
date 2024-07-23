package svc

import (
	"context"
	AwsConf "github.com/aws/aws-sdk-go-v2/config"
	AwsDynamodb "github.com/aws/aws-sdk-go-v2/service/dynamodb"
	AwsS3 "github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/cedarHH/mygo/app/media/api/internal/config"
	"github.com/cedarHH/mygo/app/media/api/internal/middleware"
	"github.com/cedarHH/mygo/app/media/model/dynamodb"
	"github.com/cedarHH/mygo/app/media/model/s3"
	"github.com/cedarHH/mygo/common/commonModel"
	"github.com/zeromicro/go-zero/rest"
)

type ServiceContext struct {
	Config             config.Config
	UserAuthMiddleware rest.Middleware
	RecordModel        dynamodb.RecordModel
	ThumbnailModel     commonModel.IS3Model
}

func NewServiceContext(c config.Config) *ServiceContext {
	recordTableConfig, err := AwsConf.LoadDefaultConfig(context.TODO(), AwsConf.WithRegion(c.DynamoDBConf.RecordTable.Region))
	if err != nil {
		panic("Failed to load UserTable config: " + err.Error())
	}
	s3Config, err := AwsConf.LoadDefaultConfig(context.TODO(), AwsConf.WithRegion(c.S3Conf.ThumbnailBucket.Region))
	if err != nil {
		panic("Failed to load S3 config: " + err.Error())
	}

	recordDynamoDBClient := AwsDynamodb.NewFromConfig(recordTableConfig)
	recordModel := dynamodb.NewRecordModel(recordDynamoDBClient, c.DynamoDBConf.RecordTable.TableName)

	s3Client := AwsS3.NewFromConfig(s3Config)
	presignClient := AwsS3.NewPresignClient(s3Client)
	thumbnailModel := s3.NewThumbnailModel(s3Client, presignClient, c.S3Conf.ThumbnailBucket.Bucket)

	return &ServiceContext{
		Config:             c,
		UserAuthMiddleware: middleware.NewUserAuthMiddleware(c.CognitoConf).Handle,
		RecordModel:        recordModel,
		ThumbnailModel:     thumbnailModel,
	}
}
