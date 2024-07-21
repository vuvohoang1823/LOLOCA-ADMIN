import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';
import './index.css';
import App from './App';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import City from './pages/City';
import Tour from './pages/Tour';
import Payment from './pages/Payment';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';

const clearLocalStorageOnFirstRun = () => {
  if (!localStorage.getItem('isFirstRun')) {
    localStorage.clear();
    localStorage.setItem('isFirstRun', 'true');
  }
};

clearLocalStorageOnFirstRun();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Navigate to="/signin" replace />} />
            <Route path="/" element={<App />}>
              <Route
                path="dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="user-management"
                element={
                  <PrivateRoute>
                    <UserManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="city"
                element={
                  <PrivateRoute>
                    <City />
                  </PrivateRoute>
                }
              />
              <Route
                path="tour"
                element={
                  <PrivateRoute>
                    <Tour />
                  </PrivateRoute>
                }
              />
              <Route
                path="payment"
                element={
                  <PrivateRoute>
                    <Payment />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
