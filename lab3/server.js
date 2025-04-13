const http = require("http");
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const express = require('express');

const app = express();
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Marvel229",
  database: "web"
});

// API endpoint: /vacancies
app.get("/vacancies", (req, res) => {
  console.log("Fetching vacancies..."); // Логирование начала запроса
  
  const query = "SELECT idVacant AS id, Salary, City, About, add_date FROM Vacant";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err); // Логирование ошибки
      res.status(500).json({ error: "Database error" });
      return;
    }
    
    console.log("Query results:", results); // Логирование результатов
    
    // Преобразуем даты в правильный формат, если нужно
    const formattedResults = results.map(item => {
      return {
        ...item,
        // Если add_date - это объект Date MySQL, преобразуем в строку
        add_date: item.add_date ? formatDate(item.add_date) : null
      };
    });
    
    res.status(200).json(formattedResults);
  });
});

// Функция для форматирования даты
function formatDate(date) {
  if (date instanceof Date) {
    return date.toISOString().split('T')[0].replace(/-/g, '.');
  }
  return date; // Если это уже строка
}

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3001, () => console.log("Server running on http://localhost:3001"));