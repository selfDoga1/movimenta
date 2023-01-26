# Generated by Django 4.1.5 on 2023-01-25 19:07

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_user_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(blank=True, storage=api.models.OverwriteStorage(), upload_to='api/media/uploads/avatar'),
        ),
    ]