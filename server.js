const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());

function loadSkills() {
  if (!fs.existsSync("skills.json")) {
    return ["HTML", "CSS", "JavaScript", "Git"];
  }
  let text = fs.readFileSync("skills.json", "utf8");
  return JSON.parse(text);
}

function saveSkills(skills) {
  fs.writeFileSync("skills.json", JSON.stringify(skills));
}

let skills = loadSkills();

app.get("/skills", function (request, response) {
  response.json(skills);
});

app.post("/skills", function (request, response) {
  let newSkill = request.body.name;
  skills.push(newSkill);
  saveSkills(skills);
  response.json(skills);
});

app.listen(3000, function () {
  console.log("Server is running at http://localhost:3000");
});