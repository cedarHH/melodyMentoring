package model

import (
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type (
	userModel interface {
		Insert(ctx context.Context, data *User) error
		FindOne(ctx context.Context, uuid string, profileName string) (*User, error)
		Update(ctx context.Context, data *User) error
		Delete(ctx context.Context, uuid string, profileName string) error
	}

	defaultUserModel struct {
		client *dynamodb.DynamoDB
		table  string
	}

	User struct {
		Uuid            string   `json:"uuid"`
		ProfileName     string   `json:"profileName"`
		Pin             int64    `json:"pin"`
		Avatar          string   `json:"avatar"`
		Gender          string   `json:"gender"`
		Dob             string   `json:"dob"`
		Level           string   `json:"level"`
		Instrument      string   `json:"instrument"`
		TotalTime       int64    `json:"totaltime"`
		NotesPlayed     int64    `json:"notesplayed"`
		LastPlayDate    string   `json:"lastplaydate"`
		ConsecutiveDays int64    `json:"consecutivedays"`
		Badges          []string `json:"badges"`
	}
)

func (m *defaultUserModel) Insert(ctx context.Context, data *User) error {
	av, err := dynamodbattribute.MarshalMap(data)
	if err != nil {
		return err
	}

	input := &dynamodb.PutItemInput{
		TableName: aws.String(m.table),
		Item:      av,
	}

	_, err = m.client.PutItemWithContext(ctx, input)
	return err
}

func (m *defaultUserModel) FindOne(ctx context.Context, uuid string, profileName string) (*User, error) {
	result, err := m.client.GetItemWithContext(ctx, &dynamodb.GetItemInput{
		TableName: aws.String(m.table),
		Key: map[string]*dynamodb.AttributeValue{
			"Uuid": {
				S: aws.String(uuid),
			},
			"ProfileName": {
				S: aws.String(profileName),
			},
		},
	})
	if err != nil {
		return nil, err
	}

	if result.Item == nil {
		return nil, fmt.Errorf("no item found with uuid %s and profileName %s", uuid, profileName)
	}

	var user User
	err = dynamodbattribute.UnmarshalMap(result.Item, &user)
	return &user, err
}

func (m *defaultUserModel) Update(ctx context.Context, data *User) error {
	av, err := dynamodbattribute.MarshalMap(data)
	if err != nil {
		return err
	}

	input := &dynamodb.PutItemInput{
		TableName: aws.String(m.table),
		Item:      av,
	}

	_, err = m.client.PutItemWithContext(ctx, input)
	return err
}

func (m *defaultUserModel) Delete(ctx context.Context, uuid string, profileName string) error {
	input := &dynamodb.DeleteItemInput{
		TableName: aws.String(m.table),
		Key: map[string]*dynamodb.AttributeValue{
			"Uuid": {
				S: aws.String(uuid),
			},
			"ProfileName": {
				S: aws.String(profileName),
			},
		},
	}

	_, err := m.client.DeleteItemWithContext(ctx, input)
	return err
}
