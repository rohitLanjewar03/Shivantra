import React, { useState, useEffect } from 'react';
import { getMenu, getRestaurant } from '../../api/customerApi';
import CategorySection from '../../components/customer/CategorySection';
import Loader from '../../components/admin/Loader';
import Error from '../../components/admin/Error';

function CustomerMenu() {
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [menuData, restaurantData] = await Promise.all([
          getMenu(),
          getRestaurant()
        ]);
        setMenu(menuData);
        setRestaurant(restaurantData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Error message={`Failed to load menu. ${error}`} />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <header className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-8 text-center">
          {restaurant?.logo && (
            <img 
              src={restaurant.logo} 
              alt={`${restaurant.name} logo`}
              className="h-24 w-24 rounded-full mx-auto mb-4 object-cover border-4 border-white dark:border-gray-700 shadow-md"
            />
          )}
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {restaurant?.name || 'Our Menu'}
          </h1>
          {restaurant?.description && (
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
              {restaurant.description}
            </p>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:py-12">
        {menu.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No menu items available right now.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {menu.map((category) => (
              <CategorySection key={category._id} category={category} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
          {restaurant?.address && (
            <p className="mb-2">📍 {restaurant.address}</p>
          )}
          {restaurant?.phone && (
            <p className="mb-2">📞 {restaurant.phone}</p>
          )}
          <p className="text-sm mt-4">
            &copy; {new Date().getFullYear()} {restaurant?.name || 'Our Restaurant'}. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default CustomerMenu;
