import music21


def midi_to_sheet(midi_file_path, output_file_path):
    parsed = music21.converter.parse(midi_file_path)
    parsed.write(
        fmt='xml',
        fp=output_file_path)

