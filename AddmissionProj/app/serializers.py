# app/serializers.py
from rest_framework import serializers
from .models import Submission # Make sure this matches your model name

class SubmissionSerializer(serializers.ModelSerializer):
    # This automatically includes all the fields defined in your Submission model:
    # id, name, school_class, gender, activities, myImage, file, status, date_submitted
    
    class Meta:
        model = Submission
        # '__all__' is the simplest way to include every field.
        fields = '__all__'