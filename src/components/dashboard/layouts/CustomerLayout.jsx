import React from 'react';
import { Navigate } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import { ROLES, getDefaultPath } from '@/common/permissions';

const CustomerLayout = ({ role, onLogout }) => {
  // Explicit Role Guard: Ensure only Customers can render this layout
  if (role !== ROLES.CUSTOMER) {
    console.warn(`Unauthorized access attempt to CustomerLayout by role: ${role}`);
    return <Navigate to={getDefaultPath(role)} replace />;
  }

  return <BaseLayout role={role} onLogout={onLogout} />;
};

export default CustomerLayout;