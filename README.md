# Clinic Appointment System

A full-stack clinic appointment scheduling application built with **Rails API** and **React**.

This project demonstrates clean domain modeling, RESTful API design, validation at both application and database levels, and a lightweight frontend consuming the API.

---

## 🚀 Tech Stack

### Backend
- Ruby 3.3
- Rails 7.1 (API-only)
- PostgreSQL
- ActiveRecord
- rack-cors

### Frontend
- React (Vite)
- Fetch API
- Plain CSS (minimal by design)

---

## ✨ Features

### ✅ Core Functionality
- Create, list, update, and delete appointments
- Manage doctors and patients
- Prevent double-booking for:
  - Doctors
  - Patients
- Database-level uniqueness constraints
- Proper error handling and validation

### ✅ Filtering & Queries
- View appointments by:
  - Date
  - Doctor
  - Patient
- Combined filters (e.g. doctor + date)

### ✅ Frontend
- Select doctor and date to view appointments
- Create appointments from the UI
- View all appointments for a selected patient
- Fully local development setup

---

## 🧠 System Design Decisions

- **Business rules enforced at multiple levels**  
  Appointment collision rules are validated both:
  - In the Rails model
  - At the database level (unique indexes)

- **Single flexible endpoint for filtering**  
  A unified `/appointments` endpoint uses query parameters instead of duplicating routes.

- **Minimal frontend by design**  
  Focused on correctness and clarity rather than UI complexity.

---

## 📁 Project Structure

clinic-app/
├── backend/ # Rails API
│ ├── app/
│ ├── config/
│ └── db/
│
├── frontend/ # React frontend (Vite)
│ ├── src/
│ └── index.html
│
└── README.md


---

## ▶️ Running the Project Locally

### Backend
```bash
cd backend
bundle install
bundle exec rails db:create db:migrate
bundle exec rails s

```
Runs on:

http://localhost:3000

Frontend
```
cd frontend
npm install
npm run dev

```
Runs on:

http://localhost:5173

📡 API Examples
Create Appointment
POST /appointments

{
  "appointment": {
    "doctor_id": 1,
    "patient_id": 1,
    "appointment_time": "2025-12-11T10:00:00",
    "status": "scheduled"
  }
}

Filter Appointments
GET /appointments?doctor_id=1&date=2025-12-11
GET /appointments?patient_id=2

✅ Future Improvements

Appointment cancellation/rescheduling

Pagination

Authentication & authorization

Notifications (email / SMS)

Styling with Tailwind
