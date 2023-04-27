from django.contrib import admin
from .models import User, Company, Workout, Routine, WorkoutRoutine

models = [User, Company, Workout, Routine, WorkoutRoutine]

for model in models:
    admin.site.register(model)


