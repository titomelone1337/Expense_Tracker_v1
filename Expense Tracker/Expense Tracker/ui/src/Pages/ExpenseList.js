import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const navigate = useNavigate(); // Initialize navigate hook

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString(); // Formats to MM/DD/YYYY
  };

  const handleEdit = (expense) => {
    onEdit(expense); // Call the passed onEdit function (optional)
    navigate(`/expenses/edit/${expense.id}`); // Navigate to the edit page
  };

  return (
    <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Category</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.id}</td>
            <td>{expense.amount}</td>
            <td>{expense.description}</td>
            <td>{expense.category_name}</td>
            <td>{formatDate(expense.date)}</td>
            <td>
              <button onClick={() => handleEdit(expense)}>Edit</button>
              <button onClick={() => onDelete(expense.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseList;
