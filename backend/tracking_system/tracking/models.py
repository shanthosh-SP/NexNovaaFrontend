from django.db import models
from django.utils.timezone import now

class VehicleLocation(models.Model):
    vehicle_id = models.CharField(max_length=50)
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField(default=now)
    address = models.CharField(max_length=255, blank=True, null=True)
    contact = models.CharField(max_length=50, blank=True, null=True)
    destination = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=255, blank=True, null=True)

class Stop(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    reached = models.BooleanField(default=False)
    timestamp = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name
