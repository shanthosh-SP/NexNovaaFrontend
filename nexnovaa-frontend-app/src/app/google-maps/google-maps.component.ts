import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow, MapMarker, MapTrafficLayer, MapTransitLayer } from '@angular/google-maps';

@Component({
  selector: 'app-google-maps',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './google-maps.component.html',
  styleUrl: './google-maps.component.scss'
})
export class GoogleMapsComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 13.0500, lng: 80.2225 };
  vehiclePosition: google.maps.LatLngLiteral = { lat: 13.0702, lng: 80.2170 };
  routePath: google.maps.LatLngLiteral[] = [];
  index = 0;
  zoom: any;
  private intervalId: any;
  zoomInterval: any;
  vehicleIcon = {
    url: 'src/app/assets/vehicle.png',
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 20), // optional: centers the icon
    rotation: 0 // ignored unless using advanced overlays
  };

  ngOnInit() {
    this.zoom = 13;
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: { lat: 13.0702, lng: 80.2170 },
        destination: { lat: 13.0273, lng: 80.2285 },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result?.routes?.length) {
          const route = result.routes[0].overview_path;
          this.routePath = route.map((point) => ({ lat: point.lat(), lng: point.lng() }));

          console.log('Route Path:', this.routePath); // This will show the route

          this.index = 0;
          this.intervalId = setInterval(() => {
            if (this.index < this.routePath.length - 1) {
              this.updateVehiclePosition();
            } else {
              clearInterval(this.intervalId);
            }
          }, 1000); // adjust for speed
        } else {
          console.error('Directions request failed due to', status);
        }
      }
    );
  }

  vehicleRotation = 0;

  updateVehiclePosition() {
    const current = this.routePath[this.index];
    const next = this.routePath[this.index + 1];
    if (next) {
      const angle = this.calculateBearing(current, next);
      this.vehicleIcon = {
        ...this.vehicleIcon,
        rotation: angle
      };
    }
    this.vehiclePosition = current;

    console.log('Vehicle Position:', this.vehiclePosition);  // Log to track position
    this.index++;
  }

  zoomToMarker() {
    this.zoomInterval = setInterval(() => {
      this.center = { lat: this.vehiclePosition.lat, lng: this.vehiclePosition.lng };
      this.zoom = 18;
    }, 300);
  }

  destroyZoom() {
    clearInterval(this.zoomInterval);
  }


  calculateBearing(start: google.maps.LatLngLiteral, end: google.maps.LatLngLiteral): number {
    const lat1 = start.lat * Math.PI / 180;
    const lat2 = end.lat * Math.PI / 180;
    const lngDiff = (end.lng - start.lng) * Math.PI / 180;

    const y = Math.sin(lngDiff) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(lngDiff);
    const angle = Math.atan2(y, x);
    return (angle * 180 / Math.PI + 360) % 360;
  }

}
