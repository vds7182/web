import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import { db } from './firebase-db.js'; // Import the Firebase database connection

import dotenv from 'dotenv';
dotenv.config({ path: './idk.env' });


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 🔹 Fetch applications for a specific user
app.get('/applications/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db.collection('apply').where('userId', '==', userId).get();
    const applications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ error: 'Failed to fetch user applications' });
  }
});

// 🔹 Add new application
app.post('/applications', async (req, res) => {
  try {
    const newApplication = req.body;
    const docRef = await db.collection('apply').add(newApplication);
    res.json({ id: docRef.id, message: 'Application successfully added!' });
  } catch (err) {
    console.error('Error adding application:', err);
    res.status(500).json({ error: 'Failed to add application' });
  }
});

// 🔹 Fetch user details by userId
app.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userSnap = await db.collection('users').doc(userId).get();

    if (!userSnap.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ id: userId, ...userSnap.data() });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// 🔹 Add or update user details
app.post('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = req.body;

    await db.collection('users').doc(userId).set(userData, { merge: true });

    res.json({ id: userId, message: 'User successfully stored!' });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// 🔹 Serve static frontend files (React or other SPA)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// 🔹 Wildcard route to handle frontend navigation
app.use((req, res, next) => {
  if (req.path.startsWith('/user') || req.path.startsWith('/applications')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// 🔹 Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
});
