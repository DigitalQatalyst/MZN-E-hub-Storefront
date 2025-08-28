export interface ServiceRequest {
  id: string;
  serviceName: string;
  category: string;
  dateRequested: string;
  status: 'Draft' | 'Under Review' | 'Approved' | 'Rejected';
}

export const serviceRequestsData: ServiceRequest[] = [
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

/**
 * Get service request by ID
 * @param id - The service request ID
 * @returns ServiceRequest object or null if not found
 */
export const getServiceRequestById = (id: string): ServiceRequest | null => {
  return serviceRequestsData.find(request => request.id === id) || null;
};

/**
 * Get all service requests
 * @returns Array of all service requests
 */
export const getAllServiceRequests = (): ServiceRequest[] => {
  return serviceRequestsData;
};