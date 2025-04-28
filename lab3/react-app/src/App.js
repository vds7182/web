import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home';
import Profile from './profile';
import Jobs from './vacancies';
import './App.css';
import Filter from './filter'; // Import with capitalized 'Filter'

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
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/filter" element={<Filter />} /> {/* Use 'Filter' component here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
