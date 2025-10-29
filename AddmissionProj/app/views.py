from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# --- DRF Imports for API ---
from rest_framework import viewsets
# NOTE: Using 'Submission' model name based on the model provided earlier
from .models import Submission  
from .serializers import SubmissionSerializer
# ---------------------------

# --- Existing Function-Based Views (Preserved, but likely deprecated by API) ---

# NOTE: This view handles traditional form submission and file/image uploads 
# from the form you showed. It requires using request.FILES for the files.
def index(request):
    if request.method == 'POST':
        # Standard POST data
        name = request.POST['name']
        stuClass = request.POST['class']
        gender = request.POST['gender']
        # For multiple checkboxes (activities), Django returns a list, 
        # which should be joined for the CharField model field.
        # Use .getlist to handle multiple selected values from checkboxes/multiselect
        activities = ",".join(request.POST.getlist('activities')) 
        
        # File and Image data MUST come from request.FILES
        myImage = request.FILES.get('myImage')
        file = request.FILES.get('file')

        obj = Submission() # Assuming Student model is now Submission
        obj.name = name
        # Ensure 'school_class' matches the field name in your Submission model
        obj.school_class = stuClass 
        obj.gender = gender
        obj.activities = activities
        obj.myImage = myImage
        obj.file = file
        obj.save()
        
        return HttpResponse("<h1>Your entry has been saved</h1>")
    
    return render(request, 'index.html')

@login_required
def list_stu(request):
    # Assuming Student model is now Submission
    obj = Submission.objects.all()
    return render(request, 'list.html', {'obj': obj})

# --- Django REST Framework ViewSet for Next.js Frontend ---

# This class handles all API requests (GET, POST, PATCH, DELETE) 
# to the /api/students/ endpoint from the Next.js frontend.
class SubmissionViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing Submission instances via API.
    """
    # Define which data to retrieve
    queryset = Submission.objects.all().order_by('-id') 
    
    # Define how to convert the model data to JSON and vice-versa
    serializer_class = SubmissionSerializer
