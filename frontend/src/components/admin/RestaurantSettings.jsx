import React, { useState, useEffect } from 'react';
import { getRestaurant, updateRestaurant, createRestaurant } from '../../api/adminApi';
import RestaurantSettingsForm from './RestaurantSettingsForm';
import Loader from './Loader';
import Error from './Error';

function RestaurantSettings() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const loadRestaurant = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRestaurant();
      setRestaurant(data);
      setIsCreateMode(false);
    } catch (err) {
      if (err.message.includes('404') || err.message.includes('Not Found')) {
        // If not found, switch to create mode
        setIsCreateMode(true);
        setRestaurant({}); // Start with empty data
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRestaurant();
  }, []);

  const handleSave = async (formData) => {
    try {
      setError(null);
      if (isCreateMode) {
        await createRestaurant(formData);
        alert('Restaurant profile created successfully!');
      } else {
        await updateRestaurant(restaurant._id, formData);
        alert('Settings saved successfully!');
      }
      loadRestaurant(); // Refresh data and switch to edit mode
    } catch (err) {
      setError(err.message);
      alert('Failed to save settings.');
    }
  };

  if (loading) return <Loader />;
  if (error && !isCreateMode) return <Error message={error} />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        {isCreateMode ? 'Create Restaurant Profile' : 'Edit Restaurant Profile'}
      </h2>
      <RestaurantSettingsForm
        initialData={restaurant}
        onSave={handleSave}
        isCreateMode={isCreateMode}
      />
    </div>
  );
}

export default RestaurantSettings; 