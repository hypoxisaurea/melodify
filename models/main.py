import os
import uuid
import librosa
import uvicorn
import numpy as np
from fastapi import FastAPI, UploadFile, HTTPException, File
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from music21 import converter, environment
from sound_to_midi.monophonic import wave_to_midi

env = environment.Environment()
env['lilypondPath'] = r'D:\Program Files\lilypond-2.24.4\bin\lilypond.exe'

app = FastAPI()

origins = [
    "http://localhost:8000", 
    "http://localhost:3000", 
    "*", 
    "https://euphonious-mandazi-f8bbaf.netlify.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def wav_to_midi_with_tempo(file_in, midi_output_path):
    print("Loading WAV file...")
    audio_data, srate = librosa.load(file_in, sr=None)
    print("WAV file loaded.")

    print("Converting pitch to MIDI...")
    midi = wave_to_midi(audio_data, srate=srate)
    print("MIDI conversion complete.")

    with open(midi_output_path, "wb") as output_file:
        print("Saving MIDI file...")
        midi.writeFile(output_file)
        print("MIDI file saved.")

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    print("File upload request received...")
    file_id = str(uuid.uuid4())
    print(f"Generated file ID: {file_id}")

    temp_dir = os.path.join("output_files", file_id)
    os.makedirs(temp_dir, exist_ok=True)

    temp_audio_path = os.path.join(temp_dir, "input.wav")
    midi_output_path = os.path.join(temp_dir, "output.mid")

    print("Saving uploaded file to temporary path...")
    with open(temp_audio_path, "wb") as temp_audio:
        temp_audio.write(await file.read())
    print("File saved.")

    print("Converting WAV to MIDI...")
    wav_to_midi_with_tempo(temp_audio_path, midi_output_path)
    print("WAV to MIDI conversion complete.")

    return JSONResponse(content={"file_id": file_id, "midi_url": f"/output/{file_id}/midi"})

@app.get("/output/{file_id}/midi")
async def get_output_midi(file_id: str):
    print(f"MIDI file request received: file ID = {file_id}")
    output_dir = os.path.join("output_files", file_id)
    midi_file_path = os.path.join(output_dir, "output.mid")

    if not os.path.exists(midi_file_path):
        print("MIDI file not found.")
        return JSONResponse(content={"error": "File not found"}, status_code=404)

    print("MIDI file found. Returning file.")
    return FileResponse(midi_file_path, filename="output.mid", media_type="audio/midi")

if __name__ == "__main__":
    print("Starting server...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    print("Server started.")