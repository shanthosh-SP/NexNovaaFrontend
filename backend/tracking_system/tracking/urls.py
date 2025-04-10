from django.urls import path

from .views import vehicle_tracking_sse, get_latest_vehicle_location

urlpatterns = [
    path("vehicle-tracking/", vehicle_tracking_sse),  # Stream live location
    path("latest-location/", get_latest_vehicle_location),  # Fetch latest location
]