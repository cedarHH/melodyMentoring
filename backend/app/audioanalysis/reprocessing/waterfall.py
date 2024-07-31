import matplotlib.pyplot as plt
import parse

def midi_to_note_name(midi_number):
    note_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    octave = midi_number // 12 - 1
    note = note_names[midi_number % 12]
    return f"{note}{octave}"


def waterfall(midi_events: dict, output_file_path: str):

    notes = [note_event["note"] for note_event in midi_events["performance_info"]]
    start_times = [note_event["start_time"] for note_event in midi_events["performance_info"]]
    durations = [note_event["duration"] for note_event in midi_events["performance_info"]]

    note_labels = [midi_to_note_name(note) for note in notes]

    fig, ax = plt.subplots(figsize=(12, 6))
    ax.barh(notes, durations, left=start_times, height=0.5, color='skyblue')

    ax.set_yticks(notes)
    ax.set_yticklabels(note_labels)

    ax.set_xlabel('Time')
    ax.set_ylabel('MIDI Note')
    ax.set_title('MIDI Note Waterfall Plot')
    ax.invert_yaxis()

    plt.savefig(output_file_path)

if __name__ == "__main__":

    midi_events = parse.parse_mid(
        midi_file="data/data1_1.mid"
    )
    print(midi_events)
    waterfall(
        midi_events=midi_events,
        output_file_path="test.png"
    )