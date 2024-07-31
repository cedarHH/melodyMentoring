package config

import "github.com/zeromicro/go-zero/rest"

type Config struct {
	rest.RestConf
	CognitoConf  CognitoConf  `json:"CognitoConf"`
	DynamoDBConf DynamoDBConf `json:"DynamoDBConf"`
	S3Conf       S3Conf       `json:"S3Conf"`
	RabbitMQConf RabbitMQConf `json:"RabbitMQConf"`
}
