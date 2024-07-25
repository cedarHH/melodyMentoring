# Use the official Golang image as the base image
FROM golang:1.22-alpine AS builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source code to the container
COPY . .

# Build the Go application
RUN go build -o /app/media ./app/media/api

# Use a minimal image for the runtime environment
FROM alpine:latest

RUN apk --no-cache add ca-certificates curl bash

# Set the working directory inside the runtime container
WORKDIR /app

# Copy the binary from the build image
COPY --from=builder /app/media /usr/local/bin/media

# Copy the configuration file to the container
COPY ./app/media/api/etc/media.yaml ./app/media/api/etc/media.yaml

# Copy AWS credentials
COPY .aws /root/.aws

# Expose the port the service runs on
EXPOSE 8889

# Command to run the executable
CMD ["/usr/local/bin/media", "-f", "./app/media/api/etc/media.yaml"]
