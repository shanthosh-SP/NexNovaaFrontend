import { Component } from '@angular/core';
import { MapTrackingComponent } from "../map-tracking/map-tracking.component";
import { ProgressChartComponent } from "../charts/progress-chart/progress-chart.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MapTrackingComponent, ProgressChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
}
