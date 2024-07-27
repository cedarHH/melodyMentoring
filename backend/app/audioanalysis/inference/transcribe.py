import os
import argparse
import torch
import time

from piano_transcription_inference import PianoTranscription, sample_rate, load_audio


def inference(args):
    """Inference templates.

    Args:
      model_type: str
      audio_path: str
      cuda: bool
    """

    # Arugments & parameters
    audio_path = args.audio_path
    output_midi_path = args.output_midi_path
    device = 'cuda' if args.cuda and torch.cuda.is_available() else 'cpu'

    # Load audio
    (audio, _) = load_audio(audio_path, sr=sample_rate, mono=True)

    # Transcriptor
    transcriptor = PianoTranscription(device=device, checkpoint_path=None)
    """device: 'cuda' | 'cpu'
    checkpoint_path: None for default path, or str for downloaded checkpoint path.
    """

    # Transcribe and write out to MIDI file
    transcribe_time = time.time()
    transcribed_dict = transcriptor.transcribe(audio, output_midi_path)
    print('Transcribe time: {:.3f} s'.format(time.time() - transcribe_time))

def parse_arguments(audio_path, output_midi_path, cuda=False):
    class Args:
        def __init__(self, audio_path, output_midi_path, cuda):
            self.audio_path = audio_path
            self.output_midi_path = output_midi_path
            self.cuda = cuda

    return Args(audio_path, output_midi_path, cuda)

def transcribe(intput_file_path:str, output_file_path:str):
    args = parse_arguments(intput_file_path, output_file_path, cuda=True)
    inference(args)

if __name__ == '__main__':
    transcribe(
        intput_file_path="../data/unravel.mp3",
        output_file_path="../data/unravel.mid"
    )