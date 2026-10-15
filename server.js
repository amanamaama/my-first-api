const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const app = express();

app.use(cors());
app.use(express.json());

const db = new Database("skills.db");
db.exec("CREATE TABLE IF NOT EXISTS skills (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");

app.get("/skills", function (request, response) {
  let rows = db.prepare("SELECT * FROM skills").all();
  response.json(rows);
});

app.post("/skills", function (request, response) {
  db.prepare("INSERT INTO skills (name) VALUES (?)").run(request.body.name);
  let rows = db.prepare("SELECT * FROM skills").all();
  response.json(rows);
});

app.delete("/skills/:id", function (request, response) {
  db.prepare("DELETE FROM skills WHERE id = ?").run(request.params.id);
  let rows = db.prepare("SELECT * FROM skills").all();
  response.json(rows);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("Server is running on port " + PORT);
});
app.put("/skills/:id", function (request, response) {
  db.prepare("UPDATE skills SET name = ? WHERE id = ?").run(request.body.name, request.params.id);
  let rows = db.prepare("SELECT * FROM skills").all();
  response.json(rows);
});