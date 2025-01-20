const express = require('express');
const router = express.Router();
const {
  getIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
} = require('../controllers/incomesController');

// GET all incomes
router.get('/', getIncomes);

// POST a new income
router.post('/', createIncome);

// PUT (update) an existing income
router.put('/:id', updateIncome);

// DELETE an income
router.delete('/:id', deleteIncome);

module.exports = router;
