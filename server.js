const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());

const SECRET = process.env.SECRET || "change-this-secret";

function auth(request, response, next) {
  let header = request.headers.authorization || "";
  let token = header.replace("Bearer ", "");

  try {
    request.user = jwt.verify(token, SECRET);
    next();
  } catch (error) {
    response.status(401).json({ error: "Please log in" });
  }
}

const db = new Database("skills.db");
db.exec("CREATE TABLE IF NOT EXISTS skills (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)");

app.get("/skills", function (request, response) {
  let rows = db.prepare("SELECT * FROM skills").all();
  response.json(rows);
});

app.post("/skills", auth, function (request, response) {
  db.prepare("INSERT INTO skills (name) VALUES (?)").run(request.body.name);
  let rows = db.prepare("SELECT * FROM skills").all();
  response.json(rows);
});

app.delete("/skills/:id", auth, function (request, response) {
  db.prepare("DELETE FROM skills WHERE id = ?").run(request.params.id);
  let rows = db.prepare("SELECT * FROM skills").all();
  response.json(rows);
});

app.put("/skills/:id", auth, function (request, response) {
  db.prepare("UPDATE skills SET name = ? WHERE id = ?").run(request.body.name, request.params.id);
  let rows = db.prepare("SELECT * FROM skills").all();
  response.json(rows);
});

app.post("/signup", function (request, response) {
  let username = request.body.username;
  let password = request.body.password;

  if (!username || !password) {
    return response.status(400).json({ error: "Username and password are required" });
  }

  let exists = db.prepare("SELECT id FROM users WHERE username = ?").get(username);
  if (exists) {
    return response.status(400).json({ error: "Username already taken" });
  }

  let hash = bcrypt.hashSync(password, 10);
  db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, hash);
  response.json({ message: "Account created" });
});

app.post("/login", function (request, response) {
  let username = request.body.username;
  let password = request.body.password;

  let user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return response.status(401).json({ error: "Wrong username or password" });
  }

  let token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: "1d" });
  response.json({ token: token });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("Server is running on port " + PORT);
});