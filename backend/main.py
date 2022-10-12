from fastapi import FastAPI
from opensky_api import OpenSkyApi
from dotenv import load_dotenv
import os

load_dotenv()
OPENSKY_USER = os.environ.get("OPENSKY_USER")
OPENSKY_PASSWORD = os.environ.get("OPENSKY_PASSWORD")

app = FastAPI()

@app.get("/")
async def root(lon: float, lat: float, range: float = 0.25):
    api = OpenSkyApi(username = OPENSKY_USER, password = OPENSKY_PASSWORD)
    xmin = lat - range
    xmax = lat + range
    ymin = lon - range
    ymax = lon + range
    res = api.get_states(bbox=(xmin, xmax, ymin, ymax))
    if res is not None:
        return res.states
    return None