const pool = require('../models/db');

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        expenses.id, 
        expenses.amount, 
        expenses.description, 
        expenses.date, 
        categories.name AS category_name 
      FROM 
        expenses 
      LEFT JOIN 
        categories 
      ON 
        expenses.category_id = categories.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create a new expense
exports.createExpense = async (req, res) => {
  const { amount, description, category_id, date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO expenses (amount, description, category_id, date) VALUES ($1, $2, $3, $4) RETURNING *',
      [amount, description, category_id, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, description, category_id, date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE expenses SET amount = $1, description = $2, category_id = $3, date = $4 WHERE id = $5 RETURNING *',
      [amount, description, category_id, date, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).send('Expense not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).send('Expense not found');
    }
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
