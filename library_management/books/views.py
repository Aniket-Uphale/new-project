from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework import status
from .models import Admin, Book
from .serializers import BookSerializer
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication


# Admin Signup
class AdminSignup(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if User.objects.filter(email=email).exists():
            return Response({"message": "Admin already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(
            username=email,  # Django requires a username field
            email=email,
            password=make_password(password),
            is_staff=True  # Mark as admin
        )
        return Response({"message": "Admin created successfully"}, status=status.HTTP_201_CREATED)

# Admin Login
class AdminLogin(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        if check_password(password, user.password):
            token, _ = Token.objects.get_or_create(user=user)  # Generate Token
            return Response({
                "message": "Login successful",
                "token": token.key
            })
        else:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
# CRUD Operations for Books
class CreateBook(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateBook(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request, book_id):
        # Ensure the user is an admin
        if not request.user.is_staff:
            return Response({"message": "You do not have permission to update this book."}, status=status.HTTP_403_FORBIDDEN)

        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            return Response({"message": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteBook(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, book_id):
        # Ensure the user is an admin
        if not request.user.is_staff:
            return Response({"message": "You do not have permission to delete this book."}, status=status.HTTP_403_FORBIDDEN)

        try:
            book = Book.objects.get(id=book_id)
            book.delete()
            return Response({"message": "Book deleted successfully"})
        except Book.DoesNotExist:
            return Response({"message": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

class RetrieveBooks(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        books = Book.objects.all()
        if not books:
            return Response({"message": "No books found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
