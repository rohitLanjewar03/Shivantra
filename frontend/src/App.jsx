import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CustomerMenu from './pages/customer/CustomerMenu';
import AdminDashboard from './pages/AdminDashboard';
import RestaurantSettingsPage from './pages/RestaurantSettingsPage';
import './index.css';

function App() {
  return (
    <>
      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: 'var(--bg)',
            color: 'var(--text)',
            border: '1px solid var(--primary)',
          }
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<CustomerMenu />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/settings" element={<RestaurantSettingsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
