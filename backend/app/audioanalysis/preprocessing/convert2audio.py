from pydub import AudioSegment


def convert(file_path, output_mp3_path):
    try:
        audio_segment = AudioSegment.from_file(file_path, format=file_path.split(".")[-1])
        audio_segment.export(output_mp3_path, format="mp3")
    except Exception as e:
        print(f"An error occurred: {e}")

    print(f"Audio extracted and saved as {output_mp3_path}")


if __name__ == "__main__":
    convert(file_path="littlestar.mp4", output_mp3_path="littlestar.mp3")
