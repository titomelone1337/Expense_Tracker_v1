const express = require('express');
const router = express.Router();
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expensesController');

// GET all expenses
router.get('/', getExpenses);

// POST a new expense
router.post('/', createExpense);

// PUT (update) an existing expense
router.put('/:id', updateExpense);

// DELETE an expense
router.delete('/:id', deleteExpense);

module.exports = router;
