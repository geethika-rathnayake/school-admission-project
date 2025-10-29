# app/api_views.py

from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

# ----- DRF API views -----
@api_view(["GET"])
@permission_classes([AllowAny])
def public_info(request):
    """Public API endpoint"""
    return Response({"msg": "Hello from Django API (public)"})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    """Return the currently logged-in user's username"""
    return Response({"username": request.user.username})

# ----- Plain Django JSON view -----
def list_students(request):
    """Return a list of students as JSON"""
    students = [
        {"id": 1, "name": "Alice"},
        {"id": 2, "name": "Bob"},
        {"id": 3, "name": "Charlie"}
    ]
    return JsonResponse(students, safe=False)

# ----- DRF POST API view to create a student -----
@api_view(["POST"])
@permission_classes([AllowAny])  # Change to IsAuthenticated if needed
def create_student(request):
    """
    Create a new student (dummy example).
    Expects JSON body with "name".
    """
    data = request.data
    name = data.get("name")
    if not name:
        return Response({"error": "Name is required"}, status=400)
    
    # In a real app, you would save to the database
    student = {"id": 4, "name": name}  # Dummy ID
    return Response({"msg": "Student created", "student": student})
