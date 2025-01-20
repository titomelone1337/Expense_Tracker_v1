const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from the .env file

// Create a new PostgreSQL connection pool using the DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Event listener for successful connection
pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
  // Test a simple query to check the connection
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Database connection test failed', err.stack);
    } else {
      console.log('Database connection test successful', res.rows);
    }
  });
});

// Handle errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err);
  process.exit(-1);
});

module.exports = pool;
