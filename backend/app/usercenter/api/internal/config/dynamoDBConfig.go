package config

type DynamoDBConf struct {
	UserTable DynamoDBTable `json:"UserTable"`
}

type DynamoDBTable struct {
	Region    string `json:"Region"`
	TableName string `json:"TableName"`
}
