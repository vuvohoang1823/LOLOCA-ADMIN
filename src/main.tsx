import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import City from './pages/City';
import Tour from './pages/Tour';
import Payment from './pages/Payment';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="city" element={<City />} />
          <Route path="tour" element={<Tour />} />
          <Route path="payment" element={<Payment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
