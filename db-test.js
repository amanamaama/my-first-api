const Database = require("better-sqlite3");
const db = new Database("skills.db");

db.exec("CREATE TABLE IF NOT EXISTS skills (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");

db.prepare("INSERT INTO skills (name) VALUES (?)").run("HTML");
db.prepare("INSERT INTO skills (name) VALUES (?)").run("CSS");

let rows = db.prepare("SELECT * FROM skills").all();
console.log(rows);