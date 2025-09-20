export interface SummaryData {
  totalReports: number;
  completed: number;
  pending: number;
  overdue: number;
  complianceRate: number;
}

export interface UpcomingObligation {
  id: string;
  name: string;
  dueDate: string;
  status: 'Due Soon' | 'Upcoming' | 'Overdue';
  assignedTo: string;
  type: string;
}

export interface SubmittedReport {
  id: string;
  name: string;
  type: string;
  status: 'Approved' | 'Pending Review' | 'Rejected';
  submittedDate: string;
  reviewer: string;
  fileUrl: string;
}

export interface ReceivedReport {
  id: string;
  title: string;
  source: string;
  receivedDate: string;
  priority: 'High' | 'Medium' | 'Low';
  fileUrl: string;
}

export interface ReportDocument {
  id: string;
  name: string;
  category: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  fileUrl: string;
}

export interface ReportingData {
  summaryData: SummaryData;
  upcomingObligations: UpcomingObligation[];
  submittedReports: SubmittedReport[];
  receivedReports: ReceivedReport[];
  reportDocuments: ReportDocument[];
}

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}