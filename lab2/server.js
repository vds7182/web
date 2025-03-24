const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

// Создаем подключение к базе данных MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",  // Если ты используешь пароль, добавь поле password
  password: "Marvel229", // Укажи свой пароль, если он есть
  database: "web"  
});

db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных: ", err);
  } else {
    console.log("Подключено к базе данных MySQL!");
  }
});

// Маршрут для получения пользователей
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).send("Ошибка при получении данных.");
    } else {
      res.json(results); // Отправляем данные в формате JSON
    }
  });
});

app.listen(3000, () => {
  console.log("Сервер работает на порту 3000");
});
