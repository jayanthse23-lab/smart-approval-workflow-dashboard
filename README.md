# Smart Approval Workflow Dashboard (MERN)

An enterprise-style Smart Approval Workflow Dashboard built with **MongoDB, Express, React, and Node.js**.

## Project Structure

```text
smart-approval-workflow-dashboard/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Request.js
│   ├── routes/
│   │   └── requestRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── requestApi.js
│   │   ├── components/
│   │   │   ├── NewRequestModal.jsx
│   │   │   ├── RequestTable.jsx
│   │   │   └── StatCard.jsx
│   │   ├── styles/
│   │   │   └── app.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Backend API Endpoints

- `GET /api/requests` → Fetch all requests.
- `GET /api/stats` → Fetch Total, Pending, Approved, Rejected counts.
- `POST /api/requests` → Create a new request.
- `PATCH /api/requests/:id` → Approve/Reject a request and add optional comment.

## Setup & Run (Exact Commands)

### 1) Clone and open project

```bash
git clone <your-repo-url>
cd smart-approval-workflow-dashboard
```

### 2) Backend setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 3) Frontend setup (open a new terminal)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 4) Open the dashboard

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`

## Environment Variables

### backend/.env

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/smart_approval_dashboard
```

### frontend/.env

```env
VITE_API_URL=http://localhost:5000/api
```

## Feature Highlights

- Stat cards for Total, Pending, Approved, Rejected.
- Request table with color-coded priority and status pills.
- Approve/Reject action buttons for pending requests.
- Status filter dropdown.
- Modal form to submit new requests.
- Loading and error states.
- Clean enterprise-style responsive CSS.
