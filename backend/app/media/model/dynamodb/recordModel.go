package dynamodb

import (
	"context"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/cedarHH/mygo/common/commonModel"
)

type Record struct {
	SubUserId   string `json:"subUserId" dynamodbav:"SubUserId"`
	Timestamp   int64  `json:"timestamp" dynamodbav:"Timestamp"`
	Composition string `json:"composition" dynamodbav:"Composition"`
	Reference   string `json:"reference" dynamodbav:"Reference"`
	Image       string `json:"image" dynamodbav:"Image"`
	Video       string `json:"video" dynamodbav:"Video"`
	Audio       string `json:"audio" dynamodbav:"Audio"`
	Midi        string `json:"midi" dynamodbav:"Midi"`
	Sheet       string `json:"sheet" dynamodbav:"Sheet"`
	Diff        string `json:"diff" dynamodbav:"Diff"`
	Waterfall   string `json:"waterfall" dynamodbav:"Waterfall"`
	Report      string `json:"report" dynamodbav:"Report"`
	IsRef       bool   `json:"isRef" dynamodbav:"IsRef"`
}

type RecordModel interface {
	Insert(ctx context.Context, record *Record) error
	FindOne(ctx context.Context, subUserId string, timestamp int64) (*Record, error)
	Update(ctx context.Context, record *Record) error
	Delete(ctx context.Context, subUserId string, timestamp int64) error
	UpdateAttributes(ctx context.Context, subUserId string, timestamp int64, updates map[string]interface{}) error
	QueryByPartitionKey(ctx context.Context, subUserId string, sortKeyStart, sortKeyEnd, offset, limit int64) ([]*Record, error)
}

type recordModel struct {
	baseModel *commonModel.BaseModel
}

func NewRecordModel(client *dynamodb.Client, table string) RecordModel {
	return &recordModel{
		&commonModel.BaseModel{
			Client: client,
			Table:  table,
		},
	}
}

func (m *recordModel) Insert(ctx context.Context, record *Record) error {
	return m.baseModel.Insert(ctx, record)
}

func (m *recordModel) FindOne(ctx context.Context, subUserId string, timestamp int64) (*Record, error) {
	key := map[string]interface{}{
		"SubUserId": subUserId,
		"Timestamp": timestamp,
	}

	item, err := m.baseModel.FindOne(ctx, key)
	if err != nil {
		return nil, err
	}

	var record Record
	err = attributevalue.UnmarshalMap(item, &record)
	if err != nil {
		return nil, err
	}

	return &record, nil
}

func (m *recordModel) Update(ctx context.Context, record *Record) error {
	return m.baseModel.Update(ctx, record)
}

func (m *recordModel) Delete(ctx context.Context, subUserId string, timestamp int64) error {
	key := map[string]interface{}{
		"SubUserId": subUserId,
		"Timestamp": timestamp,
	}
	return m.baseModel.Delete(ctx, key)
}

func (m *recordModel) UpdateAttributes(ctx context.Context, subUserId string, timestamp int64, updates map[string]interface{}) error {
	key := map[string]interface{}{
		"SubUserId": subUserId,
		"Timestamp": timestamp,
	}
	return m.baseModel.UpdateAttributes(ctx, key, updates)
}

func (m *recordModel) QueryByPartitionKey(
	ctx context.Context, subUserId string, sortKeyStart, sortKeyEnd, offset, limit int64) ([]*Record, error) {

	start := func() interface{} {
		if sortKeyStart == -1 {
			return nil
		}
		return sortKeyStart
	}()

	end := func() interface{} {
		if sortKeyEnd == -1 {
			return nil
		}
		return sortKeyEnd
	}()
	items, err := m.baseModel.QueryByPartitionKey(ctx, "SubUserId", subUserId, "Timestamp", start, end, offset, limit)
	if err != nil {
		return nil, err
	}

	var records []*Record
	err = attributevalue.UnmarshalListOfMaps(items, &records)
	if err != nil {
		return nil, err
	}

	return records, nil
}
