import React from 'react';
import { Navigate } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import { ROLES, getDefaultPath } from '@/common/permissions';

const BusinessLayout = ({ role, onLogout }) => {
  // Explicit Role Guard: Ensure only Business users can render this layout
  if (role !== ROLES.BUSINESS) {
    console.warn(`Unauthorized access attempt to BusinessLayout by role: ${role}`);
    return <Navigate to={getDefaultPath(role)} replace />;
  }

  return <BaseLayout role={role} onLogout={onLogout} />;
};

export default BusinessLayout;