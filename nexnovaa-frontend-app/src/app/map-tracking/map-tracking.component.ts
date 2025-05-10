import { Component, OnInit } from '@angular/core';
import { OlaMaps } from 'olamaps-web-sdk'
@Component({
  selector: 'app-map-tracking',
  standalone: true,
  imports: [],
  templateUrl: './map-tracking.component.html',
  styleUrls: ['./map-tracking.component.scss'],
})
export class MapTrackingComponent implements OnInit {
  public olaMaps: any;

  ngOnInit(): void {
    this.olaMaps = new OlaMaps({
      apiKey: 'CiZ4vWwhR870SlqO3leTr9W9YG8XBKHKZotfvRdy'
    });
    this.initializeMap();
  }

  initializeMap() {
    try {
      let myMap = this.olaMaps.init({
        style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
        container: 'map',
        center: [77.61648476788898, 12.931423492103944],
        zoom: 15,
      });

      let olaIcon = document.createElement('div')
      olaIcon.classList.add('olalogo')

      this.olaMaps
        .addMarker({ element: olaIcon, offset: [0, -10], anchor: 'top' })
        .setLngLat([77.61648476788898, 12.931423492103944])
        .addTo(myMap)

      this.olaMaps
        .addMarker({ offset: [0, 6], anchor: 'top' })
        .setLngLat([77.61248476788898, 12.934223492103444])
        .addTo(myMap)

      const popup = this.olaMaps.addPopup({ offset: [0, -30], anchor: 'bottom' }).setHTML('<div>This is a simple Popup</div>')

      this.olaMaps
        .addMarker({
          offset: [0, 6],
          anchor: 'bottom',
          color: 'red',
          draggable: false,
        })
        .setLngLat([77.6196390456908, 12.93321052215299])
        .setPopup(popup)
        .addTo(myMap)
    } catch (e) {
      console.warn(e);
    }

  }

}
