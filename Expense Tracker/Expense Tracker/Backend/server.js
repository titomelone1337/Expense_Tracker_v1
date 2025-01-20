const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const pool = require('./models/db'); // PostgreSQL connection
const categoryRoutes = require('./routes/categories'); // Categories routes
const expenseRoutes = require('./routes/expenses'); // Expenses routes
const incomeRoutes = require('./routes/incomes'); // Incomes routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.use('/categories', categoryRoutes);
app.use('/expenses', expenseRoutes);
app.use('/incomes', incomeRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Welcome to the Expense Tracker API!');
});

// Test Database Connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).send(`Database connected: ${result.rows[0].now}`);
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send('Database connection failed');
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
