package messageQueue

import (
	"fmt"
	"log"
	"sync"

	"github.com/streadway/amqp"
)

type RabbitMQClient struct {
	conn    *amqp.Connection
	channel *amqp.Channel
	queue   amqp.Queue
	mu      sync.Mutex
}

var instance *RabbitMQClient
var once sync.Once

func GetRabbitMQClient(user, password, host, queueName string, port int) *RabbitMQClient {
	once.Do(func() {
		conn, err := amqp.Dial(fmt.Sprintf("amqp://%s:%s@%s:%d/", user, password, host, port))
		if err != nil {
			log.Fatalf("Failed to connect to RabbitMQ: %v", err)
		}

		ch, err := conn.Channel()
		if err != nil {
			log.Fatalf("Failed to open a channel: %v", err)
		}

		q, err := ch.QueueDeclare(
			queueName, // name
			false,     // durable
			false,     // delete when unused
			false,     // exclusive
			false,     // no-wait
			nil,       // arguments
		)
		if err != nil {
			log.Fatalf("Failed to declare a queue: %v", err)
		}

		instance = &RabbitMQClient{
			conn:    conn,
			channel: ch,
			queue:   q,
		}
	})
	return instance
}

func (r *RabbitMQClient) SendMessage(message string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	err := r.channel.Publish(
		"",           // exchange
		r.queue.Name, // routing key
		false,        // mandatory
		false,        // immediate
		amqp.Publishing{
			ContentType: "application/json",
			Body:        []byte(message),
		})
	if err != nil {
		return fmt.Errorf("failed to publish a message: %w", err)
	}

	return nil
}
