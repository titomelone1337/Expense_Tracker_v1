const pool = require('../models/db');

// Get all incomes
exports.getIncomes = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT incomes.*, categories.name AS categoryName
      FROM incomes
      JOIN categories ON incomes.category_id = categories.id
    `);
    res.json(result.rows);  // Sends the incomes array with category names
  } catch (err) {
    console.error("Error fetching incomes:", err.message);
    res.status(500).send('Server error');
  }
};

// Create a new income
exports.createIncome = async (req, res) => {
  const { amount, description, category_id, date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO incomes (amount, description, category_id, date) VALUES ($1, $2, $3, $4) RETURNING *',
      [amount, description, category_id, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update an income
exports.updateIncome = async (req, res) => {
  const { id } = req.params;
  const { amount, description, category_id, date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE incomes SET amount = $1, description = $2, category_id = $3, date = $4 WHERE id = $5 RETURNING *',
      [amount, description, category_id, date, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).send('Income not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete an income
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM incomes WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).send('Income not found');
    }
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
