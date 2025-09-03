'use client'
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Download, ExternalLink, MoreVertical } from 'lucide-react';
import styled from 'styled-components';
import Container from '@component/Container';
import Card from '@component/Card';
import Box from '@component/Box';
import FlexBox from '@component/FlexBox';
import Typography from '@component/Typography';

// Types
type InsightTab = 'financial' | 'non-financial';
type FinancialCategory = 'business-loans' | 'investments' | 'asset-finance' | 'growth-finance' | 'project-finance' | 'working-capital' | 'trade-supply' | 'seed-funding' | 'equity-growth';
type LoanStatus = 'Unpaid' | 'Overdue' | 'Paid';

interface LoanPayment {
  id: string;
  dueDate: string;
  total: number;
  principal: number;
  interest: number;
  status: LoanStatus;
}

interface LoanDetails {
  id: string;
  title: string;
  description: string;
  progress: number;
  currentAmount: number;
  totalAmount: number;
  currency: string;
  payments: LoanPayment[];
}

// Styled Components
const TabButton = styled.button<{ isActive: boolean }>`
  padding: 12px 24px;
  background-color: ${({ isActive }) => isActive ? '#E6EFFF' : 'transparent'};
  color: ${({ isActive }) => isActive ? '#0030E3' : '#6b7280'};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: ${({ isActive }) => isActive ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isActive }) => isActive ? '#E6EFFF' : '#f3f4f6'};
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 13px;
  }
`;

const ScrollableNav = styled(Box)`
  display: flex;
  overflow-x: auto;
  padding-bottom: 2px;
  
  /* Hide scrollbar for webkit browsers (Chrome, Safari, Edge) */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for Firefox */
  scrollbar-width: none;
  
  /* Hide scrollbar for IE and Edge */
  -ms-overflow-style: none;
`;

const SubNavButton = styled.button<{ isActive: boolean }>`
  padding: 10px 12px;
  border: none;
  border-bottom: ${({ isActive }) => isActive ? '2px solid #0030E3' : '2px solid transparent'};
  background-color: transparent;
  color: ${({ isActive }) => isActive ? '#0030E3' : '#6b7280'};
  font-weight: ${({ isActive }) => isActive ? '600' : '400'};
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  transition: all 0.2s ease;
  margin-right: 8px;

  &:hover {
    color: #0030E3;
  }

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    padding: 8px 8px;
    font-size: 12px;
    margin-right: 4px;
  }
`;

const ExpandableSection = styled(Card)<{ isExpanded: boolean }>`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 16px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: #d1d5db;
  }
`;

const ProgressCircle = styled.div<{ progress: number; size?: number }>`
  width: ${({ size = 80 }) => size}px;
  height: ${({ size = 80 }) => size}px;
  border-radius: 50%;
  background: conic-gradient(
    #0030E3 0deg ${({ progress }) => progress * 3.6}deg,
    #e5e7eb ${({ progress }) => progress * 3.6}deg 360deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: '';
    width: ${({ size = 80 }) => size - 16}px;
    height: ${({ size = 80 }) => size - 16}px;
    border-radius: 50%;
    background: white;
    position: absolute;
  }

  @media (max-width: 768px) {
    width: ${({ size = 80 }) => size - 20}px;
    height: ${({ size = 80 }) => size - 20}px;

    &::before {
      width: ${({ size = 80 }) => size - 36}px;
      height: ${({ size = 80 }) => size - 36}px;
    }
  }
`;

const ProgressText = styled(Typography)`
  position: relative;
  z-index: 1;
  font-weight: 600;
  font-size: 18px;
  color: #0030E3;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
  background-color: white;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 10px;
  }
`;

const TableCell = styled.td<{ align?: string }>`
  padding: 12px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
  text-align: ${({ align }) => align || 'left'};

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 12px;
  }
`;

const StatusBadge = styled.span<{ status: LoanStatus }>`
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ status }) => {
    switch (status) {
      case 'Unpaid': return '#f3f4f6';
      case 'Overdue': return '#fef3c7';
      case 'Paid': return '#d1fae5';
      default: return '#f3f4f6';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'Unpaid': return '#6b7280';
      case 'Overdue': return '#d97706';
      case 'Paid': return '#10b981';
      default: return '#6b7280';
    }
  }};

  @media (max-width: 768px) {
    padding: 2px 8px;
    font-size: 11px;
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

  &:hover {
    background-color: #f3f4f6;
  }
`;

