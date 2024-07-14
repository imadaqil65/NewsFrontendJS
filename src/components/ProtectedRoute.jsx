import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import TokenManager from '../apis/TokenManager';

const ProtectedRoute = ({ children }) => {
  const claims = TokenManager.getClaims();
  const location = useLocation();
  
  if (!claims) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
