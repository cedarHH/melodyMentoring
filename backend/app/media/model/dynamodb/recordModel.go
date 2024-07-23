package dynamodb

import (
	"context"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/cedarHH/mygo/common/commonModel"
)

type Record struct {
	SubUserId   string `json:"subUserId"`
	Timestamp   int64  `json:"timestamp"`
	Composition string `json:"composition"`
	Reference   string `json:"reference"`
	Image       string `json:"image"`
	Video       string `json:"video"`
	Audio       string `json:"audio"`
	Midi        string `json:"midi"`
	Sheet       string `json:"sheet"`
	Diff        string `json:"diff"`
	Waterfall   string `json:"waterfall"`
	Report      string `json:"report"`
	IsRef       string `json:"isRef"`
}

type RecordModel interface {
	Insert(ctx context.Context, record *Record) error
	FindOne(ctx context.Context, subUserId string, timestamp int64) (*Record, error)
	Update(ctx context.Context, record *Record) error
	Delete(ctx context.Context, subUserId string, timestamp int64) error
	UpdateAttributes(ctx context.Context, subUserId string, timestamp int64, updates map[string]interface{}) error
	QueryByPartitionKey(ctx context.Context, subUserId string, sortKeyStart, sortKeyEnd int64, offset, limit int) ([]*Record, error)
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

func (m *recordModel) QueryByPartitionKey(ctx context.Context, subUserId string, sortKeyStart, sortKeyEnd int64, offset, limit int) ([]*Record, error) {
	items, err := m.baseModel.QueryByPartitionKey(ctx, "SubUserId", subUserId, "Timestamp", sortKeyStart, sortKeyEnd, offset, limit)
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
