import React from 'react';
import { Link } from 'react-router-dom';
import RestaurantSettings from '../components/admin/RestaurantSettings';

function RestaurantSettingsPage() {
  return (
    <div className="bg-[var(--admin-bg)] text-[var(--admin-text)] min-h-screen font-sans">
      <header className="bg-[var(--admin-header-bg)] shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Restaurant Settings</h1>
          <Link
            to="/admin"
            className="px-4 py-2 bg-[var(--admin-primary)] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <RestaurantSettings />
        </div>
      </main>
    </div>
  );
}

export default RestaurantSettingsPage; 