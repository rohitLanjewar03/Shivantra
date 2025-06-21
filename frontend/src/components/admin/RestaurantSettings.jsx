import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getRestaurant, updateRestaurant, createRestaurant } from '../../api/adminApi';
import RestaurantSettingsForm from './RestaurantSettingsForm';
import Loader from './Loader';
import Error from './Error';

function RestaurantSettings() {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateMode, setIsCreateMode] = useState(false);

  const loadRestaurant = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getRestaurant();
      setRestaurant(data);
      setIsCreateMode(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setIsCreateMode(true);
      } else {
        setError(err.message || 'Failed to load restaurant profile.');
        toast.error('Failed to load restaurant profile.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRestaurant();
  }, [loadRestaurant]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (isCreateMode) {
        await createRestaurant(formData);
        toast.success('Restaurant profile created successfully!');
      } else {
        await updateRestaurant(restaurant._id, formData);
        toast.success('Settings updated successfully!');
      }
      await loadRestaurant(); // Refresh data
    } catch (err) {
      toast.error(err.message || 'Failed to save settings.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error && !isCreateMode) return <Error message={error} />;

  return (
    <div className="bg-[var(--admin-card-bg)] rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold font-serif mb-6">
        {isCreateMode ? 'Create Restaurant Profile' : 'Edit Restaurant Profile'}
      </h2>
      <RestaurantSettingsForm
        initialData={restaurant}
        onSave={handleSubmit}
        isCreateMode={isCreateMode}
      />
    </div>
  );
}

export default RestaurantSettings; 