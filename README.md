# Library Management System

This project is a **Library Management System** developed using **Django (backend)** and **React.js (frontend)**.

---

##  Features

-  **User Authentication** (Admin Signup & Login)
-  **Book Management**: Add, update, delete books

---

##  Installation Guide

### Clone the Repository
```bash
git clone https://github.com/Aniket-Uphale/new-project.git
cd new-project
```

---

### Backend Setup (Django)

#### 🔹 Navigate to the backend folder
```bash
cd library_management
../ venv/Scripts/Activate
```

#### 🔹 Install dependencies
```bash
pip install -r requirements.txt
```

#### 🔹 Configure MySQL database
Open the `settings.py` file in the Django project and update the `DATABASES` section:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'library_db',  # Change this to your database name
        'USER': 'your_mysql_user',
        'PASSWORD': 'your_mysql_password',
        'HOST': 'localhost',  # Change if MySQL is hosted elsewhere
        'PORT': '3306',
    }
}
```

#### 🔹 Apply Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

#### 🔹 Run the Django Server
```bash
python manage.py runserver
```

🔗 **Admin Panel**: Access at [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

###  Frontend Setup (React.js)

#### 🔹 Navigate to the frontend folder
```bash
cd ../library_frontend
```

#### 🔹 Install dependencies
```bash
npm install
```

#### 🔹 Start the React development server
```bash
npm start
```

🔗 **Frontend URL**: Open in the browser at [http://localhost:3000/](http://localhost:3000/)

---

##  API Endpoints

###  Authentication (Admin Signup & Login)

| Method | Endpoint               | Description  |
|--------|------------------------|--------------|
| POST   | `/api/admin/signup/`   | Admin Signup |
| POST   | `/api/admin/login/`    | Admin Login  |

###  Books Management

| Method | Endpoint            | Description        |
|--------|---------------------|--------------------|
| GET    | `/api/books/`       | Get all books     |
| POST   | `/api/books/`       | Add a new book    |
| PUT    | `/api/books/<id>/`  | Update book details |
| DELETE | `/api/books/<id>/`  | Delete a book     |

---

## Technologies Used

- **Frontend**: React.js  
- **Backend**: Django, Django REST Framework  
- **Database**: MySQL  
