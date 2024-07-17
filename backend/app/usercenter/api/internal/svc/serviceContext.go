package svc

import (
	"context"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/config"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/middleware"
	"github.com/cedarHH/mygo/app/usercenter/model"
	"github.com/zeromicro/go-zero/rest"

	AwsConf "github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

type ServiceContext struct {
	Config             config.Config
	UserAuthMiddleware rest.Middleware
	CookieMiddleware   rest.Middleware
	DynamoDBClient     *dynamodb.Client
	UserModel          model.UserModel
}

func NewServiceContext(c config.Config) *ServiceContext {
	awsConfig, err := AwsConf.LoadDefaultConfig(context.TODO(), AwsConf.WithRegion(c.DynamoDBConf.Region))
	if err != nil {
		panic("Failed to load AWS config: " + err.Error())
	}

	dynamoDBClient := dynamodb.NewFromConfig(awsConfig)
	userModel := model.NewUserModel(dynamoDBClient, c.DynamoDBConf.TableName)

	return &ServiceContext{
		Config:             c,
		UserAuthMiddleware: middleware.NewUserAuthMiddleware(c.CognitoConf).Handle,
		CookieMiddleware:   middleware.NewCookieMiddleware().Handle,
		DynamoDBClient:     dynamoDBClient,
		UserModel:          userModel,
	}
}
