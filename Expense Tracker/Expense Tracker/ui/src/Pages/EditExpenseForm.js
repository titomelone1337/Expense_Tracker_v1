import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditExpenseForm = ({ categories, onSubmit, expenses }) => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();

  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  // Fetch the expense details based on the id
  useEffect(() => {
    const expense = expenses.find((exp) => exp.id === parseInt(id)); // Find the expense by ID
    if (expense) {
      setAmount(expense.amount);
      setCategoryId(expense.category_id);
      setDate(expense.date);
      setDescription(expense.description);
    }
  }, [id, expenses]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const updatedExpense = {
      amount,
      category_id: categoryId,
      date,
      description,
    };

    try {
      await onSubmit(updatedExpense); // Submit the updated expense data
      navigate('/expenses'); // Redirect to the expenses page after update
      window.location.reload(); // Refresh the page to see the updated expense
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
      </div>

      <div>
        <label>Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (Optional)"
        />
      </div>

      <button type="submit">Update Expense</button>
    </form>
  );
};

export default EditExpenseForm;
