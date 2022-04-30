const express = require("express");
const fs = require("fs");
const util = "util";
const path = require("path");
const db = require("./db/db.json");

//Setup for a heroku deploy but not actually deployed to heroku.
const PORT = process.env.PORT || 3001;
//Initiates server
const app = express();


app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

function filterByQuery(query, db) {
  let filteredResults = db;
  //See comments below for origin of queries
  if (query.noteTitle) {
    filteredResults = filteredResults.filter(
    (db) => (db.noteTitle = query.noteTitle)
    );
  }
  if (query.id) {
    filteredResults = filteredResults.filter((db) => (db.id = query.id));
  }
  return filteredResults;
}

function findById(id, db) {
  const result = db.filter((db) => db.id === id)[0];
  return result;
}

function createNewNote(body) {

  db.push(body);
  
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(db, null, 2)
  );
  return db;
}

app.get("/api/hello", (req, res) => {
  res.send("Hello! test");
});


app.get("/api/notes", (req, res) => {
  let results = db;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.get("/api/notes/:id", (req, res) => {
  const result = findById(req.params.id, db);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.post("/api/notes", (req, res) => {

  req.body.id = db.length.toString();
  const dbArray = [db];
  const note = createNewNote(req.body, dbArray);
  res.json(note);

});

app.delete("api/notes/:id", (req, res) => {
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//Check that the server is listening and running
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
