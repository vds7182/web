document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/vacancies")
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log("Data received:", data);
      
      const gridContainer = document.getElementById("grid-container");
      
      // Create grid container if it doesn't exist
      if (!gridContainer) {
        const newContainer = document.createElement("div");
        newContainer.id = "grid-container";
        newContainer.className = "vacancy-grid";
        document.body.appendChild(newContainer);
      }
      
      // Clear previous content
      gridContainer.innerHTML = "";
      
      // Create grid items for each vacancy
      data.forEach(vacancy => {
        const gridItem = document.createElement("div");
        gridItem.className = "vacancy-card";
        
        gridItem.innerHTML = `
          <h3>${vacancy.City || "Location not specified"}</h3>
          <p class="salary">$${vacancy.Salary || "Salary not specified"}</p>
          <p class="description">${vacancy.About || "No description available"}</p>
        `;
        
        gridContainer.appendChild(gridItem);
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
      const errorElement = document.createElement("div");
      errorElement.className = "error-message";
      errorElement.textContent = "Failed to load vacancies. Please try again later.";
      document.body.appendChild(errorElement);
    });
});