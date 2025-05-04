const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Видаємо статичні файли з React'у
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Для всіх інших запитів повертаємо index.html (для SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
