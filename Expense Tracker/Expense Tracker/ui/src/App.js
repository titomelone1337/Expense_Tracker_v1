import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { 
  fetchCategories, 
  fetchExpenses, 
  fetchIncomes, 
  createCategory, 
  deleteCategory, 
  updateCategory, 
  createExpense, 
  updateExpense, 
  deleteExpense, 
  createIncome, 
  updateIncome, 
  deleteIncome 
} from './api';
import CategoryList from './Pages/CategoryList';
import CategoryForm from './Pages/CategoryForm';
import ExpenseList from './Pages/ExpenseList';
import ExpenseForm from './Pages/ExpenseForm';
import IncomeList from './Pages/IncomeList';
import IncomeForm from './Pages/IncomeForm';
import EditCategoryForm from './Pages/EditCategoryForm';
import EditIncomeForm from './Pages/EditIncomeForm';
import EditExpenseForm from './Pages/EditExpenseForm';  
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';  // Import Dashboard

const App = () => {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingIncome, setEditingIncome] = useState(null);

  useEffect(() => {
    fetchCategories().then(data => setCategories(data));
    fetchExpenses().then(data => setExpenses(data));
    fetchIncomes().then(data => setIncomes(data));
  }, []);

  const handleCreateCategory = async (newCategory) => {
    if (editingCategory) {
      const updated = await updateCategory(editingCategory.id, newCategory);
      setCategories(categories.map(cat => (cat.id === updated.id ? updated : cat)));
      setEditingCategory(null);
    } else {
      const created = await createCategory(newCategory);
      setCategories([...categories, created]);
    }
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
  };

  const handleCreateExpense = async (newExpense) => {
    if (editingExpense) {
      const updated = await updateExpense(editingExpense.id, newExpense);
      setExpenses(expenses.map(exp => (exp.id === updated.id ? updated : exp)));
      setEditingExpense(null);
    } else {
      const created = await createExpense(newExpense);
      setExpenses([...expenses, created]);
    }
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  const handleCreateIncome = async (newIncome) => {
    if (editingIncome) {
      const updated = await updateIncome(editingIncome.id, newIncome);
      setIncomes(incomes.map(inc => (inc.id === updated.id ? updated : inc)));
      setEditingIncome(null);
    } else {
      const created = await createIncome(newIncome);
      setIncomes([...incomes, created]);
    }
  };

  const handleDeleteIncome = async (id) => {
    await deleteIncome(id);
    setIncomes(incomes.filter(inc => inc.id !== id));
  };

  const handleEditIncome = (income) => {
    setEditingIncome(income);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Dashboard Route */}
        <Route path="/dashboard" element={
          <Dashboard 
            categories={categories} 
            expenses={expenses} 
            incomes={incomes} 
          />
        } />

        {/* Categories Route */}
        <Route path="/categories" element={
          <>
            <h2>Categories</h2>
            <CategoryForm onSubmit={handleCreateCategory} editingCategory={editingCategory} />
            <CategoryList 
              categories={categories} 
              onDelete={handleDeleteCategory} 
              onEdit={handleEditCategory} 
            />
          </>
        } />

        {/* Expenses Route */}
        <Route path="/expenses" element={
          <>
            <h2>Expenses</h2>
            <ExpenseForm 
              categories={categories} 
              onSubmit={handleCreateExpense} 
              editingExpense={editingExpense} 
            />
            <ExpenseList 
              expenses={expenses} 
              onDelete={handleDeleteExpense} 
              onEdit={handleEditExpense} 
            />
          </>
        } />

        {/* Expense Edit Route */}
        <Route path="/expenses/edit/:id" element={
          <EditExpenseForm 
            expenses={expenses} 
            onSubmit={handleCreateExpense} 
            categories={categories} 
          />
        } />

        {/* Incomes Route */}
        <Route path="/incomes" element={
          <>
            <h2>Incomes</h2>
            <IncomeForm 
              categories={categories} 
              onSubmit={handleCreateIncome} 
              editingIncome={editingIncome} 
            />
            <IncomeList 
              incomes={incomes} 
              onDelete={handleDeleteIncome} 
              onEdit={handleEditIncome} 
            />
          </>
        } />

        {/* Income Edit Route */}
        <Route path="/incomes/edit/:id" element={
          <EditIncomeForm 
            income={editingIncome} 
            onSubmit={handleCreateIncome} 
            categories={categories}
          />
        } />

        {/* Category Edit Route */}
        <Route path="/categories/edit/:id" element={
          <EditCategoryForm 
            category={editingCategory} 
            onSubmit={handleCreateCategory} 
          />
        } />
      </Routes>
    </Router>
  );
};

export default App;
