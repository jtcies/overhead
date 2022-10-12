from fastapi import FastAPI
from opensky_api import OpenSkyApi
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
OPENSKY_USER = os.environ.get("OPENSKY_USER")
OPENSKY_PASSWORD = os.environ.get("OPENSKY_PASSWORD")

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root(lon: float, lat: float, range: float = 0.25):
    api = OpenSkyApi(username = OPENSKY_USER, password = OPENSKY_PASSWORD)
    ymin = lat - range
    ymax = lat + range
    xmin = lon - range
    xmax = lon + range
    res = api.get_states(bbox=(ymin, ymax, xmin, xmax))
    if res is not None:
        return res.states
    return None