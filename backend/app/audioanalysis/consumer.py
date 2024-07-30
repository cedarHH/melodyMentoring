import time
import pika
import json
import yaml
import logging

class AudioProcessor:
    def __init__(self, config_file='audioanalysis.yaml'):
        self.config = self.load_config(config_file)
        self.connection = self.create_connection()
        self.send_channel = self.connection.channel()
        self.send_channel.queue_declare(queue='audio_processing_results')

    def load_config(self, config_file):
        with open(config_file, 'r') as file:
            return yaml.safe_load(file)

    def create_connection(self):
        credentials = pika.PlainCredentials(
            self.config["rabbitMQ"]["user"],
            self.config["rabbitMQ"]["password"]
        )
        return pika.BlockingConnection(
            pika.ConnectionParameters(
                host=self.config["rabbitMQ"]["host"],
                port=self.config["rabbitMQ"]["port"],
                credentials=credentials
            )
        )

    def send_notification(self, job_id, sub_user_id, record_id, file_name):
        message = {
            'jobId': job_id,
            'subUserId': sub_user_id,
            'recordId': record_id,
            'fileName': file_name,
        }
        message_body = json.dumps(message)
        self.send_channel.basic_publish(
            exchange='',
            routing_key='audio_processing_results',
            body=message_body
        )
        logging.info(f"Sent notification for job_id: {job_id}")

    def process_audio(self, job_id, sub_user_id, record_id, file_name, audio_url, midi_url, sheet_url, waterfall_url, report_url):
        logging.info(f"Received job {job_id} for processing")
        # todo 分析音频
        time.sleep(5)
        self.send_notification(job_id, sub_user_id, record_id, file_name)
        logging.info(f"Processed and sent notification for job {job_id}")

    def callback(self, ch, method, properties, body):
        try:
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

            self.process_audio(job_id, sub_user_id, record_id, file_name, audio_url, midi_url, sheet_url, waterfall_url, report_url)
            ch.basic_ack(delivery_tag=method.delivery_tag)
            logging.info(f"Acknowledged job {job_id}")
        except Exception as e:
            logging.error(f"Error processing message: {e}")
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)

    def start_consuming(self):
        receiving_channel = self.connection.channel()
        receiving_channel.queue_declare(queue='audio_processing_queue')
        receiving_channel.basic_consume(queue='audio_processing_queue', on_message_callback=self.callback, auto_ack=False)
        logging.info('Waiting for messages.')
        receiving_channel.start_consuming()

    def close_connection(self):
        if self.connection and not self.connection.is_closed:
            self.connection.close()
            logging.info('Closed connection.')

def main():
    logging.basicConfig(level=logging.INFO)
    processor = AudioProcessor()
    try:
        processor.start_consuming()
    except KeyboardInterrupt:
        processor.close_connection()

if __name__ == "__main__":
    main()
