import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../api/adminApi';
import CategoryForm from './CategoryForm';
import Loader from './Loader';
import Error from './Error';

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch {
      setError('Failed to fetch categories. Please try again later.');
      toast.error('Failed to fetch categories.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category and all its items?')) {
      try {
        await deleteCategory(id);
        toast.success('Category deleted successfully!');
        fetchCategories();
      } catch (err) {
        toast.error(err.message || 'Failed to delete category.');
      }
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id, data);
        toast.success('Category updated successfully!');
      } else {
        await createCategory(data);
        toast.success('Category created successfully!');
      }
      fetchCategories();
      setIsFormVisible(false);
      setEditingCategory(null);
    } catch (err) {
      toast.error(err.message || 'An error occurred.');
    }
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingCategory(null);
  };

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <div className="bg-[var(--admin-bg-secondary)] p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-serif">Categories</h2>
        {!isFormVisible && (
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-[var(--admin-primary)] text-white rounded-lg hover:opacity-90"
          >
            + Add Category
          </button>
        )}
      </div>

      {isFormVisible ? (
        <CategoryForm
          initialValues={editingCategory || {}}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <ul className="space-y-4">
          {categories.map(category => (
            <li key={category._id} className="p-4 bg-[var(--admin-bg)] rounded-lg flex justify-between items-center">
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryManager;
