FROM python:3.7-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y ffmpeg git wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir virtualenv

RUN python -m venv .venv

RUN .venv/bin/pip install --upgrade pip

COPY . .

RUN mkdir -p /app/tempFile

RUN mkdir -p /root/piano_transcription_inference_data
COPY ../../data/piano_transcription_inference_data/note_F1=0.9677_pedal_F1=0.9186.pth /root/piano_transcription_inference_data/

RUN .venv/bin/pip install --no-cache-dir openai==0.28 \
    && .venv/bin/pip install --no-cache-dir torch==1.4.0 \
    && .venv/bin/pip install --no-cache-dir pydub \
    && .venv/bin/pip install --no-cache-dir music21 \
    && .venv/bin/pip install --no-cache-dir mido \
    && .venv/bin/pip install --no-cache-dir matplotlib \
    && .venv/bin/pip install --no-cache-dir requests \
    && .venv/bin/pip install --no-cache-dir pika \
    && .venv/bin/pip install --no-cache-dir pyyaml \
    && .venv/bin/pip install --no-cache-dir piano_transcription_inference \
    && .venv/bin/pip install --no-cache-dir librosa==0.9.2

ENV PATH="/app/.venv/bin:$PATH"

CMD ["python", "consumer.py"]
