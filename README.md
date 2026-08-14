# Assignment Management System — Frontend

Live Link: [https://assignement-management-frontend.vercel.app/](https://assignement-management-frontend.vercel.app/)


Modern frontend application for the Assignment Management System.

The frontend is built with **Next.js** and communicates with the Django REST API backend. It provides separate experiences for **Admin, Teacher, and Student** users with role-based navigation and workflows.

---

## 1. Overview

The Assignment Management System allows educational institutions to manage assignments and student submissions through a centralized web application.

The frontend provides:

* Authentication
* Role-based dashboards
* Assignment management
* Assignment creation and editing
* Assignment submission
* Submission tracking
* Teacher submission management
* Responsive UI
* API integration with Django REST Framework

---

## 2. Main Features

### Authentication

* Login system
* JWT authentication
* Access token handling
* Refresh token handling
* Logout functionality
* Authenticated API requests
* Role-based navigation

Supported roles:

```text
ADMIN
TEACHER
STUDENT
```

---

## 3. Role-Based Features

### Admin

Administrators can access administrative functionality provided by the backend.

Typical dashboard capabilities include:

* System overview
* Assignment management
* User/system management
* Submission monitoring

---

### Teacher

Teachers can:

* Access Teacher Dashboard
* View assignments
* Create assignments
* Save assignments as drafts
* Publish assignments
* Edit assignments
* Delete assignments
* View assignment details
* Review student submissions
* Grade submissions

Teacher assignment workflow:

```text
Teacher Login
      ↓
Teacher Dashboard
      ↓
Assignments
      ↓
Create Assignment
      ↓
Select Class + Subject
      ↓
Save / Publish
      ↓
Manage Assignment
      ↓
Review Submissions
```

---

### Student

Students can:

* Access Student Dashboard
* View assignments available to their class
* View published assignments
* View assignment details
* Write answers
* Submit assignments
* View submission history

Student workflow:

```text
Student Login
      ↓
Student Dashboard
      ↓
Assignments
      ↓
Published Assignment
      ↓
Assignment Details
      ↓
Submit Assignment
      ↓
Submission History
```

Students do not see the **Create Assignment** button.

---

## 4. Technology Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* Lucide React

### API Communication

* Axios
* Django REST Framework API
* JWT authentication

### Development

* Node.js
* npm
* Git
* GitHub
* Vercel

---

## 5. Project Structure

```text
assignment-management-frontend/
│
├── public/
│
├── src/
│   │
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   ├── teacher/
│   │   │   ├── student/
│   │   │   ├── assignments/
│   │   │   ├── submissions/
│   │   │   └── ...
│   │   │
│   │   ├── login/
│   │   └── ...
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── shared/
│   │   └── ...
│   │
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── ...
│   │
│   ├── services/
│   │   ├── assignment.service.ts
│   │   ├── submission.service.ts
│   │   ├── auth.service.ts
│   │   └── ...
│   │
│   ├── types/
│   │   ├── auth.ts
│   │   └── ...
│   │
│   └── ...
│
├── .env.example
├── next.config.ts
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── README.md
```

---

## 6. Prerequisites

Install the following before running the project:

* Node.js 18+
* npm
* Git

Check Node.js:

```bash
node --version
```

Check npm:

```bash
npm --version
```

---

## 7. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Move into the frontend directory:

```bash
cd assignment-management-frontend
```

---

## 8. Install Dependencies

Run:

```bash
npm install
```

This installs all required frontend dependencies.

---

## 9. Environment Configuration

Create a `.env.local` file in the frontend root.

Use `.env.example` as the template.

Example:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

For production, replace the value with the deployed backend API URL.

Example:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

### Security

Do not commit:

```text
.env
.env.local
.env.production
```

Only commit:

```text
.env.example
```

Never put private API keys, passwords, database credentials, or other secrets in frontend environment variables.

Remember that variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## 10. Backend Requirement

The frontend requires the Django REST API backend to be running.

Local backend:

```text
http://127.0.0.1:8000
```

The backend must provide:

* Authentication API
* Assignment API
* Submission API
* Role-based permissions
* JWT authentication

Make sure the backend is running before testing the frontend.

---

## 11. Run Development Server

Start the frontend:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:3000
```

Open the URL in a browser.

---

## 12. Production Build

Before deployment, create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

The application will normally run at:

```text
http://localhost:3000
```

---

## 13. Vercel Deployment

The frontend is compatible with Vercel.

### Step 1 — Import Repository

Import the frontend Git repository into Vercel.

### Step 2 — Configure Environment Variable

Add:

```text
NEXT_PUBLIC_API_URL
```

Set it to the production Django API URL.

Example:

```text
https://your-backend-domain.com
```

### Step 3 — Deploy

Vercel automatically runs the Next.js production build.

The deployment process is:

```text
GitHub
   ↓
Vercel
   ↓
npm install
   ↓
npm run build
   ↓
Next.js Production
```

---

## 14. Authentication Flow

The frontend communicates with the authentication endpoint:

```http
POST /auth/login/
```

Example request:

```json
{
  "username": "student",
  "password": "password"
}
```

The backend returns:

```text
access token
refresh token
user information
```

The frontend stores authentication information locally and uses the access token for protected API requests.

Authenticated requests use:

```http
Authorization: Bearer <access_token>
```

---

## 15. Authentication Storage

The frontend authentication helper manages:

```text
access_token
refresh_token
user
user_role
```

The authenticated user contains role information such as:

```text
ADMIN
TEACHER
STUDENT
```

The role is used to control frontend navigation and user experience.

---

## 16. Role-Based Navigation

The application dynamically displays navigation depending on the authenticated user's role.

Example:

```text
ADMIN
 └── Admin Dashboard

TEACHER
 ├── Teacher Dashboard
 ├── Assignments
 └── Submissions

STUDENT
 ├── Student Dashboard
 ├── Assignments
 └── Submissions
```

The frontend hides actions that are not applicable to the current role.

For example:

* Students do not see **Create Assignment**.
* Teachers can see **Create Assignment**.
* Teachers can access assignment editing.
* Students can access assignment submission.

Important: frontend hiding is only a UI restriction. Actual authorization is enforced by the backend API.

---

## 17. Assignment Pages

The frontend provides the following assignment workflow.

### Assignment List

```text
/dashboard/assignments
```

Users can view assignments available to them.

### Assignment Details

```text
/dashboard/assignments/<id>
```

The page displays:

* Assignment title
* Description
* Subject
* Class
* Deadline
* Maximum marks
* Assignment status

### Teacher Edit

```text
/dashboard/assignments/<id>/edit
```

Teachers can edit their assignments.

### Student Submission

```text
/dashboard/assignments/<id>/submit
```

Students can write and submit their answers.

---

## 18. Assignment API Service

Assignment API functionality is centralized in:

```text
src/services/assignment.service.ts
```

Available functions include:

```typescript
getAssignments()
getStudentAssignments()
getAssignment(id)
createAssignment(data)
updateAssignment(id, data)
deleteAssignment(id)
publishAssignment(id)
```

The backend determines which assignments the authenticated user is allowed to access.

---

## 19. Submission API Service

Submission API functionality is handled through:

```text
src/services/submission.service.ts
```

The frontend uses this service to:

* Create submissions
* Retrieve submissions
* Retrieve individual submissions
* Update submission information where permitted

---

## 20. API Client

The centralized Axios API client is located at:

```text
src/lib/api.ts
```

It handles communication between the Next.js application and Django REST API.

The API client is responsible for:

* Base API URL
* Authentication headers
* JWT access token
* API requests
* Response handling

---

## 21. Responsive Design

The application is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

Tailwind CSS responsive utilities are used throughout the application.

Examples:

```text
sm:
md:
lg:
xl:
```

Dashboard layouts, navigation, forms, tables, and assignment pages adapt to smaller screen sizes.

---

## 22. Error Handling

The frontend provides user-friendly states for:

### Loading

```text
Loading assignments...
```

### API errors

```text
Failed to load assignments.
```

### Empty data

```text
No assignments available
```

### Submission errors

Backend validation errors are displayed to the user when available.

---

## 23. Demo Credentials

The evaluator can use the following accounts.

### Admin

```text
Email: <ADMIN_EMAIL>
Password: <ADMIN_PASSWORD>
```

### Teacher

```text
Email: <TEACHER_EMAIL>
Password: <TEACHER_PASSWORD>
```

### Student

```text
Email: <STUDENT_EMAIL>
Password: <STUDENT_PASSWORD>
```

Use dedicated evaluation credentials rather than personal accounts.

---

## 24. Testing and Validation

Run the production build:

```bash
npm run build
```

This validates:

* TypeScript
* Next.js compilation
* Production build
* Route validation
* Static generation where applicable

Start production mode:

```bash
npm start
```

---

## 25. Recommended Development Commands

Install dependencies:

```bash
npm install
```

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Production server:

```bash
npm start
```

---

## 26. Known Limitations

Depending on the current deployment and backend configuration:

* JWT access/refresh token handling depends on the backend authentication implementation.
* Real-time notifications are not currently implemented.
* Assignment file attachments are not part of the current core workflow.
* Advanced assignment grading/rubric functionality may be limited.
* Offline functionality is not currently implemented.

---

## 27. Important Security Notes

The frontend does not contain:

* Database credentials
* Django secret keys
* Private API keys
* Production passwords

Environment-specific configuration should be stored outside the repository.

Only non-sensitive configuration should use `NEXT_PUBLIC_` variables.

Backend authorization remains the source of truth for role-based access control.

---

## 28. Local Setup — Quick Start

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>

cd assignment-management-frontend

npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Start the application:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Make sure the Django backend is also running.

---

## 29. Evaluation Flow

### Admin

```text
Login
  ↓
Admin Dashboard
  ↓
System Management
```

### Teacher

```text
Login
  ↓
Teacher Dashboard
  ↓
Assignments
  ↓
Create Assignment
  ↓
Publish Assignment
  ↓
Manage Assignment
  ↓
Review Submissions
```

### Student

```text
Login
  ↓
Student Dashboard
  ↓
Assignments
  ↓
View Published Assignment
  ↓
Assignment Details
  ↓
Submit Answer
  ↓
Submission History
```

---


## License

This project was developed as an academic/technical assessment project.
