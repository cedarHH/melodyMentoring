package consumer

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/cedarHH/mygo/app/media/model/dynamodb"
	"github.com/zeromicro/go-zero/core/logx"
	"sync"

	"github.com/cedarHH/mygo/common/messageQueue"
)

type AnalysisResultConsumer struct {
	logx.Logger
	ctx                  context.Context
	rabbitMQClient       *messageQueue.RabbitMQClient
	latestCompletedJobId int64
	completedMu          sync.Mutex
	recordModel          dynamodb.RecordModel
	referenceModel       dynamodb.ReferenceModel
}

func NewAnalysisResultConsumer(
	ctx context.Context,
	rmqClient *messageQueue.RabbitMQClient,
	recordModel dynamodb.RecordModel,
	referenceModel dynamodb.ReferenceModel) *AnalysisResultConsumer {

	return &AnalysisResultConsumer{
		Logger:         logx.WithContext(ctx),
		ctx:            ctx,
		rabbitMQClient: rmqClient,
		recordModel:    recordModel,
		referenceModel: referenceModel,
	}
}

func (c *AnalysisResultConsumer) StartConsuming() {
	err := c.rabbitMQClient.ConsumeMessages(c.handleMessage)
	if err != nil {
		fmt.Printf("Failed to start consuming messages: %v\n", err)
	}
}

func (c *AnalysisResultConsumer) handleMessage(message string) {
	var msg map[string]interface{}
	err := json.Unmarshal([]byte(message), &msg)
	if err != nil {
		fmt.Printf("Failed to unmarshal message: %v\n", err)
		return
	}
	isRef := msg["isRef"].(string)
	jobId := int64(msg["jobId"].(float64))
	subUserId := msg["subUserId"].(string)
	recordId := int64(msg["recordId"].(float64))
	refId := msg["refId"].(string)
	fileName := msg["fileName"].(string)

	if isRef == "TRUE" {
		updates := map[string]interface{}{
			"Midi":      fileName + ".mid",
			"Sheet":     fileName + ".musicxml",
			"Waterfall": fileName + ".png",
			"Json":      fileName + ".json",
		}
		err = c.referenceModel.UpdateAttributes(c.ctx, refId, updates)
		if err != nil {
			c.Logger.Errorf("failed to update reference: %w", err)
		}
	} else {
		updates := map[string]interface{}{
			"Midi":      fileName + ".mid",
			"Sheet":     fileName + ".musicxml",
			"Waterfall": fileName + ".png",
			"Report":    fileName + ".json",
		}
		err = c.recordModel.UpdateAttributes(c.ctx, subUserId, recordId, updates)
		if err != nil {
			c.Logger.Errorf("failed to update record: %w", err)
		}
	}

	c.updateLatestCompletedJobId(jobId)
}

func (c *AnalysisResultConsumer) updateLatestCompletedJobId(jobId int64) {
	c.completedMu.Lock()
	defer c.completedMu.Unlock()
	if jobId > c.latestCompletedJobId {
		c.latestCompletedJobId = jobId
	}
}

func (c *AnalysisResultConsumer) GetLatestCompletedJobId() int64 {
	c.completedMu.Lock()
	defer c.completedMu.Unlock()
	return c.latestCompletedJobId
}

func (c *AnalysisResultConsumer) Close() {
	err := c.rabbitMQClient.Close()
	if err != nil {
		return
	}
}
