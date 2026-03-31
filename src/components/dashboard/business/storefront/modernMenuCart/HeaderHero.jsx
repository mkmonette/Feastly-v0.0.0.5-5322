import React from 'react';
import { useModernMenuCart } from './ModernMenuCartContext';
import { FiSearch, FiMenu, FiShoppingCart } from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

export default function HeaderHero() {
  const { tokens, businessData, sectionsConfig, cartCount } = useModernMenuCart();
  const section = sectionsConfig.find(s => s.id === 'headerHero');

  if (!section?.visibility?.enabled) return null;

  const content = section.content || {};

  return (
    <div style={{
      backgroundColor: tokens.colors.background,
      padding: '1.5rem',
      paddingBottom: '2rem'
    }}>
      <div style={{
        maxWidth: tokens.layout.maxWidth,
        margin: '0 auto'
      }}>
        <div style={{
          ...tokens.components.header,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <button style={{
            width: '3rem',
            height: '3rem',
            borderRadius: tokens.borderRadius.lg,
            background: tokens.colors.primary,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1.25rem',
            flexShrink: 0
          }}>
            <SafeIcon icon={FiMenu} />
          </button>

          {content.showSearch && (
            <div style={{
              flex: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <SafeIcon
                icon={FiSearch}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  color: tokens.colors.textMuted,
                  fontSize: '1rem'
                }}
              />
              <input
                type="text"
                placeholder="Search"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.75rem',
                  background: tokens.components.input.background,
                  border: 'none',
                  borderRadius: tokens.components.input.borderRadius,
                  fontSize: tokens.components.input.fontSize,
                  color: tokens.colors.text,
                  outline: 'none'
                }}
              />
            </div>
          )}

          {businessData.logoUrl && (
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              <img
                src={businessData.logoUrl}
                alt="Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}

          <button style={{
            width: '3rem',
            height: '3rem',
            borderRadius: tokens.borderRadius.lg,
            background: tokens.colors.surface,
            border: `2px solid ${tokens.colors.borderLight}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: tokens.colors.text,
            cursor: 'pointer',
            fontSize: '1.25rem',
            flexShrink: 0,
            position: 'relative'
          }}>
            <SafeIcon icon={FiShoppingCart} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: tokens.colors.badge,
                color: '#fff',
                borderRadius: '50%',
                width: '1.25rem',
                height: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: tokens.typography.fontSize.xs,
                fontWeight: tokens.typography.fontWeight.bold
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div style={{
          ...tokens.components.hero,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: tokens.borderRadius.xl,
              background: tokens.colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: tokens.typography.fontWeight.bold,
                color: '#fff'
              }}>
                {(content.logoText || businessData.name || 'Store').charAt(0)}
              </div>
            </div>

            <div>
              <h1 style={{
                fontSize: tokens.typography.fontSize.heroTitle,
                fontWeight: tokens.typography.fontWeight.bold,
                color: tokens.components.hero.textColor,
                margin: 0,
                lineHeight: tokens.typography.lineHeight.tight
              }}>
                {content.logoText || businessData.name}
              </h1>
              <p style={{
                fontSize: tokens.typography.fontSize.heroSubtitle,
                color: 'rgba(255, 255, 255, 0.85)',
                margin: '0.25rem 0 0 0'
              }}>
                {content.tagline || businessData.tagline}
              </p>
            </div>
          </div>

          {content.showStats && (
            <div style={{
              display: 'flex',
              gap: '2rem',
              flexShrink: 0
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: tokens.typography.fontSize['3xl'],
                  fontWeight: tokens.typography.fontWeight.bold,
                  color: tokens.components.hero.textColor,
                  lineHeight: 1
                }}>
                  {content.totalItems || '24'}
                </div>
                <div style={{
                  fontSize: tokens.typography.fontSize.sm,
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginTop: '0.25rem'
                }}>
                  Total Item
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: tokens.typography.fontSize['3xl'],
                  fontWeight: tokens.typography.fontWeight.bold,
                  color: tokens.components.hero.textColor,
                  lineHeight: 1
                }}>
                  {content.totalCategories || '09'}
                </div>
                <div style={{
                  fontSize: tokens.typography.fontSize.sm,
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginTop: '0.25rem'
                }}>
                  Category
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: tokens.typography.fontSize['3xl'],
                  fontWeight: tokens.typography.fontWeight.bold,
                  color: tokens.components.hero.textColor,
                  lineHeight: 1
                }}>
                  {content.totalOutlets || '04'}
                </div>
                <div style={{
                  fontSize: tokens.typography.fontSize.sm,
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginTop: '0.25rem'
                }}>
                  Outlate
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
