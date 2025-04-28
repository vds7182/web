import React, { useState } from 'react';
import './filter.css';

function Filter() {
    const [vacancies, setVacancies] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [city, setCity] = useState('');
    const [sortByDate, setSortByDate] = useState(false);

    // Функция для парсинга даты из формата yyyy.mm.dd
    const parseDate = (dateStr) => {
        if (!dateStr) return new Date(0);
        const [year, month, day] = dateStr.split('.');
        return new Date(year, month - 1, day);
    };

    // Функция для поиска вакансий с фильтрацией и сортировкой
    const searchVacancies = () => {
        fetch("http://localhost:3001/vacancies")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Received data:', data);

                let filteredVacancies = data.filter(vacancy => 
                    (keyword === "" || vacancy.About?.toLowerCase().includes(keyword.toLowerCase())) &&
                    (minSalary === "" || vacancy.Salary >= Number(minSalary)) &&
                    (city === "" || vacancy.City?.trim().toLowerCase() === city.toLowerCase())
                );

                if (sortByDate) {
                    filteredVacancies.sort((a, b) => {
                        const dateA = parseDate(a.add_date);
                        const dateB = parseDate(b.add_date);
                        return dateB - dateA; // Изменено на dateB - dateA для сортировки от новых к старым
                    });
                }

                setVacancies(filteredVacancies);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setVacancies([]);
            });
    };

    // Функция для форматирования даты к читаемому виду
    const formatDate = (dateStr) => {
        if (!dateStr) return 'Невідома дата';
        const date = parseDate(dateStr);
        return isNaN(date.getTime()) ? 'Невідома дата' : date.toLocaleDateString();
    };

    return (
        <div>
            {/* Форма для фильтрации */}
            <div className="search-box">
                <input 
                    type="text" 
                    placeholder="Введіть вакансію" 
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)} 
                />
                <input 
                    type="number" 
                    placeholder="Введіть мінімальну зарплату" 
                    value={minSalary}
                    onChange={e => setMinSalary(e.target.value)} 
                />
                <select 
                    value={city}
                    onChange={e => setCity(e.target.value)}
                >
                    <option value="">Всі міста</option>
                    <option value="Львів">Львів</option>
                    <option value="Київ">Київ</option>
                    <option value="Харків">Харків</option>
                    <option value="Одеса">Одеса</option>
                    <option value="Дніпро">Дніпро</option>
                </select>
                <label>
                    <input 
                        type="checkbox" 
                        checked={sortByDate} 
                        onChange={() => setSortByDate(!sortByDate)} 
                    />
                    Сортувати за датою (від новіших до старших)
                </label>
            </div>

            {/* Кнопка для активации поиска */}
            <button onClick={searchVacancies}>Шукати</button>

            {/* Отображение результатов */}
            <div className="vacancy-results">
                {vacancies.length === 0 ? (
                    <p>Вакансій не знайдено.</p>
                ) : (
                    vacancies.map((vacancy) => (
                        <div 
                            key={`${vacancy.id || ''}-${vacancy.City}-${vacancy.About?.substring(0, 20)}-${vacancy.add_date}`}
                            className="vacancy-card"
                        >
                            <h3>{vacancy.City || 'Місто не вказано'}</h3>
                            <p className="salary">${vacancy.Salary || 'Зарплата не вказана'}</p>
                            <p className="description">{vacancy.About || 'Опис відсутній'}</p>
                            <p className="date">Опубліковано: {formatDate(vacancy.add_date)}</p>
                            <button
                                onClick={(e) => {
                                    e.target.textContent = "Заявку подано";
                                    e.target.style.backgroundColor = "green";
                                    e.target.disabled = true;
                                }}
                                style={{ backgroundColor: "#007bff", color: "white" }}
                            >
                                Подати заявку
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Filter;