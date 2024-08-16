import os
import sys
import argparse
import librosa

from sound_to_midi import monophonic
from sound_to_midi.monophonic import wave_to_midi
from demucs import separate


input_path = './sample1.mp3'

output_dir = './separate'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

#os.system(f'python -m demucs.separate {input_path} {output_dir}')

os.system(f'demucs --two-stems vocals -n mdx_extra "{input_path}" -o "{output_dir}"')

def wav_to_midi_with_tempo(file_in, midi_file):
    print("Starting...")
    audio_data, srate = librosa.load(file_in, sr=None)
    print("Audio file loaded!")
    midi = wave_to_midi(audio_data, srate=srate)
    print("Conversion finished!")
    with open(midi_file, "wb") as output_file:
        midi.writeFile(output_file)

midi_input = f"{output_dir}/vocal.wav"

wav_to_midi_with_tempo(f"midi_input",f"{output_dir}")
