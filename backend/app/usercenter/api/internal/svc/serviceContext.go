package svc

import (
	"context"
	AwsS3 "github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/config"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/middleware"
	"github.com/cedarHH/mygo/app/usercenter/model/dynamodb"
	"github.com/cedarHH/mygo/app/usercenter/model/s3"
	"github.com/cedarHH/mygo/common/commonModel"
	"github.com/zeromicro/go-zero/rest"

	AwsConf "github.com/aws/aws-sdk-go-v2/config"
	AwsDynamodb "github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

type ServiceContext struct {
	Config             config.Config
	UserAuthMiddleware rest.Middleware
	CookieMiddleware   rest.Middleware
	UserModel          dynamodb.UserModel
	AvatarModel        commonModel.IS3Model
}

func NewServiceContext(c config.Config) *ServiceContext {
	userTableConfig, err := AwsConf.LoadDefaultConfig(context.TODO(), AwsConf.WithRegion(c.DynamoDBConf.UserTable.Region))
	if err != nil {
		panic("Failed to load UserTable config: " + err.Error())
	}
	s3Config, err := AwsConf.LoadDefaultConfig(context.TODO(), AwsConf.WithRegion(c.S3Conf.AvatarBucket.Region))
	if err != nil {
		panic("Failed to load S3 config: " + err.Error())
	}

	userDynamoDBClient := AwsDynamodb.NewFromConfig(userTableConfig)
	userModel := dynamodb.NewUserModel(userDynamoDBClient, c.DynamoDBConf.UserTable.TableName)

	s3Client := AwsS3.NewFromConfig(s3Config)
	presignClient := AwsS3.NewPresignClient(s3Client)
	avatarModel := s3.NewAvatarModel(s3Client, presignClient, c.S3Conf.AvatarBucket.Bucket)

	return &ServiceContext{
		Config:             c,
		UserAuthMiddleware: middleware.NewUserAuthMiddleware(c.CognitoConf).Handle,
		CookieMiddleware:   middleware.NewCookieMiddleware().Handle,
		UserModel:          userModel,
		AvatarModel:        avatarModel,
	}
}
