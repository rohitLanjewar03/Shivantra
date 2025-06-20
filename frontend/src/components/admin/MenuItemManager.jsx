import React, { useState, useEffect } from 'react';
import { getItems, createItem, updateItem, deleteItem, getCategories } from '../../api/adminApi';
import MenuItemForm from './MenuItemForm';
import Loader from './Loader';
import Error from './Error';

function MenuItemManager() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [itemsData, categoriesData] = await Promise.all([getItems(), getCategories()]);
      setItems(itemsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (values) => {
    try {
      await createItem(values);
      setShowForm(false);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleEdit = (item) => {
    setEditing(item);
    setShowForm(true);
  };

  const handleUpdate = async (values) => {
    try {
      await updateItem(editing._id, values);
      setEditing(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await deleteItem(id);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Menu Items</h2>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 flex items-center"
          onClick={() => { setShowForm(true); setEditing(null); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Menu Item
        </button>
      </div>

      {loading && <Loader />}
      <Error message={error} />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg">
            <MenuItemForm
              initialValues={editing || { name: '', description: '', price: '', category: '', available: true }}
              categories={categories}
              onSubmit={editing ? handleUpdate : handleAdd}
              onCancel={() => { setShowForm(false); setEditing(null); }}
            />
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center justify-between">
            <div className="flex-grow">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              <div className="flex items-center mt-2">
                <span className="text-gray-800 dark:text-gray-200 font-bold">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price)}
                </span>
                {item.category?.name && (
                  <span className="ml-4 text-sm text-indigo-800 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-900/50 px-2 py-1 rounded-full">
                    {item.category.name}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <button
                className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                onClick={() => handleEdit(item)}
                title="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                onClick={() => handleDelete(item._id)}
                title="Delete"
              >
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

export default MenuItemManager;
