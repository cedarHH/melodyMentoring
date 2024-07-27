import music21


def midi_to_sheet(midi_file_path, output_file_path):
    parsed = music21.converter.parse(midi_file_path)
    parsed.write(
        fmt='xml',
        fp=output_file_path)


if __name__ == "__main__":
    # Usage example
    midi_file_path = '../data/data1_2.mid'
    output_file_path = 'data/data1_2'
    midi_to_sheet(midi_file_path, output_file_path)
