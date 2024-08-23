import os
import librosa
import uvicorn
import uuid
import subprocess
import numpy as np

from fastapi import FastAPI, UploadFile, HTTPException, File
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from music21 import converter, environment
from PIL import Image
from pdf2image import convert_from_path
from sound_to_midi.monophonic import wave_to_midi

env = environment.Environment()
env['lilypondPath'] = r'D:\Program Files\lilypond-2.24.4\bin\lilypond.exe'
app = FastAPI()

origins = [
    "http://localhost:8000", 
    "http://localhost:3000", 
    "*", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WAV를 MIDI로 변환하는 함수
def wav_to_midi_with_tempo(file_in, midi_output_path):
    print("WAV 파일을 로드하는 중...")  # 로그 출력
    audio_data, srate = librosa.load(file_in, sr=None)
    print("WAV 파일 로드 완료.")  # 로그 출력

    print("음고를 추출하여 MIDI로 변환 중...")  # 로그 출력
    midi = wave_to_midi(audio_data, srate=srate)
    print("MIDI 변환 완료.")  # 로그 출력

    with open(midi_output_path, "wb") as output_file:
        print("MIDI 파일을 저장 중...")  # 로그 출력
        midi.writeFile(output_file)
        print("MIDI 파일 저장 완료.")  # 로그 출력

# MIDI를 PDF로 변환하는 함수
def midi_to_pdf(midi_path, pdf_output_path):
    try:
        print("MIDI 파일을 music21 객체로 변환 중...")  # 로그 출력
        midi_data = converter.parse(midi_path)
        print("MIDI 변환 완료.")  # 로그 출력

        # PDF 파일 경로 지정
        pdf_file_path = f"{pdf_output_path}.pdf"

        print("악보를 PDF로 저장 중...")  # 로그 출력
        midi_data.write('lily.pdf', fp=pdf_file_path)
        print(f"PDF 파일이 저장되었습니다: {pdf_file_path}")  # 로그 출력
        
        # PDF가 생성되었는지 확인
        if not os.path.exists(pdf_file_path):
            raise HTTPException(status_code=500, detail="PDF file not created.")
    except Exception as e:
        print(f"MIDI를 PDF로 변환하는 동안 오류 발생: {e}")  # 로그 출력
        raise HTTPException(status_code=500, detail="MIDI to PDF conversion failed")

# PDF를 PNG로 변환하는 함수
def pdf_to_png(pdf_path, png_output_path):
    try:
        print("PDF 파일을 PNG로 변환 중...")  # 로그 출력
        images = convert_from_path(pdf_path, poppler_path=r'D:\Program Files\poppler-24.07.0\Library\bin')
        if images:
            png_file_path = f"{png_output_path}.png"
            images[0].save(png_file_path, 'PNG')
            print(f"PNG 파일이 저장되었습니다: {png_file_path}")  # 로그 출력
        else:
            raise HTTPException(status_code=500, detail="No images found in PDF.")
    except Exception as e:
        print(f"PDF를 PNG로 변환하는 동안 오류 발생: {e}")  # 로그 출력
        raise HTTPException(status_code=500, detail="PDF to PNG conversion failed")

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    print("파일 업로드 요청 수신...")  # 로그 출력
    file_id = str(uuid.uuid4())  # 고유한 파일 ID 생성
    print(f"생성된 파일 ID: {file_id}")  # 로그 출력

    temp_dir = os.path.join("output_files", file_id)
    os.makedirs(temp_dir, exist_ok=True)

    temp_audio_path = os.path.join(temp_dir, "input.wav")
    midi_output_path = os.path.join(temp_dir, "output.mid")
    pdf_output_path = os.path.join(temp_dir, "output")

    print("업로드된 파일을 임시 경로에 저장 중...")  # 로그 출력
    with open(temp_audio_path, "wb") as temp_audio:
        temp_audio.write(await file.read())
    print("파일 저장 완료.")  # 로그 출력

    print("WAV를 MIDI로 변환 중...")  # 로그 출력
    wav_to_midi_with_tempo(temp_audio_path, midi_output_path)
    print("WAV에서 MIDI로 변환 완료.")  # 로그 출력

    print("MIDI를 PDF로 변환 중...")  # 로그 출력
    midi_to_pdf(midi_output_path, pdf_output_path)
    print("MIDI에서 PDF로 변환 완료.")  # 로그 출력

    print("PDF를 PNG로 변환 중...")  # 로그 출력
    pdf_to_png(f"{pdf_output_path}.pdf", pdf_output_path)
    print("PDF에서 PNG로 변환 완료.")  # 로그 출력

    return JSONResponse(content={"file_id": file_id})

@app.get("/output/{file_id}/png")
async def get_output_png(file_id: str):
    print(f"PNG 파일 요청 수신: 파일 ID = {file_id}")  # 로그 출력
    output_dir = os.path.join("output_files", file_id)
    png_file_path = os.path.join(output_dir, "output.png")

    if not os.path.exists(png_file_path):
        print("PNG 파일을 찾을 수 없습니다.")  # 로그 출력
        return JSONResponse(content={"error": "File not found"}, status_code=404)

    print("PNG 파일을 찾았습니다. 파일을 반환합니다.")  # 로그 출력
    return FileResponse(png_file_path, filename="output.png", media_type="image/png")

if __name__ == "__main__":
    print("서버 시작 중...")  # 로그 출력
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    print("서버가 시작되었습니다.")  # 로그 출력