"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Import all card components
import { OnboardingProgress } from "./cards/OnboardingProcess";
import { ProfileCompletionCard } from "./cards/ProfileCompletion";
import { ServiceRequestsTable } from "./cards/ServiceRequestsTable";
import { QuickActions } from "./cards/QuickActions";
import { ObligationsDeadlines } from "./cards/ReportingObligations";
import { Announcements } from "./cards/Announcements";
import {
  PageLayout,
  PageSection,
  PrimaryButton,
  SectionContent,
  SectionHeader,
} from "./PageLayout";
import { MetricsOverview } from "./cards/MetricsOverview";

// TypeScript interfaces for data
interface ReportingObligation {
  id: string;
  title: string;
  dueDate: string;
  status: "Due Soon" | "Overdue" | "Complete" | "Submitted";
  statusColor: string;
}

interface ServiceApplication {
  id: string;
  title: string;
  lastUpdated: string;
  status: "Submitted" | "Under Review" | "Approved";
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
  status: "Paid" | "Pending" | "Overdue";
  nextDueDate: string;
}

// Main Dashboard Component
const RegulatoryDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onboardingData = {
    profileCompletion: 75,
    documentCompletion: 60,
    overallCompletion: 68,
  };

  const router = useRouter();
  // Sample data - in real app, this would come from API/state management
  const companyInfo = {
    companyName: "FutureTech LLC",
    licenseNumber: "F00123",
    licenseType: "Category 3C License",
    issueDate: "01/01/2021",
    expiryDate: "31/12/2025",
    reportingObligations: 2,
    openApplications: 2,
    profileCompletion: 60,
  };

  const reportingObligations: ReportingObligation[] = [
    {
      id: "1",
      title: "Quarterly AML Report",
      dueDate: "Due 15/07/2025",
      status: "Due Soon",
      statusColor: "#FF5630",
    },
    {
      id: "2",
      title: "Annual Financial Statement",
      dueDate: "Due 31/05/2025",
      status: "Submitted",
      statusColor: "#0065FF",
    },
  ];

  const serviceApplications: ServiceApplication[] = [
    {
      id: "1",
      title: "Request for New Authorization",
      lastUpdated: "Last updated 10/07/2025",
      status: "Submitted",
      statusColor: "#4CAF50",
    },
    {
      id: "2",
      title: "Annual Compliance Review",
      lastUpdated: "Last updated 08/07/2025",
      status: "Submitted",
      statusColor: "#4CAF50",
    },
  ];

  const quickAccessItems: QuickAccessItem[] = [
    {
      id: "1",
      title: "Apply for New Service",
      subtitle: "Browse available services",
      iconSrc: "/assets/images/icons/travel-explore.svg",
    },
    {
      id: "2",
      title: "2 Reporting Obligations Due Soon",
      subtitle: "Due in next 7 days",
      iconSrc: "/assets/images/icons/calendar-clock.svg",
    },
  ];

  const feeInfo: FeeInfo = {
    year: 2024,
    amount: 2500,
    currency: "USD",
    status: "Paid",
    nextDueDate: "31/12/2025",
  };

  // Event handlers
  const handleViewAllReportingObligations = () => {
    router.push("/reporting-obligations");
  };

  const handleReportingObligationClick = (obligationId: string) => {
    router.push("/reporting-obligations/");
  };

  const handleCompleteProfile = () => {
    router.push("/firm-profile");
  };

  const handleViewProfile = () => {
    router.push("/firm-profile");
  };

  const handleViewAllApplications = () => {
    console.log("/non-financial-records");
  };

  const handleApplicationClick = (applicationId: string) => {
    console.log("/non-financial-records");
  };

  const handleQuickAccessItemClick = (itemId: string) => {
    console.log("/non-financial-records");
  };

  const handleViewPenaltyHistory = () => {
    console.log("View penalty history clicked");
  };

  const handleViewInvoice = () => {
    console.log("View invoice clicked");
  };

  function handleNewRequest(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <PageLayout title="Dashboard Overview">
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          Your central view of business status, requests, and upcoming
          obligations.
        </p>
        <PrimaryButton onClick={handleNewRequest}>Create Request</PrimaryButton>
      </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {onboardingData.overallCompletion < 80 ? (
            <PageSection>
              <OnboardingProgress
                profileCompletion={onboardingData.profileCompletion}
                documentCompletion={onboardingData.documentCompletion}
                overallCompletion={onboardingData.overallCompletion}
                isLoading={isLoading}
              />
            </PageSection>
          ) : (
            <PageSection>
              <SectionHeader title="Key Metrics" description=" Overview of your business performance indicators" />                  
              <SectionContent>
                <MetricsOverview isLoading={isLoading} />
              </SectionContent>
            </PageSection>
          )}
            <PageSection>
              <SectionHeader
                title="Reporting Obligations"
                description="Track important deadlines and required actions"
              />

              <SectionContent>
                <ObligationsDeadlines isLoading={isLoading} />
              </SectionContent>
            </PageSection>

          <PageSection>
            <SectionHeader title="Recent Service Requests" description=" View and manage your recent service requests" />              
            <SectionContent>
              <ServiceRequestsTable isLoading={isLoading} />
            </SectionContent>
          </PageSection>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <PageSection>
            <SectionHeader title="Quick Actions" description="Common tasks and shortcuts for your business" />             
            <SectionContent>
              <QuickActions />
            </SectionContent>
          </PageSection>

          <PageSection className="lg:flex-grow">
            <SectionHeader title="Announcements" description="Important updates and notifications" />           
            <SectionContent>
              <Announcements isLoading={isLoading} />
            </SectionContent>
          </PageSection>
        </div>
      </div>
    </PageLayout>
  );
};

export default RegulatoryDashboard;
