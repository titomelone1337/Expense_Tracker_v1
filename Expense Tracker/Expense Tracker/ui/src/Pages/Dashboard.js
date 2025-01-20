// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  // Fetch categories, expenses, and incomes on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:5000/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    };

    const fetchExpenses = async () => {
      const response = await fetch('http://localhost:5000/expenses');
      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      }
    };

    const fetchIncomes = async () => {
      const response = await fetch('http://localhost:5000/incomes');
      if (response.ok) {
        const data = await response.json();
        setIncomes(data);
      }
    };

    fetchCategories();
    fetchExpenses();
    fetchIncomes();
  }, []);

  // Calculate total expenses and incomes
  const totalExpenses = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
  const totalIncomes = incomes.reduce((acc, income) => acc + parseFloat(income.amount), 0);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="categories-section">
        <h3>Categories</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={`/categories`}>{category.name} ({category.type})</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="overview">
        <h3>Overview</h3>
        <p>Total Expenses: {totalExpenses.toFixed(2)}€</p>
        <p>Total Incomes: {totalIncomes.toFixed(2)}€</p>
      </div>

      <div className="recent-items">
        <h3>Recent Expenses</h3>
        <ul>
          {expenses.slice(0, 5).map((expense) => (
            <li key={expense.id}>
              <span>{expense.description}</span> - <span>{expense.amount}€</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="recent-items">
        <h3>Recent Incomes</h3>
        <ul>
          {incomes.slice(0, 5).map((income) => (
            <li key={income.id}>
              <span>{income.description}</span> - <span>{income.amount}€</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
