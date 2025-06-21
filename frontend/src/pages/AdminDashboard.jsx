import React from 'react';
import { Link } from 'react-router-dom';
import CategoryManager from '../components/admin/CategoryManager';
import MenuItemManager from '../components/admin/MenuItemManager';
import ThemeToggleButton from '../components/ThemeToggleButton';

function AdminDashboard() {
  return (
    <div className="bg-[var(--admin-bg)] text-[var(--admin-text)] min-h-screen font-sans">
      <header className="bg-[var(--admin-header-bg)] shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Link
              to="/admin/settings"
              className="px-4 py-2 bg-[var(--admin-primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Restaurant Settings
            </Link>
            <ThemeToggleButton />
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-[var(--admin-card-bg)] rounded-lg shadow-lg p-6">
            <CategoryManager />
          </div>
          <div className="bg-[var(--admin-card-bg)] rounded-lg shadow-lg p-6">
            <MenuItemManager />
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
