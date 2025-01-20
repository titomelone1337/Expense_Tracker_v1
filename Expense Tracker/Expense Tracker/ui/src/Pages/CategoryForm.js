import React, { useState } from 'react';
import '../App.css';


const CategoryForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('expense'); // Default type is 'expense'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) onSubmit({ name, type });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit">Add Category</button>
    </form>
  );
};

export default CategoryForm;
