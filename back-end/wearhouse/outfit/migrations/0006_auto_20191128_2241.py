# Generated by Django 2.2.6 on 2019-11-28 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('outfit', '0005_auto_20191125_1247'),
    ]

    operations = [
        migrations.AlterField(
            model_name='outfit',
            name='items',
            field=models.ManyToManyField(related_name='outfits_having_this_item', to='item.Item'),
        ),
    ]