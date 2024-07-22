package commonModel

import (
	"context"
	"io"
	"log"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type IS3Model interface {
	Upload(ctx context.Context, key string, file io.Reader) error
	Download(ctx context.Context, key string) (io.ReadCloser, error)
	Delete(ctx context.Context, key string) error
	GetPresignedUploadURL(ctx context.Context, key string, lifetimeSecs int64) (string, error)
	GetPresignedDownloadURL(ctx context.Context, key string, lifetimeSecs int64) (string, error)
	CheckFileExists(ctx context.Context, key string) error
}

type S3Model struct {
	Client        *s3.Client
	PresignClient *s3.PresignClient
	Bucket        string
}

func (m *S3Model) Upload(ctx context.Context, key string, body io.Reader) error {
	_, err := m.Client.PutObject(ctx, &s3.PutObjectInput{
		Bucket: aws.String(m.Bucket),
		Key:    aws.String(key),
		Body:   body,
	})
	return err
}

func (m *S3Model) Download(ctx context.Context, key string) (io.ReadCloser, error) {
	resp, err := m.Client.GetObject(ctx, &s3.GetObjectInput{
		Bucket: aws.String(m.Bucket),
		Key:    aws.String(key),
	})
	if err != nil {
		return nil, err
	}
	return resp.Body, nil
}

func (m *S3Model) Delete(ctx context.Context, key string) error {
	_, err := m.Client.DeleteObject(ctx, &s3.DeleteObjectInput{
		Bucket: aws.String(m.Bucket),
		Key:    aws.String(key),
	})
	return err
}

func (m *S3Model) GetPresignedUploadURL(ctx context.Context, key string, lifetimeSecs int64) (string, error) {
	request, err := m.PresignClient.PresignPutObject(ctx, &s3.PutObjectInput{
		Bucket: aws.String(m.Bucket),
		Key:    aws.String(key),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = time.Duration(lifetimeSecs * int64(time.Second))
	})
	if err != nil {
		log.Printf("Couldn't get a presigned request to put %v:%v. Here's why: %v\n",
			m.Bucket, key, err)
		return "", err
	}
	return request.URL, nil
}

func (m *S3Model) GetPresignedDownloadURL(ctx context.Context, key string, lifetimeSecs int64) (string, error) {
	request, err := m.PresignClient.PresignGetObject(ctx, &s3.GetObjectInput{
		Bucket: aws.String(m.Bucket),
		Key:    aws.String(key),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = time.Duration(lifetimeSecs * int64(time.Second))
	})
	if err != nil {
		log.Printf("Couldn't get a presigned request to get %v:%v. Here's why: %v\n",
			m.Bucket, key, err)
		return "", err
	}
	return request.URL, nil
}

func (m *S3Model) CheckFileExists(ctx context.Context, key string) error {
	_, err := m.Client.HeadObject(ctx, &s3.HeadObjectInput{
		Bucket: aws.String(m.Bucket),
		Key:    aws.String(key),
	})
	if err != nil {
		// File does not exist or there was a request error
		return err
	}
	return nil
}
