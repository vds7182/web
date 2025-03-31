const http = require("http");
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

// Database connection (unchanged)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Marvel229",
  database: "web"
});

// HTTP server
const server = http.createServer((req, res) => {
  const url = req.url;

  // API endpoint: /vacancies
  if (url === "/vacancies" && req.method === "GET") {
    const query = "SELECT idVacant, Salary, City, About FROM Vacant"; // ✅ Fixed table name
    db.query(query, (err, results) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Database error" }));
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(results));
    });
  }
  // Serve static files (main.html, etc.)
  else {
    let filename = path.join(__dirname, url === "/" ? "main.html" : url);
    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));