import React from 'react';
import './login.css';

function Login() {
  return (
    <div className="app">
      <div className="login-form">
        <h2>Вход</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Пароль" />
        <button className='login-button'>Войти</button>
      </div>
    </div>
  );
}

export default Login;