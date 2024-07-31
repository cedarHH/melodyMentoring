package config

type DynamoDBConf struct {
	RecordTable    DynamoDBTable `json:"RecordTable"`
	ReferenceTable DynamoDBTable `json:"ReferenceTable"`
}

type DynamoDBTable struct {
	Region    string `json:"Region"`
	TableName string `json:"TableName"`
}
