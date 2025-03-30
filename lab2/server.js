const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path=require("path")

const app = express();
app.use(cors());

// Подключение к базе данных
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

// Маршрут для получения всех вакансий с idVacant, salary, city, about
app.get("/vacancies", (req, res) => {
  const query = "SELECT idVacant, Salary, City, About FROM vacant";  // Запрос к базе данных для получения данных

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Ошибка при получении данных.");
    } else {
      res.json(results);  // Отправляем результаты в формате JSON
    }
  });
});

// Запуск сервера
app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname,'main.html'));
});

app.listen(3000, () => {
  console.log("Сервер работает на порту 3000");
});
