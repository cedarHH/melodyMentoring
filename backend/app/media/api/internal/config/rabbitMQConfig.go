package config

type RabbitMQConf struct {
	User     string `json:"User"`
	Password string `json:"Password"`
	Port     int    `json:"Port"`
}
