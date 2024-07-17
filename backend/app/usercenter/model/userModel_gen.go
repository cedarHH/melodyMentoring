package model

import (
	"context"
	"fmt"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

func insert(ctx context.Context, client *dynamodb.Client, table string, user *User) error {
	av, err := attributevalue.MarshalMap(user)
	if err != nil {
		return fmt.Errorf("failed to marshal user: %w", err)
	}
	input := &dynamodb.PutItemInput{
		TableName: aws.String(table),
		Item:      av,
	}
	_, err = client.PutItem(ctx, input)
	if err != nil {
		return fmt.Errorf("failed to put item: %w", err)
	}
	return nil
}

func findOne(ctx context.Context, client *dynamodb.Client, table, uuid, profileName string) (*User, error) {
	input := &dynamodb.GetItemInput{
		TableName: aws.String(table),
		Key: map[string]types.AttributeValue{
			"Uuid":        &types.AttributeValueMemberS{Value: uuid},
			"ProfileName": &types.AttributeValueMemberS{Value: profileName},
		},
	}
	result, err := client.GetItem(ctx, input)
	if err != nil {
		return nil, fmt.Errorf("failed to get item: %w", err)
	}
	if result.Item == nil {
		return nil, nil // item not found
	}
	var user User
	err = attributevalue.UnmarshalMap(result.Item, &user)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal item: %w", err)
	}
	return &user, nil
}

func update(ctx context.Context, client *dynamodb.Client, table string, user *User) error {
	av, err := attributevalue.MarshalMap(user)
	if err != nil {
		return fmt.Errorf("failed to marshal user: %w", err)
	}
	input := &dynamodb.PutItemInput{
		TableName: aws.String(table),
		Item:      av,
	}
	_, err = client.PutItem(ctx, input)
	if err != nil {
		return fmt.Errorf("failed to put item: %w", err)
	}
	return nil
}

func deleteOne(ctx context.Context, client *dynamodb.Client, table, uuid, profileName string) error {
	input := &dynamodb.DeleteItemInput{
		TableName: aws.String(table),
		Key: map[string]types.AttributeValue{
			"Uuid":        &types.AttributeValueMemberS{Value: uuid},
			"ProfileName": &types.AttributeValueMemberS{Value: profileName},
		},
	}
	_, err := client.DeleteItem(ctx, input)
	if err != nil {
		return fmt.Errorf("failed to delete item: %w", err)
	}
	return nil
}

func updateAttributes(ctx context.Context, client *dynamodb.Client, table, uuid, profileName string, updates map[string]interface{}) error {
	exprAttrNames := make(map[string]string)
	exprAttrValues := make(map[string]types.AttributeValue)
	updateExpr := "set"

	i := 0
	for k, v := range updates {
		attrName := fmt.Sprintf("#attr%d", i)
		attrValue := fmt.Sprintf(":val%d", i)
		exprAttrNames[attrName] = k
		av, err := attributevalue.Marshal(v)
		if err != nil {
			return fmt.Errorf("failed to marshal attribute value: %w", err)
		}
		exprAttrValues[attrValue] = av
		updateExpr += fmt.Sprintf(" %s = %s,", attrName, attrValue)
		i++
	}
	// Remove the trailing comma
	updateExpr = updateExpr[:len(updateExpr)-1]

	input := &dynamodb.UpdateItemInput{
		TableName: aws.String(table),
		Key: map[string]types.AttributeValue{
			"Uuid":        &types.AttributeValueMemberS{Value: uuid},
			"ProfileName": &types.AttributeValueMemberS{Value: profileName},
		},
		ExpressionAttributeNames:  exprAttrNames,
		ExpressionAttributeValues: exprAttrValues,
		UpdateExpression:          aws.String(updateExpr),
	}
	_, err := client.UpdateItem(ctx, input)
	if err != nil {
		return fmt.Errorf("failed to update item: %w", err)
	}
	return nil
}

func queryByPartitionKey(ctx context.Context, client *dynamodb.Client, table, uuid string) ([]*User, error) {
	input := &dynamodb.QueryInput{
		TableName:              aws.String(table),
		KeyConditionExpression: aws.String("#uuid = :uuid"),
		ExpressionAttributeNames: map[string]string{
			"#uuid": "Uuid",
		},
		ExpressionAttributeValues: map[string]types.AttributeValue{
			":uuid": &types.AttributeValueMemberS{Value: uuid},
		},
	}
	result, err := client.Query(ctx, input)
	if err != nil {
		return nil, fmt.Errorf("failed to query items: %w", err)
	}
	var users []*User
	err = attributevalue.UnmarshalListOfMaps(result.Items, &users)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal query result items: %w", err)
	}
	return users, nil
}
