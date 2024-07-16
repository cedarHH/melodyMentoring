package config

type CognitoConf struct {
	AwsRegion     string `json:"AwsRegion"`
	UserPoolId    string `json:"UserPoolId"`
	AppClientId   string `json:"AppClientId"`
	CognitoDomain string `json:"CognitoDomain"`
}
