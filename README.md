# My First API

A simple REST API built with Node.js, Express and SQLite. It stores a list of skills and supports full CRUD.

## Live API
https://my-first-api-s0ly.onrender.com/skills

(The free server sleeps when unused, so the first request can take up to a minute.)

## Endpoints
| Method | Route | What it does |
|---|---|---|
| GET | /skills | Get all skills |
| POST | /skills | Add a skill |
| PUT | /skills/:id | Edit a skill |
| DELETE | /skills/:id | Delete a skill |

## Technologies
- Node.js
- Express
- SQLite (better-sqlite3)
- CORS

## Run it on your computer
1. `npm install`
2. `node server.js`
3. Open http://localhost:3000/skills

## Author
Aman