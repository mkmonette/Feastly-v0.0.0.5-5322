/**
 * Role-based permission configuration
 * This centralizes access control logic to make it easily extendable.
 */

export const ROLES = {
  ADMIN: 'Admin',
  BUSINESS: 'Business',
  CUSTOMER: 'Customer',
};

export const PERMISSIONS = {
  VIEW_BUSINESS_SETTINGS: 'view_business_settings',
  VIEW_ACCOUNT_SETTINGS: 'view_account_settings',
  MANAGE_PRODUCTS: 'manage_products',
  VIEW_PRODUCTS: 'view_products', // Support mode
  MANAGE_MARKETING: 'manage_marketing',
  VIEW_MARKETING: 'view_marketing', // Support mode
  VIEW_ORDERS: 'view_orders',
  VIEW_OVERVIEW: 'view_overview',
};

const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.VIEW_OVERVIEW,
    PERMISSIONS.VIEW_ACCOUNT_SETTINGS,
    PERMISSIONS.VIEW_PRODUCTS,   // Enabled for auditing/support
    PERMISSIONS.VIEW_MARKETING,  // Enabled for auditing/support
    PERMISSIONS.VIEW_ORDERS,     // Admins can view all orders
  ],
  [ROLES.BUSINESS]: [
    PERMISSIONS.VIEW_OVERVIEW,
    PERMISSIONS.VIEW_BUSINESS_SETTINGS,
    PERMISSIONS.VIEW_ACCOUNT_SETTINGS,
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.MANAGE_MARKETING,
    PERMISSIONS.VIEW_MARKETING,
    PERMISSIONS.VIEW_ORDERS,
  ],
  [ROLES.CUSTOMER]: [
    PERMISSIONS.VIEW_ACCOUNT_SETTINGS,
    PERMISSIONS.VIEW_ORDERS,
  ],
};

/**
 * Check if a role has a specific permission
 */
export const hasPermission = (role, permission) => {
  return ROLE_PERMISSIONS[role]?.includes(permission) || false;
};

/**
 * Check if a role can access a specific path
 */
export const canAccessPath = (role, path) => {
  if (path === '/settings/business') return hasPermission(role, PERMISSIONS.VIEW_BUSINESS_SETTINGS);
  if (path === '/settings/account') return hasPermission(role, PERMISSIONS.VIEW_ACCOUNT_SETTINGS);
  
  if (path === '/dashboard') return hasPermission(role, PERMISSIONS.VIEW_OVERVIEW);
  
  if (path === '/products') {
    return hasPermission(role, PERMISSIONS.MANAGE_PRODUCTS) || hasPermission(role, PERMISSIONS.VIEW_PRODUCTS);
  }
  
  if (path === '/marketing') {
    return hasPermission(role, PERMISSIONS.MANAGE_MARKETING) || hasPermission(role, PERMISSIONS.VIEW_MARKETING);
  }
  
  if (path === '/orders') return hasPermission(role, PERMISSIONS.VIEW_ORDERS);
  
  if (path === '/settings') {
    return hasPermission(role, PERMISSIONS.VIEW_BUSINESS_SETTINGS) || 
           hasPermission(role, PERMISSIONS.VIEW_ACCOUNT_SETTINGS);
  }

  return true;
};

/**
 * Get the default landing page for a role
 */
export const getDefaultPath = (role) => {
  switch (role) {
    case ROLES.ADMIN:
    case ROLES.BUSINESS:
      return '/dashboard';
    case ROLES.CUSTOMER:
      return '/orders';
    default:
      return '/dashboard';
  }
};