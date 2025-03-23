from django.db import models

class Admin(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=256)

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13, unique=True)
    published_date = models.DateField()
    genre = models.CharField(max_length=50)

