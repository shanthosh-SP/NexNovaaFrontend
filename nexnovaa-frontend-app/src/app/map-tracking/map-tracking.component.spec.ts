import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTrackingComponent } from './map-tracking.component';

describe('MapTrackingComponent', () => {
  let component: MapTrackingComponent;
  let fixture: ComponentFixture<MapTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
