const http = require("http");
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Імпортуємо cors
const express = require('express');

// Додаємо CORS middleware
const app = require('express')();
app.use(cors());  // Це дозволить доступ до серверу з усіх джерел

// Database connection (залишаємо без змін)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Marvel229",
  database: "web"
});

// API endpoint: /vacancies
app.get("/vacancies", (req, res) => {
  const query = "SELECT idVacant, Salary, City, About FROM Vacant"; // ✅ Fixed table name
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.status(200).json(results);
  });
});

// Serve static files (main.html, etc.)
app.use(express.static(path.join(__dirname, 'public')));  // Заміни на твої файли
app.listen(3001, () => console.log("Server running on http://localhost:3001"));
