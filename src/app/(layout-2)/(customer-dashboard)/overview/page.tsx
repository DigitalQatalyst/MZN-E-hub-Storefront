"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

// Import all card components
import { CompanyInfoCard } from './cards/ProjectDetails';
import { ReportingObligationsCard } from './cards/ReportingObligations';
import { ProfileCompletionCard } from './cards/ProfileCompletion';
import { ServiceApplicationsCard } from './cards/ServiceApplications';
import { QuickAccessCard } from './cards/QuickAccess';
import { PenaltiesOverviewCard } from './cards/PenaltiesOverview';
import { AnnualFeesCard } from './cards/AnnualFees';

// TypeScript interfaces for data
interface ReportingObligation {
  id: string;
  title: string;
  dueDate: string;
  status: 'Due Soon' | 'Overdue' | 'Complete' | 'Submitted';
  statusColor: string;
}

interface ServiceApplication {
  id: string;
  title: string;
  lastUpdated: string;
  status: 'Submitted' | 'Under Review' | 'Approved';
  statusColor: string;
}

interface QuickAccessItem {
  id: string;
  title: string;
  subtitle: string;
  iconSrc: string;
}

interface FeeInfo {
  year: number;
  amount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  nextDueDate: string;
}

// Main Dashboard Component
const RegulatoryDashboard: React.FC = () => {
  const router = useRouter();
  // Sample data - in real app, this would come from API/state management
  const companyInfo = {
    companyName: 'FutureTech LLC',
    licenseNumber: 'F00123',
    licenseType: 'Category 3C License',
    issueDate: '01/01/2021',
    expiryDate: '31/12/2025',
    reportingObligations: 2,
    openApplications: 2,
    profileCompletion: 60
  };

  const reportingObligations: ReportingObligation[] = [
    { id: '1', title: 'Quarterly AML Report', dueDate: 'Due 15/07/2025', status: 'Due Soon', statusColor: '#FF5630' },
    { id: '2', title: 'Annual Financial Statement', dueDate: 'Due 31/05/2025', status: 'Submitted', statusColor: '#0065FF' }
  ];

  const serviceApplications: ServiceApplication[] = [
    { id: '1', title: 'Request for New Authorization', lastUpdated: 'Last updated 10/07/2025', status: 'Submitted', statusColor: '#4CAF50' },
    { id: '2', title: 'Annual Compliance Review', lastUpdated: 'Last updated 08/07/2025', status: 'Submitted', statusColor: '#4CAF50' }
  ];

  const quickAccessItems: QuickAccessItem[] = [
    { id: '1', title: 'Apply for New Service', subtitle: 'Browse available services', iconSrc: '/assets/images/icons/travel-explore.svg' },
    { id: '2', title: '2 Reporting Obligations Due Soon', subtitle: 'Due in next 7 days', iconSrc: '/assets/images/icons/calendar-clock.svg' }
  ];

  const feeInfo: FeeInfo = {
    year: 2024,
    amount: 2500,
    currency: 'USD',
    status: 'Paid',
    nextDueDate: '31/12/2025'
  };

  // Event handlers
  const handleViewAllReportingObligations = () => {
    router.push('/reporting-obligations');
  };

  const handleReportingObligationClick = (obligationId: string) => {
    router.push('/reporting-obligations/');
  };

  const handleCompleteProfile = () => {
    router.push('/firm-profile');
  };

  const handleViewProfile = () => {
    router.push('/firm-profile');
  };

  const handleViewAllApplications = () => {
    console.log('/non-financial-records');
  };

  const handleApplicationClick = (applicationId: string) => {
    console.log('/non-financial-records');
  };

  const handleQuickAccessItemClick = (itemId: string) => {
    console.log('/non-financial-records');
  };

  const handleViewPenaltyHistory = () => {
    console.log('View penalty history clicked');
  };

  const handleViewInvoice = () => {
    console.log('View invoice clicked');
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '24px'
    }}>
      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.8fr 1.2fr',
        gap: '24px'
      }}>
        {/* Left Column */}
        <div>
          <CompanyInfoCard {...companyInfo} onViewProfile={handleViewProfile} />
          
          <ReportingObligationsCard 
            obligations={reportingObligations}
            onViewAll={handleViewAllReportingObligations}
            onObligationClick={handleReportingObligationClick}
          />
          
          <ProfileCompletionCard 
            completionPercentage={companyInfo.profileCompletion}
            onCompleteProfile={handleCompleteProfile}
          />
          
          <ServiceApplicationsCard 
            applications={serviceApplications}
            onViewAll={handleViewAllApplications}
            onApplicationClick={handleApplicationClick}
          />
        </div>

        {/* Right Column */}
        <div>
          <QuickAccessCard 
            items={quickAccessItems}
            onItemClick={handleQuickAccessItemClick}
          />
          
          <PenaltiesOverviewCard 
            hasOutstandingPenalties={false}
            penaltyCount={0}
            onViewHistory={handleViewPenaltyHistory}
          />
          
          <AnnualFeesCard 
            feeInfo={feeInfo}
            onViewInvoice={handleViewInvoice}
          />
        </div>
      </div>
    </div>
  );
};

export default RegulatoryDashboard;