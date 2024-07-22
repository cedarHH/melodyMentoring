package commonModel

import (
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type BaseModel struct {
	Client *dynamodb.Client
	Table  string
}

func (m *BaseModel) Insert(ctx context.Context, item interface{}) error {
	av, err := attributevalue.MarshalMap(item)
	if err != nil {
		return fmt.Errorf("failed to marshal item: %w", err)
	}
	input := &dynamodb.PutItemInput{
		TableName: aws.String(m.Table),
		Item:      av,
	}
	_, err = m.Client.PutItem(ctx, input)
	if err != nil {
		return fmt.Errorf("failed to put item: %w", err)
	}
	return nil
}

func (m *BaseModel) FindOne(ctx context.Context, key map[string]interface{}) (map[string]types.AttributeValue, error) {
	av, err := attributevalue.MarshalMap(key)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal key: %w", err)
	}
	input := &dynamodb.GetItemInput{
		TableName: aws.String(m.Table),
		Key:       av,
	}
	result, err := m.Client.GetItem(ctx, input)
	if err != nil {
		return nil, fmt.Errorf("failed to get item: %w", err)
	}
	if result.Item == nil {
		return nil, nil // item not found
	}
	return result.Item, nil
}

func (m *BaseModel) Update(ctx context.Context, item interface{}) error {
	av, err := attributevalue.MarshalMap(item)
	if err != nil {
		return fmt.Errorf("failed to marshal item: %w", err)
	}
	input := &dynamodb.PutItemInput{
		TableName: aws.String(m.Table),
		Item:      av,
	}
	_, err = m.Client.PutItem(ctx, input)
	if err != nil {
		return fmt.Errorf("failed to put item: %w", err)
	}
	return nil
}

func (m *BaseModel) Delete(ctx context.Context, key map[string]interface{}) error {
	av, err := attributevalue.MarshalMap(key)
	if err != nil {
		return fmt.Errorf("failed to marshal key: %w", err)
	}
	input := &dynamodb.DeleteItemInput{
		TableName: aws.String(m.Table),
		Key:       av,
	}
	_, err = m.Client.DeleteItem(ctx, input)
	if err != nil {
		return fmt.Errorf("failed to delete item: %w", err)
	}
	return nil
}

func (m *BaseModel) UpdateAttributes(ctx context.Context, key map[string]interface{}, updates map[string]interface{}) error {
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

	av, err := attributevalue.MarshalMap(key)
	if err != nil {
		return fmt.Errorf("failed to marshal key: %w", err)
	}

	input := &dynamodb.UpdateItemInput{
		TableName:                 aws.String(m.Table),
		Key:                       av,
		ExpressionAttributeNames:  exprAttrNames,
		ExpressionAttributeValues: exprAttrValues,
		UpdateExpression:          aws.String(updateExpr),
	}
	_, err = m.Client.UpdateItem(ctx, input)
	if err != nil {
		return fmt.Errorf("failed to update item: %w", err)
	}
	return nil
}

func (m *BaseModel) QueryByPartitionKey(ctx context.Context, partitionKey string, keyValue string) ([]map[string]types.AttributeValue, error) {
	input := &dynamodb.QueryInput{
		TableName:              aws.String(m.Table),
		KeyConditionExpression: aws.String("#key = :value"),
		ExpressionAttributeNames: map[string]string{
			"#key": partitionKey,
		},
		ExpressionAttributeValues: map[string]types.AttributeValue{
			":value": &types.AttributeValueMemberS{Value: keyValue},
		},
	}
	result, err := m.Client.Query(ctx, input)
	if err != nil {
		return nil, fmt.Errorf("failed to query items: %w", err)
	}

	return result.Items, nil
}
