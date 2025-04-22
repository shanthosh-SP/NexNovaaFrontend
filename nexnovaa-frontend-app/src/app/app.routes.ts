import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MapTrackingComponent } from './map-tracking/map-tracking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrackingListComponent } from './tracking-list/tracking-list.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        children:[
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'vehicle-tracking',
                component: MapTrackingComponent
            },
            {
                path: 'tracking-list',
                component: TrackingListComponent
            },
        ]
    },
   
];
