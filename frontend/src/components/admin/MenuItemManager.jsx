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
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [itemData, categoryData] = await Promise.all([
        getItems(),
        getCategories()
      ]);
      setItems(itemData);
      setCategories(categoryData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      await deleteItem(id);
      fetchData();
    }
  };

  const handleFormSubmit = async (data) => {
    if (editingItem) {
      await updateItem(editingItem._id, data);
    } else {
      await createItem(data);
    }
    fetchData();
    setShowForm(false);
    setEditingItem(null);
  };
  
  const handleAddNew = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);

  if (showForm) {
    return (
      <MenuItemForm
        initialValues={editingItem || {}}
        categories={categories}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-serif">Menu Items</h2>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-[var(--admin-primary)] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Menu Item</span>
        </button>
      </div>

      {loading && <Loader />}
      <Error message={error} />

      <div className="space-y-3">
        {items.map(item => (
          <div key={item._id} className="p-4 bg-[var(--admin-bg)] rounded-lg flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {item.image && <img src={`http://localhost:5000${item.image}`} alt={item.name} className="w-16 h-16 rounded-md object-cover"/>}
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-[var(--admin-text-secondary)]">{item.category?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-semibold">{formatPrice(item.price)}</span>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(item)} className="p-2 bg-[var(--admin-edit)] text-white rounded-md hover:opacity-90">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="p-2 bg-[var(--admin-delete)] text-white rounded-md hover:opacity-90">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuItemManager;
