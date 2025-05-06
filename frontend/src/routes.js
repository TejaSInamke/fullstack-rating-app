import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import UserDashboard from './pages/UserDashboard';
import StoreList from './pages/StoreList';
import StoreDetails from './pages/StoreDetails';
import PrivateRoute from './utils/PrivateRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<StoreList />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/admin"
      element={
        <PrivateRoute roles={['admin']}>
          <AdminDashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/owner"
      element={
        <PrivateRoute roles={['owner']}>
          <OwnerDashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/user"
      element={
        <PrivateRoute roles={['user']}>
          <UserDashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/store/:id"
      element={
        <PrivateRoute roles={['user']}>
          <StoreDetails />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
