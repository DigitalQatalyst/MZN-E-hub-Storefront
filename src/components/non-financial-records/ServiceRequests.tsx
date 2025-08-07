'use client'
import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Container from '@component/Container';
import Card from '@component/Card';
import Box from '@component/Box';
import FlexBox from '@component/FlexBox';
import Typography from '@component/Typography';

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

// Styled Components using Bonik patterns
const FilterButton = styled.button<{ isActive: boolean }>`
  padding: 10px 16px;
  border: 1px solid ${({ isActive }) => isActive ? '#0030E3' : '#D8E0E9'};
  background-color: transparent;
  color: ${({ isActive }) => isActive ? '#0030E3' : '#6b7280'};
  font-weight: ${({ isActive }) => isActive ? '600' : '400'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  flex-shrink: 0;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 12px;
  }
`;

const SearchInput = styled.input`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  width: 300px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #0030E3;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PrimaryButton = styled.button`
  padding: 12px 24px;
  background-color: #0030E3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0025b8;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;

  @media (min-width: 768px) {
    min-width: auto;
  }
`;

const TableHeader = styled.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  background-color: white;

  @media (max-width: 768px) {
    padding: 12px 8px;
    font-size: 10px;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #f3f4f6;
`;

const TableCell = styled.td<{ weight?: string }>`
  padding: 16px;
  font-size: 14px;
  color: ${({ weight }) => weight === 'bold' ? '#111827' : '#6b7280'};
  font-weight: ${({ weight }) => weight === 'bold' ? '500' : '400'};

  @media (max-width: 768px) {
    padding: 12px 8px;
    font-size: 12px;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${({ status }) => {
    switch (status) {
      case 'Draft': return '#f3f4f6';
      case 'Under Review': return '#fef3c7';
      case 'Approved': return '#d1fae5';
      case 'Rejected': return '#fee2e2';
      default: return '#f3f4f6';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'Draft': return '#6b7280';
      case 'Under Review': return '#d97706';
      case 'Approved': return '#10b981';
      case 'Rejected': return '#ef4444';
      default: return '#6b7280';
    }
  }};

  @media (max-width: 768px) {
    padding: 2px 8px;
    font-size: 12px;
  }
`;

const ActionButton = styled.button`
  padding: 4px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #6b7280;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

// Dropdown Menu Component
const DropdownContainer = styled(Box)`
  position: relative;
  display: inline-block;
`;

const DropdownMenu = styled(Card)`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  min-width: 200px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 8px 0;
  margin-top: 4px;
`;

const DropdownItem = styled.button<{ variant?: 'primary' | 'default' }>`
  width: ${({ variant }) => variant === 'primary' ? 'calc(100% - 16px)' : '100%'};
  padding: 12px 16px;
  text-align: left;
  border: none;
  background-color: ${({ variant }) => variant === 'primary' ? '#0030E3' : 'transparent'};
  color: ${({ variant }) => variant === 'primary' ? 'white' : '#374151'};
  font-size: 14px;
  font-weight: ${({ variant }) => variant === 'primary' ? '500' : '400'};
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: ${({ variant }) => variant === 'primary' ? '6px' : '0'};
  margin: ${({ variant }) => variant === 'primary' ? '0 8px 8px 8px' : '0'};

  &:hover {
    background-color: ${({ variant }) => 
      variant === 'primary' ? '#0025b8' : '#f3f4f6'
    };
  }

  &:first-child {
    margin-bottom: 8px;
  }
`;

const PaginationButton = styled.button<{ isActive?: boolean; disabled?: boolean }>`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  background-color: ${({ isActive }) => isActive ? '#0030E3' : 'white'};
  color: ${({ isActive, disabled }) => 
    disabled ? '#9ca3af' : isActive ? 'white' : '#374151'
  };
  border-radius: 6px;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  font-weight: ${({ isActive }) => isActive ? '600' : '400'};

  @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 12px;
  }
