from django.contrib import admin
from.models import Submission

# Register your models here.
@admin.register(Submission)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('name','stuClass','gender','activities','myImage','file')