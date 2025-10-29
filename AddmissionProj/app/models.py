from django.db import models

# Create your models here.
class Submission(models.Model):
    name=models.CharField(max_length=100)
    stuClass=models.TextField()
    gender=models.CharField(max_length=50)
    activities = models.TextField(blank=True)  # store selected activities as comma-separated string

    def __str__(self):
        return self.name
    
    myImage = models.ImageField(upload_to='images/', blank=True, null=True)

    def __str__(self):
        return self.name
    
    file = models.FileField(upload_to='documents/', blank=True, null=True)

    def __str__(self):
        return self.name