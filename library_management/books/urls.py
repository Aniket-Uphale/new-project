from django.urls import path
from . import views

urlpatterns = [
    path('admin/signup/', views.AdminSignup.as_view(), name='admin_signup'),
    path('admin/login/', views.AdminLogin.as_view(), name='admin_login'),
    path('books/create/', views.CreateBook.as_view(), name='create_book'),
    path('books/update/<int:book_id>/', views.UpdateBook.as_view(), name='update_book'),
    path('books/delete/<int:book_id>/', views.DeleteBook.as_view(), name='delete_book'),
    path('books/', views.RetrieveBooks.as_view(), name='retrieve_books'),
]
