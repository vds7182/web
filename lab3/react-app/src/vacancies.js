import React, { useEffect, useState } from 'react';
import './vacancies.css'; // Optional CSS file for this component

function Vacancies() {
  const [vacancies, setVacancies] = useState([]);  // Стейт для збереження вакансій
  const [isLoading, setIsLoading] = useState(true); // Стейт для індикатора завантаження

  // Завантажуємо вакансії з сервера при монтуванні компонента
  useEffect(() => {
    fetch("http://localhost:3001/vacancies")
      .then(response => response.json())
      .then(data => {
        setVacancies(data);  // Зберігаємо вакансії в стейт
        setIsLoading(false);  // Встановлюємо, що завантаження завершено
      })
      .catch(error => {
        console.error("Fetch error:", error);
        setIsLoading(false);  // Якщо сталася помилка, припиняємо завантаження
      });
  }, []);  // Порожній масив як залежність, тому код виконується тільки при монтуванні компонента

  // Функція для зміни тексту кнопки на "Заявку подано"
  const handleApply = (e) => {
    e.target.textContent = "Заявку подано";
    e.target.style.backgroundColor = "green";
    e.target.disabled = true;
  };

  // Рендер вакансій
  const displayVacancies = () => {
    return vacancies.map((vacancy) => (
      <div className="vacancy-card" key={vacancy.idVacant}>
        <h3>{vacancy.City}</h3>
        <p className="salary">$ {vacancy.Salary}</p>
        <p className="description">{vacancy.About}</p>
        <button
          onClick={handleApply}
          style={{ backgroundColor: "#007bff", color: "white" }}
        >
          Подати заявку
        </button>
      </div>
    ));
  };

  return (
    <div>
      <h1>Available Vacancies</h1>
      {isLoading ? (
        <p>Loading...</p>  // Показуємо повідомлення про завантаження
      ) : (
        <div id="grid-container" className="vacancy-grid">
          {displayVacancies()}  {/* Відображення вакансій */}
        </div>
      )}
    </div>
  );
}

export default Vacancies;
