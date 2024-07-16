package model

import "github.com/aws/aws-sdk-go/service/dynamodb"

var _ UserModel = (*customUserModel)(nil)

type (
	// UserModel is an interface to be customized, add more methods here,
	// and implement the added methods in customUserModel.
	UserModel interface {
		userModel
	}

	customUserModel struct {
		*defaultUserModel
	}
)

func NewUserModel(dynamoDBClient *dynamodb.DynamoDB, tableName string) UserModel {
	return &customUserModel{
		&defaultUserModel{
			client: dynamoDBClient,
			table:  tableName,
		},
	}
}
