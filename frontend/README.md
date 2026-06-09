# MyPustak Full Stack Developer – 1 Hour Coding Challenge

## Tech Stack

### Backend

* FastAPI
* Python

### Frontend

* React.js (Vite)
* Axios

---

## Features

* View all posts
* Create a new post
* Delete a post
* Loading state
* Error handling
* In-memory data storage

---

## Project Structure

backend/
frontend/

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:

http://localhost:8000

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

http://localhost:5173

---

## API Endpoints

### GET /posts

Returns all posts.

### POST /posts

Create a new post.

Example:

```json
{
  "title": "Hello",
  "body": "World"
}
```

### DELETE /posts/{id}

Deletes a post.

---

## Author

Priyanshu Kumar Prasad
