"use client";
import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  Wallet,
  FileText,
  DollarSign,
  Settings,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  return (
    <div style={{
      backgroundColor: 'white',
      height: '100vh',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Company Selector */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <img
              src="/assets/images/sidebar/futuretech-logo.png"
              alt="FutureTech LLC Logo"
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                objectFit: 'cover'
              }}
            />
            <span style={{
              fontWeight: '500',
              color: '#111827'
            }}>FutureTech LLC</span>
          </div>
          <ChevronDown style={{ width: '16px', height: '16px', color: '#6b7280' }} />
        </div>
      </div>

      {/* Navigation */}
      <div style={{ flex: 1, paddingTop: '16px', paddingBottom: '16px' }}>
        {/* Dashboard - Active */}
        <div style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingTop: '8px',
            paddingBottom: '8px',
            backgroundColor: '#0030E3',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            <LayoutDashboard style={{ width: '20px', height: '20px' }} />
            <span style={{ fontWeight: '500' }}>Dashboard</span>
          </div>
        </div>

        {/* Profile Data Section */}
        <div style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '16px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            PROFILE DATA
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingTop: '8px',
              paddingBottom: '8px',
              color: '#374151',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: hoveredItem === 'firm-info' ? '#f9fafb' : 'transparent'
            }}
              onMouseEnter={() => setHoveredItem('firm-info')}
              onMouseLeave={() => setHoveredItem(null)}>
              <Building2 style={{ width: '20px', height: '20px', color: '#6b7280' }} />
              <span>Firm Information</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingTop: '8px',
              paddingBottom: '8px',
              color: '#374151',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: hoveredItem === 'firm-wallet' ? '#f9fafb' : 'transparent'
            }}
              onMouseEnter={() => setHoveredItem('firm-wallet')}
              onMouseLeave={() => setHoveredItem(null)}>
              <Wallet style={{ width: '20px', height: '20px', color: '#6b7280' }} />
              <span>Firm Wallet</span>
            </div>
          </div>
        </div>

        {/* Transaction Data Section */}
        <div style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '16px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            TRANSACTION DATA
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingTop: '8px',
              paddingBottom: '8px',
              color: '#374151',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: hoveredItem === 'non-financial' ? '#f9fafb' : 'transparent'
            }}
              onMouseEnter={() => setHoveredItem('non-financial')}
              onMouseLeave={() => setHoveredItem(null)}>
              <FileText style={{ width: '20px', height: '20px', color: '#6b7280' }} />
              <span>Non-Financial</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingTop: '8px',
              paddingBottom: '8px',
              color: '#374151',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: hoveredItem === 'financial' ? '#f9fafb' : 'transparent'
            }}
              onMouseEnter={() => setHoveredItem('financial')}
              onMouseLeave={() => setHoveredItem(null)}>
              <DollarSign style={{ width: '20px', height: '20px', color: '#6b7280' }} />
              <span>Financial</span>
            </div>
          </div>
        </div>

        {/* Settings & Support Section */}
        <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            SETTINGS & SUPPORT
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingTop: '8px',
              paddingBottom: '8px',
              color: '#374151',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: hoveredItem === 'org-settings' ? '#f9fafb' : 'transparent'
            }}
              onMouseEnter={() => setHoveredItem('org-settings')}
              onMouseLeave={() => setHoveredItem(null)}>
              <Settings style={{ width: '20px', height: '20px', color: '#6b7280' }} />
              <span>Organisation Settings</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingTop: '8px',
              paddingBottom: '8px',
              color: '#374151',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: hoveredItem === 'help-support' ? '#f9fafb' : 'transparent'
            }}
              onMouseEnter={() => setHoveredItem('help-support')}
              onMouseLeave={() => setHoveredItem(null)}>
              <HelpCircle style={{ width: '20px', height: '20px', color: '#6b7280' }} />
              <span>Help & Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;