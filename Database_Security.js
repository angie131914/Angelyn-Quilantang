// db-security.js
import express from "express";
import sqlite3 from "sqlite3";
const app = express();
app.use(express.json());

const db = new sqlite3.Database(":memory:");
db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");

app.post("/user", (req, res) => {
  const { username, password } = req.body;

  // Prevent SQL injection using parameterized queries
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, username });
  });
});

app.listen(3003);
