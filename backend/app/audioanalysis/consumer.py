import re
import pika
import json
import yaml
import logging
from reprocessing import parse, waterfall, midi2sheet, errorExtraction
from inference import transcribe
from feedback import feedback
from s3 import s3


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

    def send_notification(self, is_ref, job_id, sub_user_id, record_id, ref_id, file_name):
        message = {
            "isRef": is_ref,
            'jobId': job_id,
            'subUserId': sub_user_id,
            'recordId': record_id,
            "refId": ref_id,
            'fileName': file_name,
        }
        message_body = json.dumps(message)
        self.send_channel.basic_publish(
            exchange='',
            routing_key='audio_processing_results',
            body=message_body
        )
        logging.info(f"Sent notification for job_id: {job_id}")

    def process_audio(
            self, is_ref, job_id, sub_user_id, record_id, ref_id, file_name,
            audio_url, midi_url, sheet_url, waterfall_url, report_url, json_url):

        logging.info(f"Received job {job_id} for processing")

        s3.download_file_from_s3(
            presigned_url=audio_url,
            save_directory="./tempFile/",
            filename=file_name + ".mp3"
        )

        transcribe.transcribe(
            intput_file_path="./tempFile/" + file_name + ".mp3",
            output_file_path="./tempFile/" + file_name + ".mid"
        )
        s3.upload_file_to_s3(
            file_path="./tempFile/" + file_name + ".mid",
            presigned_url=midi_url
        )

        midi_events = parse.parse_mid(
            midi_file="./tempFile/" + file_name + ".mid"
        )
        parse.write2json(
            midiData=midi_events,
            json_file="./tempFile/" + file_name + "_notes" + ".json"
        )
        waterfall.waterfall(
            midi_events,
            output_file_path="./tempFile/" + file_name + ".png"
        )
        s3.upload_file_to_s3(
            file_path="./tempFile/" + file_name + ".png",
            presigned_url=waterfall_url
        )

        midi2sheet.midi_to_sheet(
            midi_file_path="./tempFile/" + file_name + ".mid",
            output_file_path="./tempFile/" + file_name
        )
        s3.upload_file_to_s3(
            file_path="./tempFile/" + file_name + ".musicxml",
            presigned_url=sheet_url
        )

        if is_ref == "TRUE":
            s3.upload_file_to_s3(
                file_path="./tempFile/" + file_name + "_notes" + ".json",
                presigned_url=json_url
            )
        else:
            s3.download_file_from_s3(
                presigned_url=json_url,
                save_directory="./tempFile/",
                filename=file_name + "_ref" + ".json"
            )

            diff_result, standard_performance, user_performance = errorExtraction.diff(
                reference_performance="./tempFile/" + file_name + "_ref" + ".json",
                user_performance="./tempFile/" + file_name + "_notes" + ".json"
            )
            feedback_response = feedback.get_feedback(
                standard_performance=standard_performance,
                user_performance=user_performance,
                diff=diff_result
            )
            json_data = re.search(r'```json\n(.*?)\n```', feedback_response, re.DOTALL).group(1)
            data = json.loads(json_data)
            data["raw_diff"] = diff_result
            with open("./tempFile/" + file_name + ".json", 'w') as json_file:
                json.dump(data, json_file, indent=4)

            s3.upload_file_to_s3(
                file_path="./tempFile/" + file_name + ".json",
                presigned_url=report_url
            )

        self.send_notification(is_ref, job_id, sub_user_id, record_id, ref_id, file_name)
        logging.info(f"Processed and sent notification for job {job_id}")

    def callback(self, ch, method, properties, body):
        try:
            data = json.loads(body)
            is_ref = data['isRef']
            job_id = data['jobId']
            sub_user_id = data['subUserId']
            record_id = data['recordId']
            ref_id = data['refId']
            file_name = data['fileName']
            audio_url = data['audioURL']
            midi_url = data['midiURL']
            sheet_url = data['sheetURL']
            waterfall_url = data['waterfallURL']
            report_url = data['reportURL']
            json_url = data['jsonURL']

            self.process_audio(is_ref, job_id, sub_user_id, record_id, ref_id, file_name, audio_url, midi_url,
                               sheet_url, waterfall_url, report_url, json_url)
            ch.basic_ack(delivery_tag=method.delivery_tag)
            logging.info(f"Acknowledged job {job_id}")
        except Exception as e:
            logging.error(f"Error processing message: {e}")
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)

    def start_consuming(self):
        receiving_channel = self.connection.channel()
        receiving_channel.queue_declare(queue='audio_processing_queue')
        receiving_channel.basic_consume(queue='audio_processing_queue', on_message_callback=self.callback,
                                        auto_ack=False)
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
