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
	"github.com/cedarHH/mygo/common/messageQueue"
	"github.com/zeromicro/go-zero/rest"
)

type ServiceContext struct {
	Config             config.Config
	UserAuthMiddleware rest.Middleware
	RabbitMQ           *messageQueue.RabbitMQClient
	RecordModel        dynamodb.RecordModel
	ThumbnailModel     commonModel.IS3Model
	AudioModel         commonModel.IS3Model
	VideoModel         commonModel.IS3Model
	MidiModel          commonModel.IS3Model
	ReportModel        commonModel.IS3Model
	SheetModel         commonModel.IS3Model
	WaterfallModel     commonModel.IS3Model
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

	rmqClient := messageQueue.GetRabbitMQClient(
		c.RabbitMQConf.User,
		c.RabbitMQConf.Password,
		"localhost",
		"audio_processing_queue",
		c.RabbitMQConf.Port)

	recordDynamoDBClient := AwsDynamodb.NewFromConfig(recordTableConfig)
	recordModel := dynamodb.NewRecordModel(recordDynamoDBClient, c.DynamoDBConf.RecordTable.TableName)

	s3Client := AwsS3.NewFromConfig(s3Config)
	presignClient := AwsS3.NewPresignClient(s3Client)
	thumbnailModel := s3.NewThumbnailModel(s3Client, presignClient, c.S3Conf.ThumbnailBucket.Bucket)
	audioModel := s3.NewAudioModel(s3Client, presignClient, c.S3Conf.AudioBucket.Bucket)
	videoModel := s3.NewVideoModel(s3Client, presignClient, c.S3Conf.VideoBucket.Bucket)
	midiModel := s3.NewVideoModel(s3Client, presignClient, c.S3Conf.MidiBucket.Bucket)
	reportModel := s3.NewVideoModel(s3Client, presignClient, c.S3Conf.ReportBucket.Bucket)
	sheetModel := s3.NewVideoModel(s3Client, presignClient, c.S3Conf.SheetBucket.Bucket)
	waterfallModel := s3.NewVideoModel(s3Client, presignClient, c.S3Conf.WaterfallBucket.Bucket)

	return &ServiceContext{
		Config:             c,
		UserAuthMiddleware: middleware.NewUserAuthMiddleware(c.CognitoConf).Handle,
		RabbitMQ:           rmqClient,
		RecordModel:        recordModel,
		ThumbnailModel:     thumbnailModel,
		AudioModel:         audioModel,
		VideoModel:         videoModel,
		MidiModel:          midiModel,
		ReportModel:        reportModel,
		SheetModel:         sheetModel,
		WaterfallModel:     waterfallModel,
	}
}
