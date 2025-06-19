"use client"
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
      width: '256px',
      backgroundColor: 'white',
      height: '100vh',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
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
            <span style={{
              fontWeight: '500',
              color: '#0030E3',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
            }}>FutureTech LLC</span>
          </div>
          <ChevronDown style={{ width: '16px', height: '16px', color: '#0030E3' }} />
        </div>
      </div>

      {/* Navigation */}
      <div style={{ flex: 1, paddingTop: '16px', paddingBottom: '16px' }}>
        {/* Overview - Active */}
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
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            <img src="/images/dashboard-customize-light.svg" alt="Search" height="20px" />
            <span style={{ 
              fontWeight: '500',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
            }}>Overview</span>
          </div>
        </div>

        {/* Profile Data Section */}
        <div style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '16px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#242424',
            letterSpacing: '0.05em',
            marginBottom: '8px',
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            Essentials
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
              backgroundColor: hoveredItem === 'firm-info' ? '#f9fafb' : 'transparent',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
            }}
            onMouseEnter={() => setHoveredItem('firm-info')}
            onMouseLeave={() => setHoveredItem(null)}>
              <img src="/images/vertical-shades-closed.svg" alt="Search" height="20px" color='#151515' />
              <span>Profile</span>
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
              backgroundColor: hoveredItem === 'firm-wallet' ? '#f9fafb' : 'transparent',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
            }}
            onMouseEnter={() => setHoveredItem('firm-wallet')}
            onMouseLeave={() => setHoveredItem(null)}>
              <img src="/images/home-storage.svg" alt="Search" height="20px" color='#151515' />
              <span>Documents</span>
            </div>
          </div>
        </div>

        {/* Transaction Data Section */}
        <div style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '16px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#242424',
            letterSpacing: '0.05em',
            marginBottom: '8px',
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            Transactions
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
              backgroundColor: hoveredItem === 'non-financial' ? '#f9fafb' : 'transparent',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
            }}
            onMouseEnter={() => setHoveredItem('non-financial')}
            onMouseLeave={() => setHoveredItem(null)}>
              <img src="/images/overview.svg" alt="Search" height="20px" color='#151515' />
              <span>Requests</span>
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
              backgroundColor: hoveredItem === 'financial' ? '#f9fafb' : 'transparent',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
            }}
            onMouseEnter={() => setHoveredItem('financial')}
            onMouseLeave={() => setHoveredItem(null)}>
              <img src="/images/analytics.svg" alt="Search" height="20px" color='#151515' />
              <span>Insights</span>
            </div>
          </div>
        </div>

        {/* Settings & Support Section */}
        <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#242424',
            letterSpacing: '0.05em',
            marginBottom: '8px',
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            Settings & Support
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
              backgroundColor: hoveredItem === 'org-settings' ? '#f9fafb' : 'transparent',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
            }}
            onMouseEnter={() => setHoveredItem('org-settings')}
            onMouseLeave={() => setHoveredItem(null)}>
              <img src="/images/settings.svg" alt="Search" height="20px" color='#151515' />
              <span>Settings</span>
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
              backgroundColor: hoveredItem === 'help-support' ? '#f9fafb' : 'transparent',
              fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
            }}
            onMouseEnter={() => setHoveredItem('help-support')}
            onMouseLeave={() => setHoveredItem(null)}>
              <img src="/images/contact-support.svg" alt="Search" height="20px" color='#151515' />
              <span>Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;