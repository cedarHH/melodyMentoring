package dynamodb

import (
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/cedarHH/mygo/common/commonModel"
)

// User represents the user entity stored in DynamoDB
type User struct {
	Uuid            string   `json:"Uuid" dynamodbav:"Uuid"`
	ProfileName     string   `json:"ProfileName" dynamodbav:"ProfileName"`
	Pin             string   `json:"Pin" dynamodbav:"Pin"`
	Avatar          string   `json:"Avatar" dynamodbav:"Avatar"`
	Gender          string   `json:"Gender" dynamodbav:"Gender"`
	Dob             string   `json:"Dob" dynamodbav:"Dob"`
	Level           string   `json:"Level" dynamodbav:"Level"`
	Instrument      string   `json:"Instrument" dynamodbav:"Instrument"`
	TotalTime       int64    `json:"TotalTime" dynamodbav:"TotalTime"`
	NotesPlayed     int64    `json:"NotesPlayed" dynamodbav:"NotesPlayed"`
	LastPlayDate    string   `json:"LastPlayDate" dynamodbav:"LastPlayDate"`
	ConsecutiveDays int64    `json:"ConsecutiveDays" dynamodbav:"ConsecutiveDays"`
	Badges          []string `json:"Badges" dynamodbav:"Badges"`
}

type UserModel interface {
	Insert(ctx context.Context, user *User) error
	FindOne(ctx context.Context, uuid, profileName string) (*User, error)
	Update(ctx context.Context, user *User) error
	Delete(ctx context.Context, uuid, profileName string) error
	UpdateAttributes(ctx context.Context, uuid, profileName string, updates map[string]interface{}) error
	QueryByPartitionKey(ctx context.Context, uuid string) ([]*User, error)
}

type userModel struct {
	baseModel *commonModel.BaseModel
}

func NewUserModel(client *dynamodb.Client, table string) UserModel {
	return &userModel{
		&commonModel.BaseModel{
			Client: client,
			Table:  table,
		},
	}
}

func (m *userModel) Insert(ctx context.Context, user *User) error {
	return m.baseModel.Insert(ctx, user)
}

func (m *userModel) FindOne(ctx context.Context, uuid, profileName string) (*User, error) {
	key := map[string]interface{}{
		"Uuid":        uuid,
		"ProfileName": profileName,
	}

	item, err := m.baseModel.FindOne(ctx, key)
	if err != nil {
		return nil, err
	}
	if item == nil {
		return nil, nil
	}

	var user User
	err = attributevalue.UnmarshalMap(item, &user)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal user: %w", err)
	}
	return &user, nil
}

func (m *userModel) Update(ctx context.Context, user *User) error {
	return m.baseModel.Update(ctx, user)
}

func (m *userModel) Delete(ctx context.Context, uuid, profileName string) error {
	key := map[string]interface{}{
		"Uuid":        uuid,
		"ProfileName": profileName,
	}
	return m.baseModel.Delete(ctx, key)
}

func (m *userModel) UpdateAttributes(ctx context.Context, uuid, profileName string, updates map[string]interface{}) error {
	key := map[string]interface{}{
		"Uuid":        uuid,
		"ProfileName": profileName,
	}
	return m.baseModel.UpdateAttributes(ctx, key, updates)
}

func (m *userModel) QueryByPartitionKey(ctx context.Context, uuid string) ([]*User, error) {
	items, err := m.baseModel.QueryByPartitionKey(
		ctx, "Uuid", uuid, "ProfileName", nil, nil, -1, -1)
	if err != nil {
		return nil, err
	}

	var users []*User
	for _, item := range items {
		var user User
		err = attributevalue.UnmarshalMap(item, &user)
		if err != nil {
			return nil, fmt.Errorf("failed to unmarshal user: %w", err)
		}
		users = append(users, &user)
	}
	return users, nil
}
