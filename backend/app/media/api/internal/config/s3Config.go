package config

type S3Conf struct {
	ThumbnailBucket S3Bucket `json:"ThumbnailBucket"`
}

type S3Bucket struct {
	Region string `json:"Region"`
	Bucket string `json:"Bucket"`
}
