import pika
import json
import yaml


def process_audio(sub_user_id):
    # 调用你的神经网络进行处理
    print(f"Processing audio for subUserId: {sub_user_id}")
    # your neural network processing code here


def callback(ch, method, properties, body):
    data = json.loads(body)
    sub_user_id = data['subUserId']
    process_audio(sub_user_id)
    ch.basic_ack(delivery_tag=method.delivery_tag)


def main():
    with open('config.yaml', 'r') as file:
        config = yaml.safe_load(file)

    credentials = pika.PlainCredentials(
        config["rabbitMQ"]["user"],
        config["rabbitMQ"]["password"]
    )
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(
            host=config["rabbitMQ"]["host"],
            port=config["rabbitMQ"]["port"],
            credentials=credentials
        )
    )
    channel = connection.channel()
    channel.queue_declare(queue='audio_processing_queue')

    channel.basic_consume(queue='audio_processing_queue', on_message_callback=callback, auto_ack=False)
    print('Waiting for messages.')
    channel.start_consuming()


if __name__ == "__main__":
    main()
