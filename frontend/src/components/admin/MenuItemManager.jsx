import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getItems as getMenuItems, createItem as createMenuItem, updateItem as updateMenuItem, deleteItem as deleteMenuItem, getCategories } from '../../api/adminApi';
import MenuItemForm from './MenuItemForm';
import Loader from './Loader';
import Error from './Error';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

function MenuItemManager() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [itemsData, categoriesData] = await Promise.all([
        getMenuItems(),
        getCategories()
      ]);
      setMenuItems(itemsData);
      setCategories(categoriesData);
    } catch {
      setError('Failed to fetch data. Please try again.');
      toast.error('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFormSubmit = async (itemData) => {
    try {
      if (editingItem) {
        await updateMenuItem(editingItem._id, itemData);
        toast.success('Menu item updated successfully!');
      } else {
        await createMenuItem(itemData);
        toast.success('Menu item created successfully!');
      }
      fetchData();
      setIsFormVisible(false);
      setEditingItem(null);
    } catch (err) {
      toast.error(err.message || 'An error occurred.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await deleteMenuItem(id);
        toast.success('Menu item deleted successfully!');
        fetchData();
      } catch (err) {
        toast.error(err.message || 'Failed to delete item.');
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsFormVisible(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingItem(null);
  };
  
  const getCategoryName = (category) => {
    if (!category) return 'Uncategorized';
    if (typeof category === 'object' && category.name) return category.name;
    const found = categories.find(cat => cat._id === category);
    return found ? found.name : 'Uncategorized';
  };

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  return (
    <div className="bg-[var(--admin-bg-secondary)] p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-serif">Menu Items</h2>
        {!isFormVisible && (
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-[var(--admin-primary)] text-white rounded-lg hover:opacity-90"
          >
            + Add Menu Item
          </button>
        )}
      </div>

      {isFormVisible ? (
        <MenuItemForm
          initialValues={editingItem || { available: true }}
          categories={categories}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <div key={item._id} className="bg-[var(--admin-bg)] p-4 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                {item.image && <img src={item.image.replace("http://localhost:5000/", "")} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />}
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-[var(--admin-text-secondary)]">{item.description}</p>
                <p className="mt-2 font-semibold">₹{item.price}</p>
                <p className="text-sm text-[var(--admin-text-secondary)]">Category: {getCategoryName(item.category)}</p>
                <p className={`text-sm font-medium ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                  {item.available ? 'Available' : 'Not Available'}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => handleEdit(item)} className="p-2 text-[var(--admin-text-secondary)] hover:text-[var(--admin-primary)]">
                  <FiEdit size={18} />
                </button>
                <button onClick={() => handleDelete(item._id)} className="p-2 text-[var(--admin-text-secondary)] hover:text-red-500">
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuItemManager;
