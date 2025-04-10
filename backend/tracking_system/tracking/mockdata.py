import os
import sys
import django
import time
import requests
from geopy.distance import geodesic

# --- SETUP DJANGO ENV ---
PROJECT_PATH = "/mnt/d/All_Demos/nexathon-4o/tracking_system"
sys.path.append(PROJECT_PATH)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tracking_system.settings")
django.setup()

# --- IMPORT MODELS & WHATSAPP BOT ---
from tracking.models import VehicleLocation
from tracking.whatsapp_bot import send_whatsapp_message

# --- MOCK DATA CONFIG ---
start_location = (10.7905, 78.7047)  # Trichy
end_location = (34.0837, 74.7973)    # Kashmir
vehicle_id = "V123"
checkpoint_distance = 100  # Send WhatsApp notification every 100KM

# Waypoints based on actual road distance
waypoints = [
    (17.3850, 78.4867, "Hyderabad", 600),
    (21.1458, 79.0882, "Nagpur", 1200),
    (23.2599, 77.4126, "Bhopal", 1600),
    (28.6139, 77.2090, "Delhi", 2200),
    (32.7266, 74.8570, "Jammu", 2600),
    (34.0837, 74.7973, "Kashmir", 3000)
]

# --- SIMULATION FUNCTION ---
def send_mock_data():
    current_location = list(start_location)
    total_distance = geodesic(start_location, end_location).km
    distance_traveled = 0
    checkpoint_reached = 0
    current_destination = "Hyderabad"  # First destination

    lat_step = (end_location[0] - start_location[0]) / (total_distance / 10)
    lon_step = (end_location[1] - start_location[1]) / (total_distance / 10)

    while distance_traveled < total_distance:
        current_location[0] += lat_step
        current_location[1] += lon_step
        distance_traveled = geodesic(start_location, tuple(current_location)).km

        # Update destination based on distance
        for lat, lon, city, dist in waypoints:
            if distance_traveled >= dist:
                current_destination = city

        # Save to DB
        VehicleLocation.objects.create(
            vehicle_id=vehicle_id,
            latitude=round(current_location[0], 6),
            longitude=round(current_location[1], 6),
            destination=current_destination,
            status="in transit"
        )

        # Post to update-vehicle-location API
        requests.get("http://127.0.0.1:8000/latest-location/", json={
            "vehicle_id": vehicle_id,
            "latitude": round(current_location[0], 6),
            "longitude": round(current_location[1], 6),
            "destination": current_destination,
            "status": "in transit",
        })

        # WhatsApp Notification every 100KM
        if int(distance_traveled // checkpoint_distance) > checkpoint_reached:
            checkpoint_reached += 1
            message = f"🚛 Vehicle {vehicle_id} has traveled {int(distance_traveled)} KM, Now Heading to {current_destination}"
            print(f"📨 Sending WhatsApp: {message}")
            send_whatsapp_message(message)  # << SEND NOTIFICATION

        time.sleep(2)

if __name__ == "__main__":
    send_mock_data()