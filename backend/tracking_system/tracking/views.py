from django.http import StreamingHttpResponse, JsonResponse
from django.views.decorators.http import require_GET
from django.views.decorators.csrf import csrf_exempt
import json
import time
from .models import VehicleLocation
from django.shortcuts import render

def vehicle_stream():
    """Streams real-time vehicle GPS coordinates from DB."""
    while True:
        latest_location = VehicleLocation.objects.latest("timestamp")
        
        # Get total distance from DB
        all_locations = VehicleLocation.objects.all().order_by("timestamp")
        total_distance = 0
        prev_location = None
        
        from geopy.distance import geodesic
        for loc in all_locations:
            if prev_location:
                total_distance += geodesic(
                    (prev_location.latitude, prev_location.longitude),
                    (loc.latitude, loc.longitude)
                ).km
            prev_location = loc

        data = {
            "vehicle_id": latest_location.vehicle_id,
            "latitude": latest_location.latitude,
            "longitude": latest_location.longitude,
            "total_distance": round(total_distance, 2),
            "timestamp": latest_location.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        }
        yield f"data: {json.dumps(data)}\n\n"
        time.sleep(2)  # Update every 2 seconds

@require_GET
def vehicle_tracking_sse(request):
    """SSE endpoint for live vehicle tracking."""
    response = StreamingHttpResponse(vehicle_stream(), content_type="text/event-stream")
    del response["Connection"]  # Fix the error
    response["Cache-Control"] = "no-cache"
    return response


def live_tracking_map(request):
    return render(request, "tracking_map.html")


@require_GET
@csrf_exempt
def get_latest_vehicle_location(request):
    """Returns the latest vehicle location as JSON."""
    try:
        latest_location = VehicleLocation.objects.latest("timestamp")
        return JsonResponse({
            "vehicle_id": latest_location.vehicle_id,
            "latitude": latest_location.latitude,
            "longitude": latest_location.longitude,
            "timestamp": latest_location.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
            "destination": latest_location.destination,
            "status": latest_location.status
        })
    except VehicleLocation.DoesNotExist:
        return JsonResponse({"error": "No location data available"}, status=404)
