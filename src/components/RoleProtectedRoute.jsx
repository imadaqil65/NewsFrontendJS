import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import TokenManager from '../apis/TokenManager';

const RoleProtectedRoute = ({ children, role }) => {
  const location = useLocation();
  const claims = TokenManager.getClaims();

  if (!claims || !claims.role.includes(role)) {
    return <Navigate to="/error" state={{ error: `Unauthorized access: ${role} role required` }} replace />;
  }

  return children;
};

export default RoleProtectedRoute;
