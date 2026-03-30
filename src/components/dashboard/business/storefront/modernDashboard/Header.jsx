import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernDashboard } from './ModernDashboardContext';

const Header = () => {
  const { settings, searchQuery, setSearchQuery, cartItemCount } = useModernDashboard();
  const { tokens } = settings;

  if (!settings.sections.header.visible) return null;

  return (
    <header
      style={{
        backgroundColor: tokens.headerBackground,
        borderBottom: `1px solid ${tokens.borderColor}`,
        boxShadow: tokens.shadowSm,
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: `${tokens.spacing.lg} ${tokens.spacing.xl}`,
          display: 'flex',
          alignItems: 'center',
          gap: tokens.spacing.xl
        }}
      >
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: tokens.spacing.sm,
            color: tokens.primaryTextColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <SafeIcon icon={FiIcons.FiMenu} size={24} />
        </button>

        <div style={{ flex: 1, maxWidth: '600px' }}>
          <div
            style={{
              position: 'relative',
              width: '100%'
            }}
          >
            <SafeIcon
              icon={FiIcons.FiSearch}
              style={{
                position: 'absolute',
                left: tokens.spacing.lg,
                top: '50%',
                transform: 'translateY(-50%)',
                color: tokens.sectionTextColor,
                pointerEvents: 'none'
              }}
              size={20}
            />
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: `${tokens.spacing.md} ${tokens.spacing.lg} ${tokens.spacing.md} calc(${tokens.spacing.lg} * 2.5)`,
                backgroundColor: tokens.searchBarBackground,
                border: 'none',
                borderRadius: tokens.borderRadius,
                fontSize: tokens.fontSize.sm,
                color: tokens.primaryTextColor,
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.backgroundColor = tokens.cardBackground;
                e.target.style.boxShadow = tokens.shadowMd;
              }}
              onBlur={(e) => {
                e.target.style.backgroundColor = tokens.searchBarBackground;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacing.lg
          }}
        >
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: tokens.spacing.sm,
              color: tokens.primaryTextColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <SafeIcon icon={FiIcons.FiUser} size={22} />
          </button>

          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: tokens.spacing.sm,
              color: tokens.primaryTextColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <SafeIcon icon={FiIcons.FiShoppingCart} size={22} />
            {cartItemCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  backgroundColor: tokens.accentColor,
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: tokens.fontWeight.bold
                }}
              >
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
