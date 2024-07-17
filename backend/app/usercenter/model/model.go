package model

type User struct {
	Uuid            string   `json:"Uuid" dynamodbav:"Uuid"`
	ProfileName     string   `json:"ProfileName" dynamodbav:"ProfileName"`
	Pin             string   `json:"Pin" dynamodbav:"Pin"`
	Avatar          string   `json:"Avatar" dynamodbav:"Avatar"`
	Gender          string   `json:"Gender" dynamodbav:"Gender"`
	Dob             string   `json:"Dob" dynamodbav:"Dob"`
	Level           string   `json:"Level" dynamodbav:"Level"`
	Instrument      string   `json:"Instrument" dynamodbav:"Instrument"`
	TotalTime       int64    `json:"TotalTime" dynamodbav:"TotalTime"`
	NotesPlayed     int64    `json:"NotesPlayed" dynamodbav:"NotesPlayed"`
	LastPlayDate    string   `json:"LastPlayDate" dynamodbav:"LastPlayDate"`
	ConsecutiveDays int64    `json:"ConsecutiveDays" dynamodbav:"ConsecutiveDays"`
	Badges          []string `json:"Badges" dynamodbav:"Badges"`
}
