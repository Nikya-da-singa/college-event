# College Event Management — MERN

## Stack
- Frontend: React + Vite + React Router + Axios
- Backend: Node.js + Express
- Database: MongoDB Atlas + Mongoose

## Architecture
Browser (React :5173) -> Express API (:5000) -> MongoDB Atlas

## 1. Requirements
Install Node.js LTS and verify:
```bash
node --version
npm --version
```

Create a MongoDB Atlas cluster and database user.

## 2. Backend setup
Open a terminal:
```bash
cd backend
npm install
```

Create `backend/.env` from `.env.example`:
```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/college_events?retryWrites=true&w=majority
PORT=5000
```

Start:
```bash
npm start
```

Expected:
```text
MongoDB connected successfully.
Server running on http://localhost:5000
```

Test in browser:
`http://localhost:5000/`

## 3. Frontend setup
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL, normally:
`http://localhost:5173`

The frontend uses:
```env
VITE_API_URL=http://localhost:5000/api
```
If needed, create `frontend/.env` from `.env.example`.

## 4. Database
You do NOT need to manually create MongoDB collections or tables.

When the backend successfully connects:
- `college_events` is the database name from the URI.
- MongoDB/Mongoose creates collections when the first document is inserted.
- `events` stores events.
- `students` stores student information.
- `registrations` links students to events.

Suggested first test:
1. Open Add Event (Admin).
2. Create one event.
3. Open its details.
4. Register one student.
5. Check MongoDB Atlas -> Browse Collections.

## 5. API
### Events
GET `/api/events`
GET `/api/events/:id`
POST `/api/events`
PUT `/api/events/:id`
DELETE `/api/events/:id`

### Registrations
POST `/api/registrations`
GET `/api/registrations/event/:eventId`
GET `/api/registrations/student/:email`

## 6. Important
This demo has no authentication. The "Admin" page is only an admin-looking route, not a secure admin system.
