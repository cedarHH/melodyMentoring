import requests
import os


def download_file_from_s3(presigned_url, save_directory, filename):
    if not os.path.exists(save_directory):
        os.makedirs(save_directory)

    file_path = os.path.join(save_directory, filename)

    response = requests.get(presigned_url)

    if response.status_code == 200:
        with open(file_path, 'wb') as file:
            file.write(response.content)
        print(f"download: {file_path}")
    else:
        print(f"error: {response.status_code}")


def upload_file_to_s3(file_path, presigned_url):
    with open(file_path, 'rb') as file:
        response = requests.put(presigned_url, data=file)

        if response.status_code == 200:
            print(f"upload: {file_path}")
        else:
            print(f"error: {response.status_code}")
