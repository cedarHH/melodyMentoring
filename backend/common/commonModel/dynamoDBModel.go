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

func (m *BaseModel) Insert(
	ctx context.Context, item interface{}) error {

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

func (m *BaseModel) FindOne(
	ctx context.Context, key map[string]interface{}) (map[string]types.AttributeValue, error) {

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

func (m *BaseModel) Update(
	ctx context.Context, item interface{}) error {

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

func (m *BaseModel) Delete(
	ctx context.Context, key map[string]interface{}) error {

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

func (m *BaseModel) UpdateAttributes(
	ctx context.Context, key map[string]interface{}, updates map[string]interface{}) error {

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

func (m *BaseModel) QueryByPartitionKey(
	ctx context.Context,
	partitionKey string,
	partitionValue string,
	sortKey string,
	sortKeyStart interface{},
	sortKeyEnd interface{},
	offset int,
	limit int) ([]map[string]types.AttributeValue, error) {

	var keyConditionExpression string
	expressionAttributeValues := map[string]types.AttributeValue{
		":partitionValue": &types.AttributeValueMemberS{Value: partitionValue},
	}
	expressionAttributeNames := map[string]string{
		"#partitionKey": partitionKey,
	}

	if sortKeyStart != nil && sortKeyEnd != nil {
		keyConditionExpression = "#partitionKey = :partitionValue AND #sortKey BETWEEN :sortKeyStart AND :sortKeyEnd"
		expressionAttributeValues[":sortKeyStart"] = createAttributeValue(sortKeyStart)
		expressionAttributeValues[":sortKeyEnd"] = createAttributeValue(sortKeyEnd)
		expressionAttributeNames["#sortKey"] = sortKey
	} else if sortKeyStart != nil {
		keyConditionExpression = "#partitionKey = :partitionValue AND #sortKey >= :sortKeyStart"
		expressionAttributeValues[":sortKeyStart"] = createAttributeValue(sortKeyStart)
		expressionAttributeNames["#sortKey"] = sortKey
	} else if sortKeyEnd != nil {
		keyConditionExpression = "#partitionKey = :partitionValue AND #sortKey <= :sortKeyEnd"
		expressionAttributeValues[":sortKeyEnd"] = createAttributeValue(sortKeyEnd)
		expressionAttributeNames["#sortKey"] = sortKey
	} else {
		keyConditionExpression = "#partitionKey = :partitionValue"
	}

	input := &dynamodb.QueryInput{
		TableName:                 aws.String(m.Table),
		KeyConditionExpression:    aws.String(keyConditionExpression),
		ExpressionAttributeNames:  expressionAttributeNames,
		ExpressionAttributeValues: expressionAttributeValues,
	}

	if limit != -1 {
		input.Limit = aws.Int32(int32(limit))
	}

	var resultItems []map[string]types.AttributeValue
	var lastEvaluatedKey map[string]types.AttributeValue

	for {
		if offset > 0 {
			result, err := m.Client.Query(ctx, input)
			if err != nil {
				return nil, fmt.Errorf("failed to query items: %w", err)
			}

			offset -= len(result.Items)
			lastEvaluatedKey = result.LastEvaluatedKey

			if len(result.Items) == 0 || len(lastEvaluatedKey) == 0 {
				return nil, nil
			}

			input.ExclusiveStartKey = lastEvaluatedKey
		} else {
			break
		}
	}

	for {
		result, err := m.Client.Query(ctx, input)
		if err != nil {
			return nil, fmt.Errorf("failed to query items: %w", err)
		}

		resultItems = append(resultItems, result.Items...)

		if len(result.Items) == 0 || len(lastEvaluatedKey) == 0 {
			break
		}

		if limit != -1 && len(resultItems) >= limit {
			break
		}

		lastEvaluatedKey = result.LastEvaluatedKey
		input.ExclusiveStartKey = lastEvaluatedKey
	}

	if limit != -1 && len(resultItems) > limit {
		resultItems = resultItems[:limit]
	}

	return resultItems, nil
}

func createAttributeValue(value interface{}) types.AttributeValue {
	switch v := value.(type) {
	case string:
		return &types.AttributeValueMemberS{Value: v}
	case int:
		return &types.AttributeValueMemberN{Value: fmt.Sprintf("%d", v)}
	case int64:
		return &types.AttributeValueMemberN{Value: fmt.Sprintf("%d", v)}
	case float64:
		return &types.AttributeValueMemberN{Value: fmt.Sprintf("%f", v)}
	default:
		panic("unsupported attribute value type")
	}
}
