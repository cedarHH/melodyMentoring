package dynamodb

import (
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/cedarHH/mygo/common/commonModel"
)

type Reference struct {
	RefId      string `json:"refId" dynamodbav:"RefId"`
	Title      string `json:"title" dynamodbav:"Title"`
	Style      string `json:"style" dynamodbav:"Style"`
	Composer   string `json:"composer" dynamodbav:"Reference"`
	Instrument string `json:"instrument" dynamobav:"Instrument"`
	Image      string `json:"image" dynamodbav:"Image"`
	Video      string `json:"video" dynamodbav:"Video"`
	Audio      string `json:"audio" dynamodbav:"Audio"`
	Midi       string `json:"midi" dynamodbav:"Midi"`
	Sheet      string `json:"sheet" dynamodbav:"Sheet"`
	Waterfall  string `json:"waterfall" dynamodbav:"Waterfall"`
	Json       string `json:"json" dynamodbav:"Json"`
}

type ReferenceModel interface {
	Insert(ctx context.Context, reference *Reference) error
	FindOne(ctx context.Context, refId string) (*Reference, error)
	Update(ctx context.Context, reference *Reference) error
	Delete(ctx context.Context, refId string) error
	UpdateAttributes(ctx context.Context, refId string, updates map[string]interface{}) error
	FindByStyle(ctx context.Context, style string) ([]Reference, error)
}

type referenceModel struct {
	baseModel *commonModel.BaseModel
}

func NewReferenceModel(client *dynamodb.Client, table string) ReferenceModel {
	return &referenceModel{
		&commonModel.BaseModel{
			Client: client,
			Table:  table,
		},
	}
}

func (m *referenceModel) Insert(ctx context.Context, reference *Reference) error {
	return m.baseModel.Insert(ctx, reference)
}

func (m *referenceModel) FindOne(ctx context.Context, refId string) (*Reference, error) {
	key := map[string]interface{}{
		"RefId": refId,
	}

	item, err := m.baseModel.FindOne(ctx, key)
	if err != nil {
		return nil, err
	}

	var reference Reference
	err = attributevalue.UnmarshalMap(item, &reference)
	if err != nil {
		return nil, err
	}

	return &reference, nil
}

func (m *referenceModel) Update(ctx context.Context, reference *Reference) error {
	return m.baseModel.Update(ctx, reference)
}

func (m *referenceModel) Delete(ctx context.Context, refId string) error {
	key := map[string]interface{}{
		"RefId": refId,
	}
	return m.baseModel.Delete(ctx, key)
}

func (m *referenceModel) UpdateAttributes(ctx context.Context, refId string, updates map[string]interface{}) error {
	key := map[string]interface{}{
		"RefId": refId,
	}
	return m.baseModel.UpdateAttributes(ctx, key, updates)
}

func (m *referenceModel) FindByStyle(ctx context.Context, style string) ([]Reference, error) {
	input := &dynamodb.QueryInput{
		TableName:              aws.String(m.baseModel.Table),
		IndexName:              aws.String("Style-Title-index"),
		KeyConditionExpression: aws.String("#style = :style"),
		ExpressionAttributeNames: map[string]string{
			"#style": "Style",
		},
		ExpressionAttributeValues: map[string]types.AttributeValue{
			":style": &types.AttributeValueMemberS{Value: style},
		},
	}

	result, err := m.baseModel.Client.Query(ctx, input)
	if err != nil {
		return nil, fmt.Errorf("failed to query items: %w", err)
	}
	if len(result.Items) == 0 {
		return nil, nil // no items found
	}

	var references []Reference
	err = attributevalue.UnmarshalListOfMaps(result.Items, &references)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal result: %w", err)
	}

	return references, nil
}
