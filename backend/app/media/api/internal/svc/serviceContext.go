package svc

import (
	"context"
	AwsConf "github.com/aws/aws-sdk-go-v2/config"
	AwsDynamodb "github.com/aws/aws-sdk-go-v2/service/dynamodb"
	AwsS3 "github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/cedarHH/mygo/app/media/api/internal/config"
	"github.com/cedarHH/mygo/app/media/api/internal/consumer"
	"github.com/cedarHH/mygo/app/media/api/internal/middleware"
	"github.com/cedarHH/mygo/app/media/model/dynamodb"
	"github.com/cedarHH/mygo/app/media/model/s3"
	"github.com/cedarHH/mygo/common/commonModel"
	"github.com/cedarHH/mygo/common/messageQueue"
	"github.com/zeromicro/go-zero/rest"
)

type ServiceContext struct {
	Config                config.Config
	UserAuthMiddleware    rest.Middleware
	AudioProcessingQueue  *messageQueue.RabbitMQClient
	AudioProcessingResult *messageQueue.RabbitMQClient
	ResultConsumer        *consumer.AnalysisResultConsumer
	RecordModel           dynamodb.RecordModel
	ReferenceModel        dynamodb.ReferenceModel
	ThumbnailModel        commonModel.IS3Model
	AudioModel            commonModel.IS3Model
	VideoModel            commonModel.IS3Model
	MidiModel             commonModel.IS3Model
	ReportModel           commonModel.IS3Model
	SheetModel            commonModel.IS3Model
	WaterfallModel        commonModel.IS3Model
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

	DynamoDBClient := AwsDynamodb.NewFromConfig(recordTableConfig)
	recordModel := dynamodb.NewRecordModel(DynamoDBClient, c.DynamoDBConf.RecordTable.TableName)
	referenceModel := dynamodb.NewReferenceModel(DynamoDBClient, c.DynamoDBConf.ReferenceTable.TableName)

	s3Client := AwsS3.NewFromConfig(s3Config)
	presignClient := AwsS3.NewPresignClient(s3Client)
	thumbnailModel := s3.NewThumbnailModel(s3Client, presignClient, c.S3Conf.ThumbnailBucket.Bucket)
	audioModel := s3.NewAudioModel(s3Client, presignClient, c.S3Conf.AudioBucket.Bucket)
	videoModel := s3.NewVideoModel(s3Client, presignClient, c.S3Conf.VideoBucket.Bucket)
	midiModel := s3.NewVideoModel(s3Client, presignClient, c.S3Conf.MidiBucket.Bucket)
	reportModel := s3.NewVideoModel(s3Client, presignClient, c.S3Conf.ReportBucket.Bucket)
	sheetModel := s3.NewVideoModel(s3Client, presignClient, c.S3Conf.SheetBucket.Bucket)
	waterfallModel := s3.NewVideoModel(s3Client, presignClient, c.S3Conf.WaterfallBucket.Bucket)

	audioProcessingQueueClient := messageQueue.GetRabbitMQClient(
		c.RabbitMQConf.User,
		c.RabbitMQConf.Password,
		"localhost",
		"audio_processing_queue",
		c.RabbitMQConf.Port,
	)

	audioProcessingResultsClient := messageQueue.GetRabbitMQClient(
		c.RabbitMQConf.User,
		c.RabbitMQConf.Password,
		"localhost",
		"audio_processing_results",
		c.RabbitMQConf.Port,
	)

	analysisResultConsumer := consumer.NewAnalysisResultConsumer(
		context.Background(),
		audioProcessingResultsClient,
		recordModel,
	)
	analysisResultConsumer.StartConsuming()

	return &ServiceContext{
		Config:                c,
		UserAuthMiddleware:    middleware.NewUserAuthMiddleware(c.CognitoConf).Handle,
		AudioProcessingQueue:  audioProcessingQueueClient,
		AudioProcessingResult: audioProcessingResultsClient,
		ResultConsumer:        analysisResultConsumer,
		RecordModel:           recordModel,
		ReferenceModel:        referenceModel,
		ThumbnailModel:        thumbnailModel,
		AudioModel:            audioModel,
		VideoModel:            videoModel,
		MidiModel:             midiModel,
		ReportModel:           reportModel,
		SheetModel:            sheetModel,
		WaterfallModel:        waterfallModel,
	}
}
