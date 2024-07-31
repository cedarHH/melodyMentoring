import mido
import json


def parse_mid(midi_file: str):
    midi_events = dict()
    mid = mido.MidiFile(midi_file)

    midi_events["ticks_per_beat"] = mid.ticks_per_beat
    midi_events["total_time"] = mid.length
    midi_events["tempo"] = None
    midi_events["time_signature"] = None

    for msg in mid.tracks[0]:
        if msg.type == 'set_tempo':
            midi_events["tempo"] = msg.tempo
        elif msg.type == 'time_signature':
            midi_events["time_signature"] = {
                "numerator": msg.numerator,
                "denominator": msg.denominator,
            }

    midi_events["performance_info"] = []
    for i, track in enumerate(mid.tracks):  # enumerate()：
        if i == 1:
            absolute_time = 0
            note_on_index = dict()
            for msg in track:
                absolute_time += msg.time
                if msg.type == 'note_on' and msg.velocity > 0:
                    midi_events["performance_info"].append({
                        "note": msg.note,
                        "velocity_on": msg.velocity,
                        "start_time": absolute_time,
                        "duration": None
                    })
                    note_on_index[msg.note] = len(midi_events["performance_info"]) - 1
                elif msg.type == 'note_off' or (msg.type == 'note_on' and msg.velocity == 0):
                    if msg.note in note_on_index:
                        note_index = note_on_index.pop(msg.note)
                        midi_events["performance_info"][note_index]["duration"] = absolute_time-midi_events["performance_info"][note_index]["start_time"]
    # Duration of the sixty-fourth note
    threshold = midi_events["ticks_per_beat"]*midi_events["time_signature"]["denominator"]//64-1
    midi_events["performance_info"] = [
        note for note in midi_events["performance_info"] if note["duration"] >= threshold
    ]
    return midi_events


def write2json(midiData, json_file):
    midiJsonData = json.dumps(midiData, indent=4, ensure_ascii=False, sort_keys=False)
    with open(json_file, 'w', encoding='utf-8') as file:
        file.write(midiJsonData)


def write2txt(midiEvents, txt_file):
    with open(txt_file, 'w') as file:
        for item in midiEvents:
            file.write(f"{item}\n")

