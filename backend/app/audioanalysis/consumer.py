import time

import pika
import json
import yaml

connection = None
send_channel = None


def init_rabbitmq():
    global connection, send_channel
    with open('audioanalysis.yaml', 'r') as file:
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
    send_channel = connection.channel()
    send_channel.queue_declare(queue='audio_processing_results')


def send_notification(job_id, sub_user_id, record_id, file_name):
    global send_channel
    message = {
        'jobId': job_id,
        'subUserId': sub_user_id,
        'recordId': record_id,
        'fileName': file_name,
    }
    message_body = json.dumps(message)

    send_channel.basic_publish(
        exchange='',
        routing_key='audio_processing_results',
        body=message_body
    )


def process_audio(job_id, sub_user_id, record_id, file_name, audio_url, midi_url, sheet_url, waterfall_url, report_url):
    # todo
    print(f"recv {job_id}")
    time.sleep(5)
    send_notification(job_id, sub_user_id, record_id, file_name)
    print(f"send {job_id}")


def callback(ch, method, properties, body):
    data = json.loads(body)
    job_id = data['jobId']
    sub_user_id = data['subUserId']
    record_id = data['recordId']
    file_name = data['fileName']
    audio_url = data['audioURL']
    midi_url = data['midiURL']
    sheet_url = data['sheetURL']
    waterfall_url = data['waterfallURL']
    report_url = data['reportURL']

    process_audio(job_id, sub_user_id, record_id, file_name, audio_url, midi_url, sheet_url, waterfall_url, report_url)
    ch.basic_ack(delivery_tag=method.delivery_tag)


def main():
    init_rabbitmq()

    with open('audioanalysis.yaml', 'r') as file:
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
    receiving_channel = connection.channel()
    receiving_channel.queue_declare(queue='audio_processing_queue')

    receiving_channel.basic_consume(queue='audio_processing_queue', on_message_callback=callback, auto_ack=False)
    print('Waiting for messages.')
    receiving_channel.start_consuming()

if __name__ == "__main__":
    main()
