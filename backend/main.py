"""
AI-Powered Smart City Traffic & Emergency Response System
Backend API (FastAPI)

Run with:
    pip install -r requirements.txt
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import time

app = FastAPI(
    title="Smart City Traffic AI API",
    description="Edge AI traffic monitoring, signal optimization, and emergency vehicle preemption backend.",
    version="2.4.0"
)

# Enable CORS for local React/Vite development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Schemas
class DirectionSignal(BaseModel):
    direction: str
    vehicleCount: int
    density: int
    signal: str
    remainingTime: int
    waitingQueue: int

class Junction(BaseModel):
    id: str
    name: str
    density: int
    status: str
    vehicleCount: int
    roadNames: str
    coordinates: dict
    signals: List[DirectionSignal]

class EmergencyVehiclePayload(BaseModel):
    active: bool
    vehicleId: str
    status: str
    targetJunctionId: Optional[str] = None
    etaSeconds: Optional[int] = 45

class SignalOptimizePayload(BaseModel):
    junctionId: str
    action: str

# Seed in-memory store
JUNCTIONS_STORE = [
    {
        "id": "j1",
        "name": "Junction 1 - Grand Central Blvd",
        "density": 82,
        "status": "HIGH",
        "vehicleCount": 128,
        "roadNames": "Lexington Ave & Grand Cross",
        "coordinates": {"x": 28, "y": 35},
        "signals": [
            {"direction": "North", "vehicleCount": 48, "density": 72, "signal": "GREEN", "remainingTime": 35, "waitingQueue": 14},
            {"direction": "South", "vehicleCount": 28, "density": 42, "signal": "RED", "remainingTime": 18, "waitingQueue": 8},
            {"direction": "East", "vehicleCount": 16, "density": 25, "signal": "RED", "remainingTime": 22, "waitingQueue": 4},
            {"direction": "West", "vehicleCount": 36, "density": 61, "signal": "RED", "remainingTime": 15, "waitingQueue": 11},
        ],
    },
    {
        "id": "j2",
        "name": "Junction 2 - Cyber Tech Corridor",
        "density": 56,
        "status": "MEDIUM",
        "vehicleCount": 74,
        "roadNames": "Silicon Way & Innovation Hwy",
        "coordinates": {"x": 55, "y": 25},
        "signals": [
            {"direction": "North", "vehicleCount": 22, "density": 44, "signal": "RED", "remainingTime": 12, "waitingQueue": 5},
            {"direction": "South", "vehicleCount": 31, "density": 62, "signal": "GREEN", "remainingTime": 28, "waitingQueue": 7},
            {"direction": "East", "vehicleCount": 12, "density": 28, "signal": "RED", "remainingTime": 25, "waitingQueue": 3},
            {"direction": "West", "vehicleCount": 9, "density": 19, "signal": "RED", "remainingTime": 30, "waitingQueue": 2},
        ],
    },
    {
        "id": "j3",
        "name": "Junction 3 - Metro Transit Interchange",
        "density": 24,
        "status": "LOW",
        "vehicleCount": 38,
        "roadNames": "Station Square & 4th Ave",
        "coordinates": {"x": 42, "y": 68},
        "signals": [
            {"direction": "North", "vehicleCount": 10, "density": 21, "signal": "RED", "remainingTime": 15, "waitingQueue": 2},
            {"direction": "South", "vehicleCount": 8, "density": 18, "signal": "RED", "remainingTime": 20, "waitingQueue": 1},
            {"direction": "East", "vehicleCount": 12, "density": 24, "signal": "GREEN", "remainingTime": 40, "waitingQueue": 3},
            {"direction": "West", "vehicleCount": 8, "density": 16, "signal": "RED", "remainingTime": 35, "waitingQueue": 2},
        ],
    },
    {
        "id": "j4",
        "name": "Junction 4 - Harbor Gateway",
        "density": 73,
        "status": "HIGH",
        "vehicleCount": 110,
        "roadNames": "Docklands Ring Rd & Express West",
        "coordinates": {"x": 75, "y": 58},
        "signals": [
            {"direction": "North", "vehicleCount": 35, "density": 68, "signal": "RED", "remainingTime": 14, "waitingQueue": 9},
            {"direction": "South", "vehicleCount": 39, "density": 75, "signal": "GREEN", "remainingTime": 30, "waitingQueue": 12},
            {"direction": "East", "vehicleCount": 18, "density": 36, "signal": "RED", "remainingTime": 22, "waitingQueue": 4},
            {"direction": "West", "vehicleCount": 18, "density": 38, "signal": "RED", "remainingTime": 20, "waitingQueue": 5},
        ],
    },
]

# 1. GET /traffic-data
@app.get("/traffic-data")
def get_traffic_data():
    return {
        "totalVehicles": 128,
        "averageDensity": 68,
        "activeJunctions": len(JUNCTIONS_STORE),
        "activeAlerts": 3,
        "currentDensity": 78,
        "densityStatus": "HIGH TRAFFIC",
        "timestamp": time.time()
    }

# 2. GET /vehicle-detection
@app.get("/vehicle-detection")
def get_vehicle_detection():
    return {
        "cars": 45,
        "motorcycles": 28,
        "buses": 8,
        "trucks": 12,
        "totalVehicles": 93,
        "confidence": 96.4,
        "model": "YOLOv8x-Custom-Traffic-FP16",
        "fps": 29.8
    }

# 3. GET /junction-status
@app.get("/junction-status")
def get_junction_status():
    return JUNCTIONS_STORE

# 4. POST /emergency-vehicle
@app.post("/emergency-vehicle")
def update_emergency_vehicle(payload: EmergencyVehiclePayload):
    return {
        "success": True,
        "active": payload.active,
        "vehicleId": payload.vehicleId,
        "status": payload.status,
        "nextJunction": "Junction 3",
        "etaSeconds": payload.etaSeconds or 45,
        "clearedCorridor": True
    }

# 5. POST /signal-control
@app.post("/signal-control")
def signal_control(payload: SignalOptimizePayload):
    return {
        "success": True,
        "junctionId": payload.junctionId,
        "message": f"AI timing allocation optimized for {payload.junctionId}. Green wave synchronised.",
        "adjustedPhaseSeconds": {"North": 45, "South": 25, "East": 20, "West": 30}
    }

# 6. GET /alerts
@app.get("/alerts")
def get_alerts():
    return [
        {"id": "alt-1", "type": "HIGH_TRAFFIC", "level": "red", "title": "High Congestion Alert", "message": "High traffic detected at Junction 1 - Density 82%", "timestamp": "2 mins ago", "junctionId": "j1", "read": False},
        {"id": "alt-2", "type": "TRAFFIC_UPDATE", "level": "yellow", "title": "Density Surge Warning", "message": "Traffic increasing at Junction 4 - Density risen by 14%", "timestamp": "5 mins ago", "junctionId": "j4", "read": False},
        {"id": "alt-3", "type": "EMERGENCY", "level": "red", "title": "Emergency Vehicle Approaching", "message": "Ambulance 01 approaching Junction 3. Green corridor ready.", "timestamp": "7 mins ago", "junctionId": "j3", "read": False},
        {"id": "alt-4", "type": "NORMALIZED", "level": "green", "title": "Traffic Normalized", "message": "Traffic flow normalized at Junction 2 - Avg speed 44 km/h", "timestamp": "14 mins ago", "junctionId": "j2", "read": True},
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
