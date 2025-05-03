import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase-config"; // Your initialized Firebase
import './vacancies.css';

function Vacancies() {
  const [user, setUser] = useState(null);
  const [vacancies, setVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Watch for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the logged-in user or null
    });

    return () => unsubscribe(); // Cleanup the observer
  }, []);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "vacations"));
        const fetchedVacancies = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVacancies(fetchedVacancies);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching vacancies from Firestore:", error);
        setIsLoading(false);
      }
    };

    fetchVacancies();
  }, []);

  const handleApply = (e) => {
    e.target.textContent = "Заявку подано";
    e.target.style.backgroundColor = "green";
    e.target.disabled = true;
  };

  const displayVacancies = () => {
    return vacancies.map((vacancy) => (
      <div className="vacancy-card" key={vacancy.id}>
        <h3>{vacancy.City}</h3>
        <p className="salary">₴ {vacancy.Salary}</p>
        <p className="description">{vacancy.About}</p>
        {user && (
          <button onClick={handleApply} style={{ backgroundColor: "#007bff", color: "white" }}>
            Подати заявку
          </button>
        )}
      </div>
    ));
  };

  return (
    <div>
      <h1>Available Vacancies</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div id="grid-container" className="vacancy-grid">
          {displayVacancies()}
        </div>
      )}
    </div>
  );
}

export default Vacancies;
