# Generated by Django 4.1.5 on 2023-04-04 02:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_remove_routine_name_alter_workout_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='routine',
            name='workout',
        ),
        migrations.AddField(
            model_name='routine',
            name='name',
            field=models.CharField(blank=True, default='', max_length=64, unique=True),
        ),
    ]