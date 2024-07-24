package config

type S3Conf struct {
	ThumbnailBucket S3Bucket `json:"ThumbnailBucket"`
	AudioBucket     S3Bucket `json:"AudioBucket"`
	VideoBucket     S3Bucket `json:"VideoBucket"`
	MidiBucket      S3Bucket `json:"MidiBucket"`
	ReportBucket    S3Bucket `json:"ReportBucket"`
	SheetBucket     S3Bucket `json:"SheetBucket"`
	WaterfallBucket S3Bucket `json:"WaterfallBucket"`
}

type S3Bucket struct {
	Region string `json:"Region"`
	Bucket string `json:"Bucket"`
}
