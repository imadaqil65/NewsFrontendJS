import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import TokenManager from '../apis/TokenManager';

const LoginProtectedRoute = ({ children }) => {
  const claims = TokenManager.getClaims();
  const location = useLocation();
  
  if (claims) {
    const previousLocation = location.state?.from || '/';
    return <Navigate to={previousLocation} replace />;
  }

  return children;
};

export default LoginProtectedRoute;

