import { ReceivedReport, ReportDocument, SubmittedReport, UpcomingObligation } from '../types/reporting';

export function filterObligationsByStatus(obligations: UpcomingObligation[], status: string): UpcomingObligation[] {
  if (status === 'all') return obligations;
  return obligations.filter(obligation => obligation.status.toLowerCase() === status.toLowerCase());
}

export function filterReportsByStatus(reports: SubmittedReport[], status: string): SubmittedReport[] {
  if (status === 'all') return reports;
  return reports.filter(report => report.status.toLowerCase() === status.toLowerCase());
}

export function filterReportsByPriority(reports: ReceivedReport[], priority: string): ReceivedReport[] {
  if (priority === 'all') return reports;
  return reports.filter(report => report.priority.toLowerCase() === priority.toLowerCase());
}

export function filterDocumentsByCategory(documents: ReportDocument[], category: string): ReportDocument[] {
  if (category === 'all') return documents;
  return documents.filter(document => document.category.toLowerCase() === category.toLowerCase());
}

export function searchItems<T extends Record<string, any>>(items: T[], query: string, searchFields: (keyof T)[]): T[] {
  if (!query.trim()) return items;

  const lowercaseQuery = query.toLowerCase();
  return items.filter(item =>
    searchFields.some(field => {
      const value = item[field];
      return typeof value === 'string' && value.toLowerCase().includes(lowercaseQuery);
    })
  );
}

export function filterByDateRange<T extends { [K in DateField]: string }>(
  items: T[],
  dateRange: { startDate: string | null; endDate: string | null },
  dateField: keyof T
): T[] {
  if (!dateRange.startDate && !dateRange.endDate) return items;

  return items.filter(item => {
    const itemDate = new Date(item[dateField] as string);

    if (dateRange.startDate && itemDate < new Date(dateRange.startDate)) {
      return false;
    }

    if (dateRange.endDate && itemDate > new Date(dateRange.endDate)) {
      return false;
    }

    return true;
  });
}

type DateField = string;

export function getStatusColor(status: string): { bg: string; text: string } {
  switch (status.toLowerCase()) {
    case 'approved':
      return { bg: 'bg-green-100', text: 'text-green-800' };
    case 'pending review':
    case 'pending':
      return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
    case 'rejected':
    case 'overdue':
      return { bg: 'bg-red-100', text: 'text-red-800' };
    case 'due soon':
      return { bg: 'bg-amber-100', text: 'text-amber-800' };
    case 'upcoming':
      return { bg: 'bg-blue-100', text: 'text-blue-800' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-800' };
  }
}

export function getPriorityColor(priority: string): { bg: string; text: string } {
  switch (priority.toLowerCase()) {
    case 'high':
      return { bg: 'bg-red-100', text: 'text-red-800' };
    case 'medium':
      return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
    case 'low':
      return { bg: 'bg-green-100', text: 'text-green-800' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-800' };
  }
}