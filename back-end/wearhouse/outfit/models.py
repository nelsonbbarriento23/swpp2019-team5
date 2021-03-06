from django.db import models
from user.models import User
from item.models import Item
import datetime
import os
# Create your models here.


class Outfit(models.Model):
    objects = models.Manager()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='outfits_owned_by_user')
    items = models.ManyToManyField(
        Item, related_name='outfits_having_this_item')
    image_link = models.CharField(max_length=255)
    date = models.DateField(null=True)
    dateWithTime = models.CharField(max_length=255, default='', null=True)
    tempAvg = models.IntegerField(default=100, null=True)
    tempIcon = models.CharField(max_length=255, default='')
    satisfaction = models.IntegerField(null=True, blank=True)
