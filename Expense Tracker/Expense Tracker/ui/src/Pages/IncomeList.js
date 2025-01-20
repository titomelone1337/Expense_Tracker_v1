import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const IncomeList = ({ incomes, onEdit, onDelete }) => {
  const navigate = useNavigate(); // Initialize navigate hook

  // Helper function to format date
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString(); // Formats to MM/DD/YYYY
  };

  const handleEdit = (income) => {
    onEdit(income); // Call the passed onEdit function (optional)
    navigate(`/incomes/edit/${income.id}`); // Navigate to the edit page
  };
  console.log(incomes);

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
  {incomes.map((income) => (
    <tr key={income.id}>
      <td>{income.id}</td>
      <td>{income.amount}</td>
      <td>{income.description}</td>
      <td>{income.categoryname}</td> {/* Corrected to categoryName */}
      <td>{formatDate(income.date)}</td>
      <td>
        <button onClick={() => handleEdit(income)}>Edit</button>
        <button onClick={() => onDelete(income.id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>

    </table>
  );
};

export default IncomeList;
