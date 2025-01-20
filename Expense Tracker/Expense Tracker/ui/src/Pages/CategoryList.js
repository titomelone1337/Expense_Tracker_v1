import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CategoryList = ({ categories, onDelete, onEdit }) => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleEdit = (category) => {
    onEdit(category); // Call the passed onEdit function (optional)
    navigate(`/categories/edit/${category.id}`); // Navigate to the edit page
  };

  return (
    <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.type}</td>
            <td>
              <button onClick={() => handleEdit(category)}>Edit</button>
              <button onClick={() => onDelete(category.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryList;