`;

const ServiceRequestsPage: React.FC = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('Draft');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  // Handle dropdown toggle
  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  // Handle dropdown actions
  const handleWithdraw = (id: string) => {
    console.log('Withdraw application:', id);
    setOpenDropdownId(null);
    // Add your withdraw logic here
  };

  const handleContinue = (id: string) => {
    console.log('Continue application:', id);
    setOpenDropdownId(null);
    // Navigate to the progress page using Next.js router
    router.push(`/non-financial-records/${id}/progress`);
  };

  return (
    <Box p={isMobile ? '16px' : '24px'} bg="white" minHeight="100vh">
      <Container maxWidth="1200px">
        {/* Page Header */}
        <Typography
          fontSize={isMobile ? '12px' : '16px'}
          fontWeight="400"
          color="#242424"
          mb="24px"
        >
          Service Requests
        </Typography>

        {/* Main Content Container */}
        <Card border="1px solid #e5e7eb" borderRadius="6px" overflow="hidden">
          {/* Filter Tabs */}
          <Box
            p={isMobile ? '16px 16px 24px' : '24px 24px 24px'}
            style={{ 
              display: 'flex', 
              overflowX: 'auto', 
              whiteSpace: 'nowrap' 
            }}
          >
            {filters.map((filter, index) => (
              <Box key={`filter-${filter}`} mr={index < filters.length - 1 ? '8px' : '0'}>
                <FilterButton
                  isActive={activeFilter === filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setCurrentPage(1);
                  }}
                >
                  {filter}
                </FilterButton>
              </Box>
            ))}
          </Box>

          {/* Search and Action Button Row */}
          <FlexBox
            flexDirection={isMobile ? 'column' : 'row'}
            justifyContent="space-between"
            alignItems={isMobile ? 'stretch' : 'center'}
            mx="24px"
            mt="24px"
            mb="24px"
          >
            <Box mb={isMobile ? '16px' : '0'}>
              <SearchInput
                type="text"
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>
            
            <PrimaryButton>
              Request new service
            </PrimaryButton>
          </FlexBox>

          {/* Table Container */}
          <Box
            bg="white"
            borderRadius="8px"
            overflow="hidden"
            overflowX="auto"
            mx="24px"
            mb="24px"
          >
            <Table>
              {/* Table Header */}
              <thead>
                <tr>
                  <TableHeader>SERVICE NAME</TableHeader>
                  <TableHeader>CATEGORY</TableHeader>
                  <TableHeader>DATE REQUESTED</TableHeader>
                  <TableHeader>STATUS</TableHeader>
                  <TableHeader>ACTION</TableHeader>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody>
                {currentData.map((item) => (
                  <TableRow key={`service-${item.id}`}>
                    <TableCell weight="bold">{item.serviceName}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.dateRequested}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.status}>
                        {item.status}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <DropdownContainer ref={openDropdownId === item.id ? dropdownRef : null}>
                        <ActionButton
                          onClick={() => toggleDropdown(item.id)}
                          aria-label="More options"
                        >
                          <MoreVertical size={16} />
                        </ActionButton>
                        
                        {/* Dropdown Menu */}
                        {openDropdownId === item.id && (
                          <DropdownMenu>
                            <DropdownItem onClick={() => handleWithdraw(item.id)}>
                              Withdraw application
                            </DropdownItem>
                            <DropdownItem 
                              variant="primary"
                              onClick={() => handleContinue(item.id)}
                            >
                              Continue application
                            </DropdownItem>
                          </DropdownMenu>
                        )}
                      </DropdownContainer>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </Box>

          {/* Pagination Controls */}
          <FlexBox
            flexDirection={isMobile ? 'column' : 'row'}
            justifyContent="space-between"
            alignItems="center"
            m="0 24px 24px"
          >
            <Box mb={isMobile ? '16px' : '0'}>
              <Typography fontSize={isMobile ? '12px' : '14px'} color="#6b7280">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
              </Typography>
            </Box>
            
            <FlexBox flexWrap="wrap" justifyContent="center">
              {/* First Page Button */}
              <Box mr="4px" mb="4px">
                <PaginationButton
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  ≪
                </PaginationButton>
              </Box>
              
              {/* Previous Page Button */}
              <Box mr="4px" mb="4px">
                <PaginationButton
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ‹
                </PaginationButton>
              </Box>
              
              {/* Page Number Buttons */}
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <Box key={`page-${pageNum}`} mr="4px" mb="4px">
                    <PaginationButton
                      onClick={() => setCurrentPage(pageNum)}
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationButton>
                  </Box>
                );
              })}
              
              {/* Next Page Button */}
              <Box mr="4px" mb="4px">
                <PaginationButton
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  ›
                </PaginationButton>
              </Box>
              
              {/* Last Page Button */}
              <Box mb="4px">
                <PaginationButton
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  ≫
                </PaginationButton>
              </Box>
            </FlexBox>
          </FlexBox>
        </Card>
      </Container>
    </Box>
  );
};

export default ServiceRequestsPage;