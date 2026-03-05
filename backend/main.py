import os
from datetime import datetime

import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

load_dotenv()

NASA_API_KEY = os.getenv("NASA_API_KEY")
APOD_URL = "https://api.nasa.gov/planetary/apod"

app = FastAPI(title="NASA APOD - Data de Nascimento")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/apod")
def get_apod_by_date(date: str):
    """
    Retorna os dados da APOD para a data informada (YYYY-MM-DD).
    """
    if not NASA_API_KEY:
        raise HTTPException(status_code=500, detail="NASA_API_KEY não configurada no .env")

    try:
        birth_date = datetime.strptime(date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Data inválida. Use o formato YYYY-MM-DD.")

    params = {
        "api_key": NASA_API_KEY,
        "date": birth_date.isoformat(),
    }

    try:
        response = requests.get(APOD_URL, params=params, timeout=10)
    except requests.RequestException:
        raise HTTPException(status_code=502, detail="Erro ao conectar na API da NASA.")

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=f"Erro da API da NASA: {response.text}",
        )

    data = response.json()

    return JSONResponse(
        {
            "date": data.get("date"),
            "title": data.get("title"),
            "explanation": data.get("explanation"),
            "media_type": data.get("media_type"),
            "url": data.get("url"),
            "hdurl": data.get("hdurl"),
        }
    )


@app.get("/")
def health():
    return {"status": "ok"}

