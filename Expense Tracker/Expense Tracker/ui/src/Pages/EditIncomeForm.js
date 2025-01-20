import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditIncomeForm = ({ income, onSubmit, categories }) => {
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  // Populate form fields with income data when income prop changes
  useEffect(() => {
    if (income) {
      setAmount(income.amount);
      setCategoryId(income.category_id);
      setDate(income.date);
      setDescription(income.description);
    }
  }, [income]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedIncome = {
      amount,
      category_id: categoryId,
      date,
      description,
    };

    try {
      await onSubmit(updatedIncome); // Call the onSubmit handler (to update income)
      navigate('/incomes'); // Redirect to the incomes page after successful update
      window.location.reload(); // Optionally, refresh the page
    } catch (error) {
      console.error('Error updating income:', error);
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
          <option value="">Select Category</option>
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

      <button type="submit">Update Income</button>
    </form>
  );
};

export default EditIncomeForm;
