import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from './auth';

const PrivateRoute = ({ children, roles }) => {
  const user = getUser();

  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

export default PrivateRoute;
