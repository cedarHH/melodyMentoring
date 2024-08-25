import music21


def midi_to_sheet(midi_file_path, output_file_path):
    parsed = music21.converter.parse(midi_file_path)

    parsed.metadata = music21.metadata.Metadata()
    parsed.metadata.composer = "auto-generation"

    high_part = music21.stream.Part()
    high_part.id = 'High Voice'
    high_instrument = music21.instrument.fromString("Piano")
    high_part.insert(0, high_instrument)

    low_part = music21.stream.Part()
    low_part.id = 'Low Voice'
    low_instrument = music21.instrument.fromString("Piano")
    low_part.insert(0, low_instrument)

    for element in parsed.flatten().notes:
        if isinstance(element, music21.note.Note):
            if element.pitch.midi >= 60:
                high_part.append(element)
            else:
                low_part.append(element)
        elif isinstance(element, music21.chord.Chord):
            high_chord = music21.chord.Chord()
            low_chord = music21.chord.Chord()
            for pitch in element.pitches:
                if pitch.midi >= 60:
                    high_chord.add(pitch)
                else:
                    low_chord.add(pitch)
            if len(high_chord) > 0:
                high_part.append(high_chord)
            if len(low_chord) > 0:
                low_part.append(low_chord)

    score = music21.stream.Score()
    score.insert(0, high_part)
    score.insert(0, low_part)

    score.write(fmt='xml', fp=output_file_path)
