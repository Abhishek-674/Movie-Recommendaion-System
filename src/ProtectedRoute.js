// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state.user); // Get user info from Redux store

  // Check if the user is authenticated
  if (!user) {
    return <Navigate to="/" />; // Redirect to the landing page if not authenticated
  }

  return element; // Render the requested component if authenticated
};

export default ProtectedRoute;
