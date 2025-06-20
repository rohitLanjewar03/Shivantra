import React from 'react';
import { Link } from 'react-router-dom';
import CategoryManager from '../components/admin/CategoryManager';
import MenuItemManager from '../components/admin/MenuItemManager';

function AdminDashboard() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Admin Dashboard</h1>
          <Link
            to="/admin/settings"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
          >
            Restaurant Settings
          </Link>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <CategoryManager />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <MenuItemManager />
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
