const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path=require("path")
var http=require('http');
var fs=require("fs");
var url=require("url")


const server = http.createServer((req, res) => {
  let q = url.parse(req.url, true);
  let filename = "." + (q.pathname === "/" ? "/main.html" : q.pathname); 

  // Normalize path to prevent security issues
  filename = path.normalize(filename);

  console.log(`Request for: ${filename}`);

  fs.access(filename, fs.constants.F_OK, (err) => {
      if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found: " + filename);
          return;
      }

      const extname = path.extname(filename);
      const mimeTypes = {
          ".html": "text/html",
          ".css": "text/css",
          ".js": "text/javascript",
          ".json": "application/json",
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".gif": "image/gif",
          ".svg": "image/svg+xml"
      };
      const contentType = mimeTypes[extname] || "application/octet-stream";

      fs.readFile(filename, (err, data) => {
          if (err) {
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("500 Internal Server Error");
              return;
          }
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
      });
  });
});
const PORT = 3000;
server.listen(PORT, "localhost", () => { 
  console.log(`✅ Server running at http://localhost:${PORT}/`);
});
const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",  // Используй свой логин, если нужно
  password: "Marvel229",  // Укажи свой пароль, если он есть
  database: "web"  // Название твоей базы данных
});

db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных: ", err);
  } else {
    console.log("Подключено к базе данных MySQL!");
  }
});

app.get("/vacancies", (req, res) => {
  const query = "SELECT idVacant, Salary, City, About FROM vacancies";  // Проверяем, что таблица правильно названа

  db.query(query, (err, results) => {
      if (err) {
          console.error("❌ Ошибка при запросе в БД:", err);
          res.status(500).json({ error: "Ошибка сервера" });
          return;
      }
      res.json(results);
  });
});
