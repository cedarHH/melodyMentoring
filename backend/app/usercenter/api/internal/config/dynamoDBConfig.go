package config

type DynamoDBConf struct {
	Region    string `json:"Region"`
	TableName string `json:"TableName"`
}
