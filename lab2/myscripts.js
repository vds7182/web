function fetchSalary() {
    fetch("http://localhost:3000/salary")  // Отправляем GET-запрос на сервер
      .then(response => response.json())  // Преобразуем ответ в формат JSON
      .then(data => {
        console.log(data);  // Выводим полученные данные в консоль
        const salaryList = document.getElementById("salary-list");
  
        // Отображаем зарплаты на странице
        salaryList.innerHTML = data.map(salary => `<li>${salary.salary}</li>`).join('');
      })
      .catch(error => console.error("Ошибка:", error));  // Ловим ошибки
  }
  
  // Вызов функции
  fetchSalary();