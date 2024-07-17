package svc

import (
	"context"
	AwsConf "github.com/aws/aws-sdk-go-v2/config"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/config"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/middleware"
	"github.com/guregu/dynamo/v2"
	"github.com/zeromicro/go-zero/rest"
)

type ServiceContext struct {
	Config             config.Config
	UserAuthMiddleware rest.Middleware
	CookieMiddleware   rest.Middleware
	DynamoDBClient     *dynamo.DB
}

func NewServiceContext(c config.Config) *ServiceContext {
	return &ServiceContext{
		Config:             c,
		UserAuthMiddleware: middleware.NewUserAuthMiddleware(c.CognitoConf).Handle,
		CookieMiddleware:   middleware.NewCookieMiddleware().Handle,
		DynamoDBClient:     NewDynamoDBClient(c),
	}
}

func NewDynamoDBClient(c config.Config) *dynamo.DB {
	awsConfig, err := AwsConf.LoadDefaultConfig(context.TODO(), AwsConf.WithRegion(c.DynamoDBConf.Region))
	if err != nil {
		panic("Failed to load AWS config: " + err.Error())
	}

	dynamoDBClient := dynamo.New(awsConfig)
	return dynamoDBClient
}
