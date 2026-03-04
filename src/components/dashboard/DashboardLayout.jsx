import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import BusinessLayout from './layouts/BusinessLayout';
import CustomerLayout from './layouts/CustomerLayout';
import RoleOverview from './RoleOverview';
import ProductsView from './business/ProductsView';
import MarketingView from './business/MarketingView';
import BusinessSettings from './business/BusinessSettings';
import CheckoutPaymentsView from './business/CheckoutPaymentsView';
import CheckoutFormSettings from './business/checkout/CheckoutFormSettings';
import PaymentMethodSettings from './business/checkout/PaymentMethodSettings';
import SuccessPageSettings from './business/checkout/SuccessPageSettings';
import TaxSettings from './business/checkout/TaxSettings';
import DeliverySettings from './business/checkout/DeliverySettings';
import ChargesSettings from './business/checkout/ChargesSettings';
import CustomFieldsSettings from './business/checkout/CustomFieldsSettings';
import GeneralCheckoutSettings from './business/checkout/GeneralCheckoutSettings';
import OrderSettings from './business/settings/OrderSettings';
import AccountSettings from './settings/AccountSettings';
import OrdersView from './business/OrdersView';
import CustomerOrdersView from './customer/CustomerOrdersView';
import ShortcodeManagement from './business/ShortcodeManagement';
import LoyaltyProgramSettings from './business/LoyaltyProgramSettings';
import NotificationsView from './business/NotificationsView';
import StorefrontTemplatesPage from './business/StorefrontTemplatesPage';
import StorefrontBuilder from './business/storefront/StorefrontBuilder';
import StorefrontPreview from './business/storefront/StorefrontPreview';
import { NotificationProvider } from '@/context/NotificationContext';
import { ROLES, getDefaultPath } from '@/common/permissions';

const DashboardLayout = ({ role, onLogout }) => {
  return (
    <NotificationProvider>
      <Routes>
        {/* Full-page Storefront Routes - Outside standard layout */}
        <Route path="storefront/templates/:category/:templateSlug/preview" element={<StorefrontPreview />} />
        <Route path="storefront/templates/:category/:templateSlug/edit" element={<StorefrontBuilder />} />

        <Route 
          path="/*"
          element={
            role === ROLES.ADMIN ? (
              <AdminLayout role={role} onLogout={onLogout} />
            ) : role === ROLES.BUSINESS ? (
              <BusinessLayout role={role} onLogout={onLogout} />
            ) : (
              <CustomerLayout role={role} onLogout={onLogout} />
            )
          }
        >
          {/* Admin Specific Routes */}
          {role === ROLES.ADMIN && (
            <>
              <Route path="dashboard" element={<RoleOverview role={role} />} />
              <Route path="products" element={<ProductsView readOnly={true} />} />
              <Route path="marketing" element={<MarketingView readOnly={true} />} />
              <Route path="loyalty-program" element={<LoyaltyProgramSettings />} />
              <Route path="storefront" element={<StorefrontTemplatesPage />} />
              <Route path="notifications" element={<NotificationsView />} />
              <Route path="orders" element={<OrdersView readOnly={true} />} />
              <Route path="settings/account" element={<AccountSettings role={role} />} />
              <Route path="settings/shortcodes" element={<ShortcodeManagement />} />
            </>
          )}

          {/* Business Specific Routes */}
          {role === ROLES.BUSINESS && (
            <>
              <Route path="dashboard" element={<RoleOverview role={role} />} />
              <Route path="products" element={<ProductsView />} />
              <Route path="marketing" element={<MarketingView />} />
              <Route path="loyalty-program" element={<LoyaltyProgramSettings />} />
              <Route path="storefront" element={<StorefrontTemplatesPage />} />
              <Route path="notifications" element={<NotificationsView />} />
              <Route path="orders" element={<OrdersView />} />
              
              <Route path="settings">
                <Route path="business" element={<BusinessSettings />} />
                <Route path="account" element={<AccountSettings role={role} />} />
                <Route path="order" element={<OrderSettings />} />
                <Route path="shortcodes" element={<ShortcodeManagement />} />
                
                <Route path="checkout" element={<CheckoutPaymentsView />}>
                  <Route path="general" element={<GeneralCheckoutSettings />} />
                  <Route path="tax" element={<TaxSettings />} />
                  <Route path="delivery" element={<DeliverySettings />} />
                  <Route path="charges" element={<ChargesSettings />} />
                  <Route path="payments" element={<PaymentMethodSettings />} />
                  <Route path="fields" element={<CustomFieldsSettings />} />
                  <Route path="form" element={<CheckoutFormSettings />} />
                  <Route path="success" element={<SuccessPageSettings />} />
                  <Route index element={<Navigate to="general" replace />} />
                </Route>
                
                <Route index element={<Navigate to="business" replace />} />
              </Route>
            </>
          )}

          {/* Customer Specific Routes */}
          {role === ROLES.CUSTOMER && (
            <>
              <Route path="orders" element={<CustomerOrdersView />} />
              <Route path="settings/account" element={<AccountSettings role={role} />} />
              <Route path="dashboard" element={<Navigate to="/orders" replace />} />
            </>
          )}
          
          <Route path="*" element={<Navigate to={getDefaultPath(role)} replace />} />
        </Route>

        <Route path="/" element={<Navigate to={getDefaultPath(role)} replace />} />
      </Routes>
    </NotificationProvider>
  );
};

export default DashboardLayout;