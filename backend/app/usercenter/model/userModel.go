package model

import (
	"context"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

var _ UserModel = (*customUserModel)(nil)

type (
	UserModel interface {
		Insert(ctx context.Context, user *User) error
		FindOne(ctx context.Context, uuid, profileName string) (*User, error)
		Update(ctx context.Context, user *User) error
		Delete(ctx context.Context, uuid, profileName string) error
		UpdateAttributes(ctx context.Context, uuid, profileName string, updates map[string]interface{}) error
		QueryByPartitionKey(ctx context.Context, uuid string) ([]*User, error)
	}

	customUserModel struct {
		*defaultUserModel
	}

	defaultUserModel struct {
		client *dynamodb.Client
		table  string
	}
)

// NewUserModel creates a new instance of customUserModel
func NewUserModel(client *dynamodb.Client, table string) UserModel {
	return &customUserModel{
		&defaultUserModel{
			client: client,
			table:  table,
		},
	}
}

func (m *defaultUserModel) Insert(ctx context.Context, user *User) error {
	return insert(ctx, m.client, m.table, user)
}

func (m *defaultUserModel) FindOne(ctx context.Context, uuid, profileName string) (*User, error) {
	return findOne(ctx, m.client, m.table, uuid, profileName)
}

func (m *defaultUserModel) Update(ctx context.Context, user *User) error {
	return update(ctx, m.client, m.table, user)
}

func (m *defaultUserModel) Delete(ctx context.Context, uuid, profileName string) error {
	return deleteOne(ctx, m.client, m.table, uuid, profileName)
}

func (m *defaultUserModel) UpdateAttributes(ctx context.Context, uuid, profileName string, updates map[string]interface{}) error {
	return updateAttributes(ctx, m.client, m.table, uuid, profileName, updates)
}

func (m *defaultUserModel) QueryByPartitionKey(ctx context.Context, uuid string) ([]*User, error) {
	return queryByPartitionKey(ctx, m.client, m.table, uuid)
}
