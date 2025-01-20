import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditCategoryForm = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const navigate = useNavigate(); // To navigate after successful update

  // Add loading and error states
  const [category, setCategory] = useState({ name: '', type: '' }); // State for category
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch the category data when the component mounts
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/categories/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category');
        }

        const data = await response.json();
        console.log('Fetched category data:', data); // Debug log to check the data
        setCategory({ name: data.name, type: data.type });
      } catch (error) {
        setError(error.message);
        console.error('Error fetching category:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]); // Runs whenever the 'id' changes

  // Handle form submission to update the category
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const response = await fetch(`http://localhost:5000/categories/${id}`, { 
      method: 'PUT', // HTTP method is PUT
      headers: {
        'Content-Type': 'application/json', // Content type for the request
      },
      body: JSON.stringify({ name: category.name, type: category.type }), // Data to be updated
    });

    if (response.ok) {
      navigate('/categories'); // Redirect to /categories after successful update
      window.location.reload(); // Refresh the page after redirection
    } else {
      console.error('Error updating category');
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  // Show loading or error message if needed
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category ID</label>
          <input type="text" value={id} readOnly /> {/* ID is read-only */}
        </div>
        <div>
          <label>Category Name</label>
          <input
            type="text"
            name="name"
            value={category.name} // This should be populated with category.name
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Category Type</label>
          <select
            name="type"
            value={category.type}
            onChange={handleInputChange}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <button type="submit">Update Category</button>
      </form>
    </div>
  );
};

export default EditCategoryForm;
