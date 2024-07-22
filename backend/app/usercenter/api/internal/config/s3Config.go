package config

type S3Conf struct {
	AvatarBucket S3Bucket `json:"AvatarBucket"`
}

type S3Bucket struct {
	Region string `json:"Region"`
	Bucket string `json:"Bucket"`
}
