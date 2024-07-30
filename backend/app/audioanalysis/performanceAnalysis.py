import sys

from reprocessing import parse, waterfall
from inference import transcribe
from preprocessing import convert2audio
from feedback import feedback


def performance_analysis(file_path: str):
    parts = file_path.rsplit('.', 1)
    file_name = parts[0] if len(parts) == 2 else file_path

    if not file_path.endswith(".mp3"):
        convert2audio.convert(
            file_path=file_path,
            output_mp3_path=file_name + ".mp3"
        )
        file_path = file_name + ".mp3"

    transcribe.transcribe(
        intput_file_path=file_path,
        output_file_path=file_name + ".mid"
    )
    midi_events = parse.parse_mid(
        midi_file=file_name + ".mid"
    )
    parse.write2json(
        midiData=midi_events,
        json_file=file_name + ".json"
    )
    waterfall.waterfall(midi_events, output_file_path=file_name + ".png")

    return file_name + ".mid", file_name + ".png", "Analysis Report Content"

def compare(filePath1, filePath2):
    midi_file1, chart_image1, report1 = performance_analysis(filePath1)
    midi_file2, chart_image2, report2 = performance_analysis(filePath2)

    feedback_report = feedback.get_feedback(report1, report2)

    return midi_file1, chart_image1, chart_image2, feedback_report



if __name__ == "__main__":
    performance_analysis(sys.argv[1])
