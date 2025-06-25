'use client'
import React, { useState, useEffect } from 'react';

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

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const filters: FilterStatus[] = ['All', 'Draft', 'Under Review', 'Approved', 'Rejected'];

  const getStatusStyle = (status: string) => {
    const baseStyle = {
      padding: isMobile ? '2px 8px' : '4px 12px',
      borderRadius: '6px',
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
        {/* Header */}
        <h1 style={{ 
          fontSize: isMobile ? '20px' : '24px', 
          fontWeight: '600', 
          color: '#111827', 
          marginBottom: '24px' 
        }}>
          Service Requests
        </h1>

        {/* Filter Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '4px', 
          marginBottom: '24px',
          borderBottom: '1px solid #e5e7eb',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setCurrentPage(1);
              }}
              style={{
                padding: isMobile ? '8px 12px' : '12px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                color: activeFilter === filter ? '#0030E3' : '#6b7280',
                fontWeight: activeFilter === filter ? '600' : '400',
                borderBottom: activeFilter === filter ? '2px solid #0030E3' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: isMobile ? '12px' : '14px',
                flexShrink: 0
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search and Button Row */}
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'stretch' : 'center', 
          marginBottom: '24px',
          gap: '16px'
        }}>
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
              outline: 'none'
            }}
          />
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
              width: isMobile ? '100%' : 'auto'
            }}
          >
            Request new service
          </button>
        </div>

        {/* Table Container with horizontal scroll on mobile */}
        <div style={{ 
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden',
          overflowX: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '800px' : 'auto' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ 
                  padding: isMobile ? '12px 8px' : '16px', 
                  textAlign: 'left', 
                  fontSize: isMobile ? '10px' : '12px', 
                  fontWeight: '600', 
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
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
                  letterSpacing: '0.05em'
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
                  letterSpacing: '0.05em'
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
                  letterSpacing: '0.05em'
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
                  letterSpacing: '0.05em'
                }}>
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr 
                  key={item.id} 
                  style={{ 
                    borderTop: index > 0 ? '1px solid #f3f4f6' : 'none'
                  }}
                >
                  <td style={{ 
                    padding: isMobile ? '12px 8px' : '16px', 
                    fontSize: isMobile ? '12px' : '14px', 
                    color: '#111827',
                    fontWeight: '500'
                  }}>
                    {item.serviceName}
                  </td>
                  <td style={{ 
                    padding: isMobile ? '12px 8px' : '16px', 
                    fontSize: isMobile ? '12px' : '14px', 
                    color: '#6b7280' 
                  }}>
                    {item.category}
                  </td>
                  <td style={{ 
                    padding: isMobile ? '12px 8px' : '16px', 
                    fontSize: isMobile ? '12px' : '14px', 
                    color: '#6b7280' 
                  }}>
                    {item.dateRequested}
                  </td>
                  <td style={{ padding: isMobile ? '12px 8px' : '16px' }}>
                    <span style={getStatusStyle(item.status)}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: isMobile ? '12px 8px' : '16px' }}>
                    <button
                      style={{
                        padding: '4px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        color: '#6b7280'
                      }}
                    >
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'center' : 'center', 
          marginTop: '24px',
          gap: isMobile ? '16px' : '0'
        }}>
          <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#6b7280' }}>
            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
          </span>
          
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
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
      </div>
    </div>
  );
};

export default ServiceRequestsPage;