const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./src/config/db');

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/quiz', require('./src/routes/quizRoutes'));
app.use('/api/user', require('./src/routes/userRoutes'));

// ✅ Health check
app.get('/', (req, res) => {
res.json({ message: '🎮 Quiz API is running!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

