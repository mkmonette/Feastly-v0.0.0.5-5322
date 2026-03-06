import React from 'react';
import ContentArea from './ContentArea';
import CartPanel from './CartPanel';

const FreshCartRenderer = () => {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
    }}>
      <div style={{
        flex: 1,
        overflowY: 'auto',
      }}>
        <ContentArea />
      </div>
      <CartPanel />
    </div>
  );
};

export default FreshCartRenderer;
