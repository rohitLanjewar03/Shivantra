import React, { useEffect, useState } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../api/adminApi';
import CategoryForm from './CategoryForm';
import Loader from './Loader';
import Error from './Error';

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category and all its items?')) {
      await deleteCategory(id);
      fetchCategories();
    }
  };

  const handleFormSubmit = async (data) => {
    if (editingCategory) {
      await updateCategory(editingCategory._id, data);
    } else {
      await createCategory(data);
    }
    fetchCategories();
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  if (showForm) {
    return (
      <CategoryForm
        initialValues={editingCategory || {}}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-serif">Categories</h2>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-[var(--admin-primary)] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Category</span>
        </button>
      </div>

      {loading && <Loader />}
      <Error message={error} />

      <div className="space-y-3">
        {categories.map(category => (
          <div key={category._id} className="p-4 bg-[var(--admin-bg)] rounded-lg flex justify-between items-center">
            <div>
              <p className="font-semibold">{category.name}</p>
              <p className="text-sm text-[var(--admin-text-secondary)]">{category.description}</p>
            </div>
            <div className="flex items-center space-x-2 text-[var(--admin-text-secondary)]">
              <button onClick={() => handleEdit(category)} className="p-2 hover:text-[var(--admin-edit)]" title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
              </button>
              <button onClick={() => handleDelete(category._id)} className="p-2 hover:text-[var(--admin-delete)]" title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryManager;
