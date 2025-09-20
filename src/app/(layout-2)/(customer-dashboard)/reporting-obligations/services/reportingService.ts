"use client";

import { GraphQLClient } from 'graphql-request';
import { ReportingData } from '../types/reporting';

// Initialize Vendure GraphQL client
const VENDURE_API_URL = process.env.NEXT_PUBLIC_VENDURE_SHOP_API || "http://localhost:3012/shop-api";
const ENABLE_MOCK_DATA = process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA === 'true';

const client = new GraphQLClient(VENDURE_API_URL, {
  headers: {
    "Content-Type": "application/json"
  },
});

// GraphQL queries for reporting data
const GET_REPORTING_SUMMARY = `
  query GetReportingSummary {
    # This would be a custom query in Vendure for reporting data
    # For now, we'll use a placeholder structure
    activeCustomer {
      id
      emailAddress
    }
  }
`;

const GET_OBLIGATIONS = `
  query GetObligations {
    # Custom Vendure query for obligations
    activeCustomer {
      id
      orders {
        totalItems
      }
    }
  }
`;

// Mock data for development - replace with actual Vendure queries
const mockReportData: ReportingData = {
  summaryData: {
    totalReports: 32,
    completed: 24,
    pending: 6,
    overdue: 2,
    complianceRate: 88
  },
  upcomingObligations: [
    {
      id: "1",
      name: "Quarterly Financial Statement",
      dueDate: "2025-03-15",
      status: "Due Soon",
      assignedTo: "John Smith",
      type: "Financial"
    },
    {
      id: "2",
      name: "Annual Environmental Compliance Report",
      dueDate: "2025-03-31",
      status: "Upcoming",
      assignedTo: "Sarah Johnson",
      type: "Environmental"
    },
    {
      id: "3",
      name: "Employee Health & Safety Assessment",
      dueDate: "2025-02-28",
      status: "Overdue",
      assignedTo: "Ahmed Al Mansoori",
      type: "Compliance"
    },
    {
      id: "4",
      name: "Regulatory Capital Adequacy Report",
      dueDate: "2025-03-20",
      status: "Upcoming",
      assignedTo: "Fatima Al Zaabi",
      type: "Regulatory"
    },
    {
      id: "5",
      name: "Data Protection Compliance Audit",
      dueDate: "2025-03-10",
      status: "Due Soon",
      assignedTo: "Michael Chen",
      type: "Compliance"
    }
  ],
  submittedReports: [
    {
      id: "1",
      name: "Q4 Financial Statement",
      type: "Financial",
      status: "Approved",
      submittedDate: "2025-01-15",
      reviewer: "ADGM Financial Authority",
      fileUrl: "https://example.com/reports/q4-financial.pdf"
    },
    {
      id: "2",
      name: "Anti-Money Laundering Compliance",
      type: "Regulatory",
      status: "Approved",
      submittedDate: "2024-12-30",
      reviewer: "Financial Services Regulatory Authority",
      fileUrl: "https://example.com/reports/aml-compliance.pdf"
    },
    {
      id: "3",
      name: "Employee Diversity Report",
      type: "Operational",
      status: "Pending Review",
      submittedDate: "2025-02-05",
      reviewer: "Ministry of Human Resources",
      fileUrl: "https://example.com/reports/diversity.pdf"
    },
    {
      id: "4",
      name: "Carbon Footprint Assessment",
      type: "Environmental",
      status: "Approved",
      submittedDate: "2024-11-22",
      reviewer: "Environment Agency Abu Dhabi",
      fileUrl: "https://example.com/reports/carbon-footprint.pdf"
    },
    {
      id: "5",
      name: "Data Security Incident Report",
      type: "Compliance",
      status: "Rejected",
      submittedDate: "2025-01-28",
      reviewer: "ADGM Data Protection Commissioner",
      fileUrl: "https://example.com/reports/security-incident.pdf"
    }
  ],
  receivedReports: [
    {
      id: "1",
      title: "Industry Compliance Standards Update",
      source: "ADGM Financial Services Regulatory Authority",
      receivedDate: "2025-02-20",
      priority: "High",
      fileUrl: "https://example.com/reports/industry-standards.pdf"
    },
    {
      id: "2",
      title: "Market Risk Assessment",
      source: "Central Bank of UAE",
      receivedDate: "2025-02-15",
      priority: "Medium",
      fileUrl: "https://example.com/reports/market-risk.pdf"
    },
    {
      id: "3",
      title: "Quarterly Economic Outlook",
      source: "Abu Dhabi Department of Economic Development",
      receivedDate: "2025-02-10",
      priority: "Low",
      fileUrl: "https://example.com/reports/economic-outlook.pdf"
    },
    {
      id: "4",
      title: "Cybersecurity Threat Advisory",
      source: "UAE Computer Emergency Response Team",
      receivedDate: "2025-02-05",
      priority: "High",
      fileUrl: "https://example.com/reports/cybersecurity-advisory.pdf"
    }
  ],
  reportDocuments: [
    {
      id: "1",
      name: "Q4 Financial Statement.pdf",
      category: "Financial",
      fileType: "pdf",
      fileSize: "2.4 MB",
      uploadDate: "2025-01-15",
      fileUrl: "https://example.com/reports/q4-financial.pdf"
    },
    {
      id: "2",
      name: "Anti-Money Laundering Compliance.pdf",
      category: "Regulatory",
      fileType: "pdf",
      fileSize: "3.1 MB",
      uploadDate: "2024-12-30",
      fileUrl: "https://example.com/reports/aml-compliance.pdf"
    },
    {
      id: "3",
      name: "Employee Diversity Report.xlsx",
      category: "Operational",
      fileType: "excel",
      fileSize: "1.8 MB",
      uploadDate: "2025-02-05",
      fileUrl: "https://example.com/reports/diversity.xlsx"
    },
    {
      id: "4",
      name: "Carbon Footprint Assessment.pdf",
      category: "Environmental",
      fileType: "pdf",
      fileSize: "4.2 MB",
      uploadDate: "2024-11-22",
      fileUrl: "https://example.com/reports/carbon-footprint.pdf"
    }
  ]
};

export async function fetchReportingData(): Promise<ReportingData> {
  try {
    // For development, return mock data with a delay to simulate API call
    if (ENABLE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      return mockReportData;
    }

    // TODO: Replace with actual Vendure GraphQL queries
    // const summaryData = await client.request(GET_REPORTING_SUMMARY);
    // const obligationsData = await client.request(GET_OBLIGATIONS);

    // For now, return mock data even in production until Vendure integration is complete
    return mockReportData;
  } catch (error) {
    console.error('Error fetching reporting data from Vendure:', error);
    throw new Error('Failed to fetch reporting data');
  }
}

export async function submitReport(reportData: any): Promise<void> {
  try {
    // TODO: Implement Vendure mutation for submitting reports
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Report submitted:', reportData);
  } catch (error) {
    console.error('Error submitting report:', error);
    throw new Error('Failed to submit report');
  }
}

export async function updateReportStatus(reportId: string, status: string): Promise<void> {
  try {
    // TODO: Implement Vendure mutation for updating report status
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Report status updated:', { reportId, status });
  } catch (error) {
    console.error('Error updating report status:', error);
    throw new Error('Failed to update report status');
  }
}