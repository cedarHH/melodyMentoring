# Use the official Golang image as the base image
FROM golang:1.22-alpine

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source code to the container
COPY . .

# Build the Go application
RUN go build -o /usercenter ./app/usercenter/api

# Use a minimal image for the runtime environment
FROM alpine:latest

# Set the working directory inside the runtime container
WORKDIR /app

# Copy the binary from the build image
COPY --from=0 /usercenter /usr/local/bin/usercenter

# Copy the configuration file to the container
COPY ./app/usercenter/api/etc/usercenter.yaml ./app/usercenter/api/etc/usercenter.yaml

# Expose the port the service runs on
EXPOSE 8888

# Command to run the executable
CMD ["usercenter", "-f", "./app/usercenter/api/etc/usercenter.yaml"]
