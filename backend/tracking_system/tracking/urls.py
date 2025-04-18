from django.urls import path
from django.views.generic import TemplateView
from .views import vehicle_tracking_sse, get_latest_vehicle_location
from . import views
urlpatterns = [
    path("vehicle-tracking/", views.vehicle_tracking_sse),  # Stream live location
    path("latest-location/", views.get_latest_vehicle_location),  # Fetch latest location
    path("map-tracking/", TemplateView.as_view(template_name="map_tracking.html")),
      path("tracking-map/", views.live_tracking_map, name="tracking-map"),
]