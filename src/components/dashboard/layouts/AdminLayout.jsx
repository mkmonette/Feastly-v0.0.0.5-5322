import React from 'react';
import { Navigate } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import { ROLES, getDefaultPath } from '@/common/permissions';

const AdminLayout = ({ role, onLogout }) => {
  // Explicit Role Guard: Ensure only Admins can render this layout
  if (role !== ROLES.ADMIN) {
    console.warn(`Unauthorized access attempt to AdminLayout by role: ${role}`);
    return <Navigate to={getDefaultPath(role)} replace />;
  }

  return <BaseLayout role={role} onLogout={onLogout} />;
};

export default AdminLayout;