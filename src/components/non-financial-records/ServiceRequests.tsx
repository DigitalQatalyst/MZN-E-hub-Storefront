'use client'
import React, { useState, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';

interface ServiceRequest {
  id: string;
  serviceName: string;
  category: string;
  dateRequested: string;
  status: 'Draft' | 'Under Review' | 'Approved' | 'Rejected';
}

const mockData: ServiceRequest[] = [
  {
    id: '1',
    serviceName: 'Request For Funding',
    category: 'Business Operating Finance',
    dateRequested: '04/09/2025',
    status: 'Draft'
  },
  {
    id: '2',
    serviceName: 'Equipment & Machinery Financing',
    category: 'Business Asset Financing',
    dateRequested: '04/09/2025',
    status: 'Draft'
  },
  {
    id: '3',
    serviceName: 'Trade Finance',
    category: 'Project & Specialized Financing',
    dateRequested: '04/09/2025',
    status: 'Draft'
  },
  {
    id: '4',
    serviceName: 'Business Expansion Loans',
    category: 'Growth & Expansion Financing',
    dateRequested: '04/09/2025',
    status: 'Draft'
  },
  {
    id: '5',
    serviceName: 'Equity Crowdfunding',
    category: 'Investment & Equity Financing',
    dateRequested: '04/09/2025',
    status: 'Draft'
  },
  {
    id: '6',
    serviceName: 'Working Capital Loan',
    category: 'Business Operating Finance',
    dateRequested: '03/09/2025',
    status: 'Under Review'
  },
  {
    id: '7',
    serviceName: 'Line of Credit',
    category: 'Business Operating Finance',
    dateRequested: '02/09/2025',
    status: 'Approved'
  },
  {
    id: '8',
    serviceName: 'Invoice Factoring',
    category: 'Project & Specialized Financing',
    dateRequested: '01/09/2025',
    status: 'Rejected'
  }
];

type FilterStatus = 'All' | 'Draft' | 'Under Review' | 'Approved' | 'Rejected';

const ServiceRequestsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('Draft');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 6;

  // Handle responsive design by detecting screen size changes
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Filter data based on active filter and search term
  const filteredData = mockData.filter(item => {
    const matchesFilter = activeFilter === 'All' || item.status === activeFilter;
    const matchesSearch = 
      item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate pagination values
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Available filter options
  const filters: FilterStatus[] = ['All', 'Draft', 'Under Review', 'Approved', 'Rejected'];

  // Dynamic status badge styling based on status type
  const getStatusStyle = (status: string) => {
    const baseStyle = {
      padding: isMobile ? '2px 8px' : '4px 12px',
      borderRadius: '4px',
      fontSize: isMobile ? '12px' : '14px',
      fontWeight: '500'
    };

    switch (status) {
      case 'Draft':
        return { ...baseStyle, backgroundColor: '#f3f4f6', color: '#6b7280' };
      case 'Under Review':
        return { ...baseStyle, backgroundColor: '#fef3c7', color: '#d97706' };
      case 'Approved':
        return { ...baseStyle, backgroundColor: '#d1fae5', color: '#10b981' };
      case 'Rejected':
        return { ...baseStyle, backgroundColor: '#fee2e2', color: '#ef4444' };
      default:
        return baseStyle;
    }
  };

  return (
    <div style={{ padding: isMobile ? '16px' : '24px', backgroundColor: 'white', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Page Header */}
        <h1 style={{ 
          fontSize: isMobile ? '12px' : '16px', 
          fontWeight: '400', 
          color: '#242424', 
          marginBottom: '24px' 
        }}>
          Service Requests
        </h1>

        {/* Main Content Container - Card with border, shadow, and radius */}
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          backgroundColor: 'white',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          overflow: 'hidden' // Ensures content respects the border radius
        }}>
          {/* Filter Tabs - Button style with border on selection */}
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            marginBottom: '0',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            padding: isMobile ? '16px 16px 24px' : '24px 24px 24px'
          }}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setCurrentPage(1); // Reset to first page when filter changes
              }}
              style={{
                padding: isMobile ? '8px 12px' : '10px 16px',
                border: activeFilter === filter ? '1px solid #0030E3' : '1px solid #D8E0E9',
                backgroundColor: 'transparent',
                color: activeFilter === filter ? '#0030E3' : '#6b7280',
                fontWeight: activeFilter === filter ? '600' : '400',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: isMobile ? '12px' : '14px',
                flexShrink: 0,
                transition: 'all 0.2s ease' // Smooth transition for active state
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search and Action Button Row */}
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'stretch' : 'center',
          marginInline: '24px',
          marginTop: '24px',
          marginBottom: '24px',
          gap: '16px'
        }}>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              width: isMobile ? '100%' : '300px',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#0030E3'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
          />
          
          {/* Primary Action Button */}
          <button
            style={{
              padding: '12px 24px',
              backgroundColor: '#0030E3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              width: isMobile ? '100%' : 'auto',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0025b8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0030E3'}
          >
            Request new service
          </button>
        </div>

        {/* Table Container - Clean design without dividers */}
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          overflowX: 'auto', // Horizontal scroll for mobile responsiveness
          marginInline: '24px',
          marginBottom: '24px'
        }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            minWidth: isMobile ? '800px' : 'auto' // Ensure table doesn't compress on mobile
          }}>
            {/* Table Header - White background with top and bottom dividers */}
            <thead>
              <tr style={{ backgroundColor: 'white' }}>
                <th style={{ 
                  padding: isMobile ? '12px 8px' : '16px', 
                  textAlign: 'left', 
                  fontSize: isMobile ? '10px' : '12px', 
                  fontWeight: '600', 
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderTop: '1px solid #e5e7eb',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  SERVICE NAME
                </th>
                <th style={{ 
                  padding: isMobile ? '12px 8px' : '16px', 
                  textAlign: 'left', 
                  fontSize: isMobile ? '10px' : '12px', 
                  fontWeight: '600', 
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderTop: '1px solid #e5e7eb',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  CATEGORY
                </th>
                <th style={{ 
                  padding: isMobile ? '12px 8px' : '16px', 
                  textAlign: 'left', 
                  fontSize: isMobile ? '10px' : '12px', 
                  fontWeight: '600', 
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderTop: '1px solid #e5e7eb',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  DATE REQUESTED
                </th>
                <th style={{ 
                  padding: isMobile ? '12px 8px' : '16px', 
                  textAlign: 'left', 
                  fontSize: isMobile ? '10px' : '12px', 
                  fontWeight: '600', 
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderTop: '1px solid #e5e7eb',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  STATUS
                </th>
                <th style={{ 
                  padding: isMobile ? '12px 8px' : '16px', 
                  textAlign: 'left', 
                  fontSize: isMobile ? '10px' : '12px', 
                  fontWeight: '600', 
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderTop: '1px solid #e5e7eb',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  ACTION
                </th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody>
              {currentData.map((item, index) => (
                <tr 
                  key={item.id} 
                  style={{ 
                    // Clean row separator
                    borderBottom: '1px solid #f3f4f6'
                  }}
                >
                  {/* Service Name Column */}
                  <td style={{ 
                    padding: isMobile ? '12px 8px' : '16px', 
                    fontSize: isMobile ? '12px' : '14px', 
                    color: '#111827',
                    fontWeight: '500'
                  }}>
                    {item.serviceName}
                  </td>
                  
                  {/* Category Column */}
                  <td style={{ 
                    padding: isMobile ? '12px 8px' : '16px', 
                    fontSize: isMobile ? '12px' : '14px', 
                    color: '#6b7280' 
                  }}>
                    {item.category}
                  </td>
                  
                  {/* Date Requested Column */}
                  <td style={{ 
                    padding: isMobile ? '12px 8px' : '16px', 
                    fontSize: isMobile ? '12px' : '14px', 
                    color: '#6b7280' 
                  }}>
                    {item.dateRequested}
                  </td>
                  
                  {/* Status Badge Column */}
                  <td style={{ padding: isMobile ? '12px 8px' : '16px' }}>
                    <span style={getStatusStyle(item.status)}>
                      {item.status}
                    </span>
                  </td>
                  
                  {/* Action Menu Column */}
                  <td style={{ padding: isMobile ? '12px 8px' : '16px' }}>
                    <button
                      style={{
                        padding: '4px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#6b7280',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      aria-label="More options"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'center' : 'center', 
          margin: '0 24px 24px', // Match consistent spacing
          gap: isMobile ? '16px' : '0'
        }}>
          {/* Pagination Info */}
          <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#6b7280' }}>
            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
          </span>
          
          {/* Pagination Buttons */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* First Page Button */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              style={{
                padding: isMobile ? '6px 8px' : '8px 12px',
                border: '1px solid #d1d5db',
                backgroundColor: 'white',
                color: currentPage === 1 ? '#9ca3af' : '#374151',
                borderRadius: '6px',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: isMobile ? '12px' : '14px'
              }}
            >
              ≪
            </button>
            
            {/* Previous Page Button */}
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: isMobile ? '6px 8px' : '8px 12px',
                border: '1px solid #d1d5db',
                backgroundColor: 'white',
                color: currentPage === 1 ? '#9ca3af' : '#374151',
                borderRadius: '6px',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: isMobile ? '12px' : '14px'
              }}
            >
              ‹
            </button>
            
            {/* Page Number Buttons */}
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    padding: isMobile ? '6px 8px' : '8px 12px',
                    border: '1px solid #d1d5db',
                    backgroundColor: currentPage === pageNum ? '#0030E3' : 'white',
                    color: currentPage === pageNum ? 'white' : '#374151',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: isMobile ? '12px' : '14px',
                    fontWeight: currentPage === pageNum ? '600' : '400'
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {/* Next Page Button */}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: isMobile ? '6px 8px' : '8px 12px',
                border: '1px solid #d1d5db',
                backgroundColor: 'white',
                color: currentPage === totalPages ? '#9ca3af' : '#374151',
                borderRadius: '6px',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontSize: isMobile ? '12px' : '14px'
              }}
            >
              ›
            </button>
            
            {/* Last Page Button */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              style={{
                padding: isMobile ? '6px 8px' : '8px 12px',
                border: '1px solid #d1d5db',
                backgroundColor: 'white',
                color: currentPage === totalPages ? '#9ca3af' : '#374151',
                borderRadius: '6px',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontSize: isMobile ? '12px' : '14px'
              }}
            >
              ≫
            </button>
          </div>
        </div>
        {/* End of Main Content Container */}
      </div>
    </div>
    </div>
  );
};

export default ServiceRequestsPage;