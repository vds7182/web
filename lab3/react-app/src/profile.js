import React from 'react';
import './profile.css'; // Optional: if you have styles

function Profile() {
  return (
    <div className="profile">
      <header>

        <div className="profile-container">
          <img
            src="/Users/mihailmirosnicenko/Downloads/default-avatar-icon-of-social-media-user-vector.jpg"
            width="200"
            height="200"
            alt="Аватар користувача"
          />
          <p>Олексій Савчеко Олексанрович</p>
        </div>
      </header>

      <div className="bottom-text">
        <p>
          Олексій Савченко Олександрович<br />
          Телефон: +38096223421<br />
          Email: oleksiy.savchenko@email.com<br />
          LinkedIn: linkedin.com/in/oleksiy-savchenko<br />
          GitHub: github.com/oleksiy-savchenko
        </p>
      </div>

      <div className="text_l">
        <p>ПРОФЕСІЙНИЙ ДОСВІД</p>
        <p>Програміст (Junior Developer)</p>
        <br />
        <p>
          ABC Tech Solutions – Київ, Україна<br />
          Червень 2022 – Теперішній час
        </p>
        <p>
          Розробка веб-додатків з використанням JavaScript, HTML5, CSS3, React.<br />
          Робота з API та інтеграція зовнішніх сервісів у проекти.<br />
          Створення адаптивних інтерфейсів для різних типів пристроїв.<br />
          Використання Git для контролю версій та спільної роботи з командою.<br />
          Практикант-програміст
        </p>
        <p>
          XYZ IT Company – Київ, Україна<br />
          Січень 2021 – Травень 2022
        </p>
        <p>
          Допомога в розробці backend на Python, Django.<br />
          Робота з базами даних MySQL, MongoDB.<br />
          Підтримка та оновлення існуючих систем, виправлення багів.<br />
          Написання тестів та забезпечення високої якості коду.
        </p>
      </div>
    </div>
  );
}

export default Profile;
