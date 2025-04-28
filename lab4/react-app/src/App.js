import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home';
import Profile from './profile';
import Jobs from './vacancies';
import './App.css';
import Login from './login'; 
import Sing from'./singin'
import Filter from './filter'; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><Link to="/">Головна</Link></li>
              <li><Link to="/jobs">Вакансії</Link></li>
              <li><Link to="/profile">Мій профіль</Link></li>
              <li><Link to='/filter'>Сортувати вакансії</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/singin'>Login</Link></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/login" element={<Login />} /> {/* Теперь работает */}
          <Route path="/singin" element={<Sing />} /> {/* Теперь работает */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;