const RepayButton = styled.button`
  padding: 6px 12px;
  background-color: transparent;
  color: #0030E3;
  border: 1px solid #0030E3;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #E6EFFF;
  }

  svg {
    margin-left: 4px;
  }
`;

const PaginationButton = styled.button<{ isActive?: boolean; disabled?: boolean }>`
  width: 32px;
  height: 32px;
  border: 1px solid #d1d5db;
  background-color: ${({ isActive }) => isActive ? '#0030E3' : 'white'};
  color: ${({ isActive, disabled }) => 
    disabled ? '#9ca3af' : isActive ? 'white' : '#374151'
  };
  border-radius: 4px;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  font-weight: ${({ isActive }) => isActive ? '600' : '400'};
  margin: 0 2px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
`;

// Mock data
const mockLoanData: LoanDetails = {
  id: 'loan-1',
  title: 'Financing Business Operating Capital Loan',
  description: 'Financing for working capital to support day-to-day business operations.',
  progress: 30,
  currentAmount: 750000,
  totalAmount: 2500000,
  currency: 'AED',
  payments: [
    { id: '1', dueDate: '01.05.2025', total: 12000, principal: 12000, interest: 0, status: 'Unpaid' },
    { id: '2', dueDate: '01.04.2025', total: 15000, principal: 15000, interest: 0, status: 'Overdue' },
    { id: '3', dueDate: '01.03.2025', total: 20000, principal: 20000, interest: 0, status: 'Paid' },
    { id: '4', dueDate: '01.02.2025', total: 25000, principal: 25000, interest: 0, status: 'Paid' },
    { id: '5', dueDate: '01.01.2025', total: 50000, principal: 25000, interest: 0, status: 'Paid' },
  ]
};

const financialCategories = [
  { key: 'business-loans' as FinancialCategory, label: 'Business Loans' },
  { key: 'investments' as FinancialCategory, label: 'Investments' },
  { key: 'asset-finance' as FinancialCategory, label: 'Asset Finance' },
  { key: 'growth-finance' as FinancialCategory, label: 'Growth Finance' },
  { key: 'project-finance' as FinancialCategory, label: 'Project Finance' },
  { key: 'working-capital' as FinancialCategory, label: 'Working Capital' },
  { key: 'trade-supply' as FinancialCategory, label: 'Trade & Supply' },
  { key: 'seed-funding' as FinancialCategory, label: 'Seed Funding' },
  { key: 'equity-growth' as FinancialCategory, label: 'Equity Growth' }

];

const InsightsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<InsightTab>('financial');
  const [activeCategory, setActiveCategory] = useState<FinancialCategory>('business-loans');
  const [expandedLoans, setExpandedLoans] = useState<Set<string>>(new Set(['loan-1']));
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 6;

  // Handle responsive design
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Handle loan expansion
  const toggleLoanExpansion = (loanId: string) => {
    const newExpanded = new Set(expandedLoans);
    if (newExpanded.has(loanId)) {
      newExpanded.delete(loanId);
    } else {
      newExpanded.add(loanId);
    }
    setExpandedLoans(newExpanded);
  };

  // Pagination logic
  const totalPages = Math.ceil(mockLoanData.payments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = mockLoanData.payments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box p={isMobile ? '16px' : '24px'} minHeight="100vh">
      <Container maxWidth="1400px">
        {/* Main Tab Navigation */}
        <FlexBox mb="24px">
          <TabButton
            isActive={activeTab === 'financial'}
            onClick={() => setActiveTab('financial')}
          >
            Financial Insights
          </TabButton>
          <TabButton
            isActive={activeTab === 'non-financial'}
            onClick={() => setActiveTab('non-financial')}
          >
            Non-Financial Insights
          </TabButton>
        </FlexBox>

        {activeTab === 'financial' && (
          <>
            {/* Sub Navigation */}
            <ScrollableNav mb="24px">
              {financialCategories.map((category) => (
                <SubNavButton
                  key={category.key}
                  isActive={activeCategory === category.key}
                  onClick={() => setActiveCategory(category.key)}
                >
                  {category.label}
                </SubNavButton>
              ))}
            </ScrollableNav>

            {/* Main Content Layout */}
            <FlexBox
              flexDirection={isMobile ? 'column' : 'row'}
              alignItems="flex-start"
            >
              {/* Left Content - Main Loans */}
              <Box flex="1" minWidth="0">
                {/* Business Loans Section */}
                <ExpandableSection
                  isExpanded={expandedLoans.has('loan-1')}
                  onClick={() => toggleLoanExpansion('loan-1')}
                >
                  <Box p="20px">
                    <FlexBox alignItems="center" justifyContent="space-between">
                      <FlexBox alignItems="center">
                        {expandedLoans.has('loan-1') ? (
                          <ChevronUp size={20} color="#6b7280" />
                        ) : (
                          <ChevronDown size={20} color="#6b7280" />
                        )}
                        <Box ml="16px">
                          <Typography fontSize="16px" fontWeight="600" color="#111827">
                            {mockLoanData.title}
                          </Typography>
                        </Box>
                      </FlexBox>
                    </FlexBox>

                    {expandedLoans.has('loan-1') && (
                      <Box mt="20px" onClick={(e) => e.stopPropagation()}>
                        {/* Loan Progress Section */}
                        <FlexBox
                          flexDirection={isMobile ? 'column' : 'row'}
                          alignItems={isMobile ? 'flex-start' : 'center'}
                          mb="24px"
                        >
                          <ProgressCircle progress={mockLoanData.progress}>
                            <ProgressText>{mockLoanData.progress}%</ProgressText>
                          </ProgressCircle>
                          
                          <Box flex="1" ml={isMobile ? '0' : '24px'} mt={isMobile ? '24px' : '0'}>
                            <Typography fontSize="16px" fontWeight="600" color="#111827" mb="8px">
                              Loan Details
                            </Typography>
                            <Typography fontSize="14px" color="#6b7280" mb="12px">
                              {mockLoanData.description}
                            </Typography>
                            <Typography fontSize="14px" fontWeight="500" color="#111827">
                              {mockLoanData.currentAmount.toLocaleString()}/{mockLoanData.totalAmount.toLocaleString()} {mockLoanData.currency}
                            </Typography>
                          </Box>
                        </FlexBox>

                        {/* Loan Repayment Schedule */}
                        <FlexBox justifyContent="space-between" alignItems="center" mb="16px">
                          <Typography fontSize="16px" fontWeight="600" color="#111827">
                            Loan repayment schedule
                          </Typography>
                          <FlexBox alignItems="center" style={{ cursor: 'pointer' }}>
                            <Typography fontSize="14px" color="#0030E3" fontWeight="500">
                              Download Statement
                            </Typography>
                          </FlexBox>
                        </FlexBox>

                        {/* Payments Table */}
                        <Box style={{ overflowX: 'auto' }} mb="16px">
                          <Table>
                            <thead>
                              <tr>
                                <TableHeader>DUE DATE</TableHeader>
                                <TableHeader>TOTAL (AED)</TableHeader>
                                <TableHeader>PRINCIPAL (AED)</TableHeader>
                                <TableHeader>INTEREST (%)</TableHeader>
                                <TableHeader>STATUS</TableHeader>
                                <TableHeader>ACTION</TableHeader>
                              </tr>
                            </thead>
                            <tbody>
                              {currentPayments.map((payment) => (
                                <tr key={payment.id}>
                                  <TableCell>{payment.dueDate}</TableCell>
                                  <TableCell>{payment.total.toLocaleString()}</TableCell>
                                  <TableCell>{payment.principal.toLocaleString()}</TableCell>
                                  <TableCell>{payment.interest}</TableCell>
                                  <TableCell>
                                    <StatusBadge status={payment.status}>
                                      {payment.status}
                                    </StatusBadge>
                                  </TableCell>
                                  <TableCell>
                                    <ActionButton>
                                      <MoreVertical size={16} />
                                    </ActionButton>
                                  </TableCell>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Box>

                        {/* Pagination */}
                        <FlexBox justifyContent="space-between" alignItems="center">
                          <Typography fontSize="14px" color="#6b7280">
                            Showing {startIndex + 1} of {mockLoanData.payments.length}
                          </Typography>
                          
                          <FlexBox alignItems="center">
                            <PaginationButton
                              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                              disabled={currentPage === 1}
                            >
                              ‹
                            </PaginationButton>
                            
                            {[...Array(totalPages)].map((_, i) => (
                              <PaginationButton
                                key={i + 1}
                                isActive={currentPage === i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                              >
                                {i + 1}
                              </PaginationButton>
                            ))}
                            
                            <PaginationButton
                              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                              disabled={currentPage === totalPages}
                            >
                              ›
                            </PaginationButton>
                          </FlexBox>
                        </FlexBox>
                      </Box>
                    )}
                  </Box>
                </ExpandableSection>

                {/* Additional expandable sections for other loans can be added here */}
                <ExpandableSection isExpanded={false}>
                  <Box p="20px">
                    <FlexBox alignItems="center">
                      <ChevronDown size={20} color="#6b7280" />
                      <Box ml="16px">
                        <Typography fontSize="16px" fontWeight="600" color="#111827">
                          Microfinance Loan
                        </Typography>
                      </Box>
                    </FlexBox>
                  </Box>
                </ExpandableSection>
              </Box>

              {/* Right Sidebar */}
              <Box 
                width={isMobile ? '100%' : '320px'} 
                flexShrink="0"
                ml={isMobile ? '0' : '24px'}
                mt={isMobile ? '24px' : '0'}
              >
                {/* Business Loans Overview */}
                <Card border="1px solid #e5e7eb" borderRadius="8px" p="20px" mb="20px">
                  <Typography fontSize="16px" fontWeight="600" color="#111827" mb="16px">
                    Business Loans Overview
                  </Typography>
                  
                  <FlexBox justifyContent="space-between" mb="12px">
                    <Typography fontSize="14px" color="#6b7280">Total Capital Obtained</Typography>
                    <Typography fontSize="14px" fontWeight="500" color="#111827">AED. 500,000</Typography>
                  </FlexBox>
                  
                  <FlexBox justifyContent="space-between" mb="12px">
                    <Typography fontSize="14px" color="#6b7280">Outstanding Balance</Typography>
                    <Typography fontSize="14px" fontWeight="500" color="#111827">AED. 35,000</Typography>
                  </FlexBox>
                  
                  <FlexBox justifyContent="space-between" mb="12px">
                    <Typography fontSize="14px" color="#6b7280">Overall Repayment Progress</Typography>
                    <Typography fontSize="14px" fontWeight="500" color="#111827">64%</Typography>
                  </FlexBox>
                  
                  <FlexBox justifyContent="space-between" mb="20px">
                    <Typography fontSize="14px" color="#6b7280">Overall Interest Rate</Typography>
                    <Typography fontSize="14px" fontWeight="500" color="#111827">0%</Typography>
                  </FlexBox>

                  {/* Border Separator */}
                  <Box style={{ borderTop: '1px solid #DDDDDD', margin: '20px 0' }} />

                  {/* Updates Section */}
                  <Typography fontSize="16px" fontWeight="600" color="#111827" mb="16px">
                    Updates
                  </Typography>
                  
                  <Typography fontSize="14px" color="#6b7280" mb="8px">
                    Next Payment Due in 3days:
                  </Typography>
                  <FlexBox justifyContent="space-between" alignItems="center" mb="16px">
                    <Typography fontSize="14px" fontWeight="500" color="#111827">
                      AED. 12,000
                    </Typography>
                    <RepayButton>
                      Repay Now
                      <ExternalLink size={12} />
                    </RepayButton>
                  </FlexBox>
                  
                  <Typography fontSize="14px" color="#6b7280" mb="8px">
                    Overdue Payment:
                  </Typography>
                  <FlexBox justifyContent="space-between" alignItems="center">
                    <Typography fontSize="14px" fontWeight="500" color="#111827">
                      AED. 15,000
                    </Typography>
                    <RepayButton>
                      Repay Now
                      <ExternalLink size={12} />
                    </RepayButton>
                  </FlexBox>
                </Card>
              </Box>
            </FlexBox>
          </>
        )}

        {activeTab === 'non-financial' && (
          <Card p="40px" textAlign="center">
            <Typography fontSize="18px" color="#6b7280">
              Non-Financial Insights content will be displayed here
            </Typography>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default InsightsPage;