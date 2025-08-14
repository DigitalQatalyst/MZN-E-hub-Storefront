"use client"
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const essentialItems: NavItem[] = [
    { id: 'profile', label: 'Profile', icon: '/images/vertical-shades-closed.svg', route: '/firm-profile' },
    { id: 'documents', label: 'Documents', icon: '/images/home-storage.svg', route: '/documents' },
  ];

  const transactionItems: NavItem[] = [
    { id: 'requests', label: 'Requests', icon: '/images/overview.svg', route: '/non-financial-records' },
    { id: 'insights', label: 'Insights', icon: '/images/analytics.svg', route: '/#' },
  ];

  const settingsItems: NavItem[] = [
    { id: 'settings', label: 'Settings', icon: '/images/settings.svg', route: '/#' },
    { id: 'support', label: 'Support', icon: '/images/contact-support.svg', route: '/#' },
  ];

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const isActive = (route: string) => {
    // Special handling for Documents route to keep it active on sub-routes
    if (route === '/documents') {
      return pathname.startsWith('/documents');
    }
    // For other routes, exact match
    return pathname === route;
  };

  const renderNavItem = (item: NavItem) => {
    const active = isActive(item.route);
    
    return (
      <div
        
        key={item.id}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingLeft: '12px',
          paddingRight: '12px',
          paddingTop: '8px',
          paddingBottom: '8px',
          backgroundColor: active ? '#0030E3' : hoveredItem === item.id ? '#f9fafb' : 'transparent',
          color: active ? 'white' : '#374151',
          borderRadius: '8px',
          cursor: 'pointer',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
        }}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => handleNavigation(item.route)}
      >
        <img 
          src={item.icon} 
          alt={item.label} 
          height="20px"
          style={{
            filter: active ? 'brightness(0) invert(1)' : 'none'
          }}
        />
        <span style={{ fontWeight: '500' }}>{item.label}</span>
      </div>
    );
  };

  return (
    <div style={{
      width: '256px',
      backgroundColor: 'white',
      height: '100vh',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
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
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
            }}>FutureTech LLC</span>
          </div>
          <ChevronDown style={{ width: '16px', height: '16px', color: '#0030E3' }} />
        </div>
      </div>

      {/* Navigation */}
      <div style={{ flex: 1, paddingTop: '16px', paddingBottom: '16px' }}>
        {/* Overview - Dashboard */}
        <div style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingTop: '8px',
            paddingBottom: '8px',
            backgroundColor: isActive('/dashboard') ? '#0030E3' : hoveredItem === 'overview' ? '#f9fafb' : 'transparent',
            color: isActive('/dashboard') ? 'white' : '#374151',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
          }}
          onMouseEnter={() => setHoveredItem('overview')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => handleNavigation('/dashboard')}>
            <img 
              src="/images/dashboard-customize-light.svg" 
              alt="Dashboard" 
              height="20px" 
              style={{
                filter: isActive('/dashboard') ? 'brightness(0) invert(1)' : 'brightness(0) opacity(0.6)'
              }}
            />
            <span style={{ 
              fontWeight: '500',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
            }}>Overview</span>
          </div>
        </div>

        {/* Essentials Section */}
        <div style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '16px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#242424',
            letterSpacing: '0.05em',
            marginBottom: '8px',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
          }}>
            Essentials
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {essentialItems.map(renderNavItem)}
          </div>
        </div>

        {/* Transactions Section */}
        <div style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '16px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#242424',
            letterSpacing: '0.05em',
            marginBottom: '8px',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
          }}>
            Transactions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {transactionItems.map(renderNavItem)}
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
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
          }}>
            Settings & Support
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {settingsItems.map(renderNavItem)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;