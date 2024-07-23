package config

type DynamoDBConf struct {
	RecordTable DynamoDBTable `json:"RecordTable"`
}

type DynamoDBTable struct {
	Region    string `json:"Region"`
	TableName string `json:"TableName"`
}
