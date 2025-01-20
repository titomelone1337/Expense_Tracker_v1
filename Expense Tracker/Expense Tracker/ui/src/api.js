import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Fetch categories
export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data;
};

// Create a new category
export const createCategory = async (category) => {
  const response = await axios.post(`${BASE_URL}/categories`, category);
  return response.data;
};

// Update a category
export const updateCategory = async (id, updatedCategory) => {
    const response = await axios.put(`${BASE_URL}/categories/${id}`, updatedCategory); // Ensure it's sending to the correct backend
    return response.data;
};

// Delete a category
export const deleteCategory = async (id) => {
  await axios.delete(`${BASE_URL}/categories/${id}`);
};

// Fetch expenses
export const fetchExpenses = async () => {
  const response = await axios.get(`${BASE_URL}/expenses`);
  return response.data;
};

// Create a new expense
export const createExpense = async (expense) => {
  const response = await axios.post(`${BASE_URL}/expenses`, expense);
  return response.data;
};

// Update an expense
export const updateExpense = async (id, updatedExpense) => {
  const response = await axios.put(`${BASE_URL}/expenses/${id}`, updatedExpense);
  return response.data;
};

// Delete an expense
export const deleteExpense = async (id) => {
  await axios.delete(`${BASE_URL}/expenses/${id}`);
};

// Fetch incomes
export const fetchIncomes = async () => {
  const response = await axios.get(`${BASE_URL}/incomes`);
  return response.data;
};

// Create a new income
export const createIncome = async (income) => {
  const response = await axios.post(`${BASE_URL}/incomes`, income);
  return response.data;
};

// Update an income
export const updateIncome = async (id, updatedIncome) => {
  const response = await axios.put(`${BASE_URL}/incomes/${id}`, updatedIncome);
  return response.data;
};

// Delete an income
export const deleteIncome = async (id) => {
  await axios.delete(`${BASE_URL}/incomes/${id}`);
};
