# school-admission-project
Setup and Installation
the Django API (Backend) and the Next.js App (Frontend).
1. Backend Setup (Django)
    1:Navigate to the Backend Directory:
        cd School_Addmission/AddmissionProj
    2.Create Virtual Environment:
        python -m venv venv
        .\venv\Scripts\activate
    3.Install Dependencies:
        pip install -r requirements.txt
    4.Database Configuration:
        Open AddmissionProj/settings.py and update the DATABASES section with your MySQL credentials
    5.Run Migrations:
        python manage.py makemigrations
        python manage.py migrate
    6.Run the Backend Server:
        python manage.py runserver 0.0.0.0:8000
        The API should now be running at http://127.0.0.1:8000/api/students/

2. Frontend Setup (Next.js)
    1.Open a NEW Terminal.
    2.Navigate to the Frontend Directory:
        cd School_Addmission/frontend
    3.Install Node Dependencies:
        npm install
    4.Run the Frontend Development Server:
        npm run dev
        
