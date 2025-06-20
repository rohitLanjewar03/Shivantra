import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerMenu from './pages/customer/CustomerMenu';
import AdminDashboard from './pages/AdminDashboard';
import RestaurantSettingsPage from './pages/RestaurantSettingsPage';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/settings" element={<RestaurantSettingsPage />} />
          <Route path="/" element={<CustomerMenu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
