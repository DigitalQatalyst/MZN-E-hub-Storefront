"use client";

import { Fragment, useState } from "react";
import Grid from "@component/grid/Grid";
import Box from "@component/Box";
import Card from "@component/Card";
import Typography from "@component/Typography";
import FlexBox from "@component/FlexBox";

import { useScrollbarStyle } from "@hook/useScrollbarStyle";
import TabsRow from "@component/firmprofile/TabsRow";
import SidebarCard from "@component/firmprofile/SidebarCard";

import BusinessOverview from "@sections/firmprofile/BusinessOverview";
import GovernanceCompliance from "@sections/firmprofile/GovernanceCompliance";
import RevenueFinance from "@sections/firmprofile/RevenueFinance";

import {
  tabs,
  firmData,
  businessOverview,
  governanceCompliance,
  revenueFinance,
  reachCapacity,
  productsServicesCustomers,
  growthPartnerships,
  risksReadiness,
} from "./data/mock";

// Build content arrays (copied from your original)
// Build content arrays from EDE data
const businessIdentityItems = [
  {
    id: "bo-identity",
    title: "Identity & Description",
    content: (
      <Box>
        {[
          ["Business Name", businessOverview.identityAndDescription.businessName],
          ["Trading/Brand Name", businessOverview.identityAndDescription.tradingName],
          ["Year of Establishment", businessOverview.identityAndDescription.yearOfEstablishment],
          ["Legal Structure", businessOverview.identityAndDescription.legalStructure],
          ["Registration Number", businessOverview.identityAndDescription.registrationNumber],
          ["Industry/Sector", businessOverview.identityAndDescription.industry],
          ["Business Description / Tagline", businessOverview.identityAndDescription.tagline],
          ["Business Logo", businessOverview.identityAndDescription.businessLogo],
        ].map(([label, value], i, arr) => (
          <Box key={i} py="10px" borderBottom={i < arr.length - 1 ? "1px solid #f0f0f0" : "none"} display="flex" justifyContent="space-between">
            <Typography fontSize="14px" color="text.hint">{label}</Typography>
            <Typography fontSize="14px" sx={{ maxWidth: "60%", textAlign: "right" }}>{String(value)}</Typography>
          </Box>
        ))}
      </Box>
    ),
  },
  {
    id: "bo-contact",
    title: "Contact & Digital Presence",
    content: (
      <Box>
        {[
          ["Official Email", businessOverview.contactAndDigitalPresence.email],
          ["Phone Number", businessOverview.contactAndDigitalPresence.phone],
          ["Website", businessOverview.contactAndDigitalPresence.website],
          ["Facebook", businessOverview.contactAndDigitalPresence.social.facebook],
          ["LinkedIn", businessOverview.contactAndDigitalPresence.social.linkedin],
          ["Instagram", businessOverview.contactAndDigitalPresence.social.instagram],
          ["WhatsApp Business", businessOverview.contactAndDigitalPresence.whatsapp],
          ["Location (Head Office)", businessOverview.contactAndDigitalPresence.headOfficeLocation],
          ["Branch Locations", businessOverview.contactAndDigitalPresence.branchLocations.join(", ")],
        ].map(([label, value], i, arr) => (
          <Box key={i} py="10px" borderBottom={i < arr.length - 1 ? "1px solid #f0f0f0" : "none"} display="flex" justifyContent="space-between">
            <Typography fontSize="14px" color="text.hint">{label}</Typography>
            <Typography fontSize="14px" sx={{ maxWidth: "60%", textAlign: "right", wordBreak: "break-word" }}>
              {String(value)}
            </Typography>
          </Box>
        ))}
      </Box>
    ),
  },
];

const governanceComplianceItems = [
  {
    id: "gc-ownership",
    title: "Ownership & Leadership",
    content: (
      <Box>
        {[
          ["Type of Ownership", governanceCompliance.ownershipAndLeadership.ownershipType],
          ["Owner/CEO Name", governanceCompliance.ownershipAndLeadership.ownerCeoName],
          ["Gender of Founder/Owner", governanceCompliance.ownershipAndLeadership.founderGender],
          ["Age Range of Founder", governanceCompliance.ownershipAndLeadership.founderAgeRange],
          ["Board of Directors Present?", governanceCompliance.ownershipAndLeadership.hasBoardOfDirectors ? "Yes" : "No"],
          ["Advisory Board Present?", governanceCompliance.ownershipAndLeadership.hasAdvisoryBoard ? "Yes" : "No"],
          ["Key Decision Maker(s)", governanceCompliance.ownershipAndLeadership.keyDecisionMakers.join(", ")],
        ].map(([label, value], i, arr) => (
          <Box key={i} py="10px" borderBottom={i < arr.length - 1 ? "1px solid #f0f0f0" : "none"} display="flex" justifyContent="space-between">
            <Typography fontSize="14px" color="text.hint">{label}</Typography>
            <Typography fontSize="14px">{String(value)}</Typography>
          </Box>
        ))}
      </Box>
    ),
  },
  {
    id: "gc-registration",
    title: "Business Registration & Licensing",
    content: (
      <Box>
        <Box py="10px" borderBottom="1px solid #f0f0f0" display="flex" justifyContent="space-between">
          <Typography fontSize="14px" color="text.hint">Registered With</Typography>
          <Typography fontSize="14px">{governanceCompliance.registrationAndLicensing.registeredWith.join(", ")}</Typography>
        </Box>
        {[
          ["Business License Type", governanceCompliance.registrationAndLicensing.businessLicenseType],
          ["Tax Identification Number (KRA PIN)", governanceCompliance.registrationAndLicensing.taxId],
          ["Statutory Compliance Status", governanceCompliance.registrationAndLicensing.statutoryCompliance.join(", ")],
        ].map(([label, value], i) => (
          <Box key={i} py="10px" borderBottom={i < 2 ? "1px solid #f0f0f0" : "none"} display="flex" justifyContent="space-between">
            <Typography fontSize="14px" color="text.hint">{label}</Typography>
            <Typography fontSize="14px">{String(value)}</Typography>
          </Box>
        ))}
        {/* Certificates */}
        <Box mt="10px">
          <Typography fontSize="14px" fontWeight="600" mb="8px">Compliance Certificates</Typography>
          {governanceCompliance.registrationAndLicensing.complianceCertificates.map((c, idx) => (
            <Box key={idx} py="8px" px="12px" bg="#f8f9fa" borderRadius="8px" mb="8px">
              <Typography fontSize="12px">{c.filename} — {c.description}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    ),
  },
];

const revenueFinanceItems = [
  {
    id: "rf-model",
    title: "Business Model & Income Streams",
    content: (
      <Box>
        {[
          ["Primary Revenue Model", revenueFinance.businessModelAndIncome.primaryRevenueModel],
          ["Income Sources", revenueFinance.businessModelAndIncome.incomeSources.join(", ")],
          ["Key Revenue Drivers", revenueFinance.businessModelAndIncome.keyRevenueDrivers.join("; ")],
        ].map(([label, value], i, arr) => (
          <Box key={i} py="10px" borderBottom={i < arr.length - 1 ? "1px solid #f0f0f0" : "none"} display="flex" justifyContent="space-between">
            <Typography fontSize="14px" color="text.hint">{label}</Typography>
            <Typography fontSize="14px" sx={{ maxWidth: "60%", textAlign: "right" }}>{String(value)}</Typography>
          </Box>
        ))}
      </Box>
    ),
  },
  {
    id: "rf-financial",
    title: "Financial Profile",
    content: (
      <Box>
        {[
          ["Estimated Annual Revenue", revenueFinance.financialProfile.estAnnualRevenueRange],
          ["Monthly Revenue Range", revenueFinance.financialProfile.monthlyRevenueRange],
          ["Bookkeeping Method", revenueFinance.financialProfile.bookkeepingMethod],
          ["Accounting Software Used", revenueFinance.financialProfile.accountingSoftware],
          ["Financial Statements Available?", revenueFinance.financialProfile.hasFinancialStatements ? "Yes" : "No"],
          ["Business Bank Account?", revenueFinance.financialProfile.hasBusinessBankAccount ? "Yes" : "No"],
          ["Registered for Tax?", revenueFinance.financialProfile.isRegisteredForTax ? "Yes" : "No"],
          ["Is the Business Profitable?", revenueFinance.financialProfile.isProfitable ? "Yes" : "No"],
          ["Outstanding Loans/Credit?", revenueFinance.financialProfile.hasOutstandingLoans.value ? revenueFinance.financialProfile.hasOutstandingLoans.total : "No"],
          ["Previous Funding Received", revenueFinance.financialProfile.previousFundingReceived.join(", ")],
          ["Current Financial Challenges", revenueFinance.financialProfile.currentFinancialChallenges.join(", ")],
        ].map(([label, value], i, arr) => (
          <Box key={i} py="10px" borderBottom={i < arr.length - 1 ? "1px solid #f0f0f0" : "none"} display="flex" justifyContent="space-between">
            <Typography fontSize="14px" color="text.hint">{label}</Typography>
            <Typography fontSize="14px" sx={{ maxWidth: "60%", textAlign: "right" }}>{String(value)}</Typography>
          </Box>
        ))}
      </Box>
    ),
  },
];

const reachCapacityItems = [
  {
    id: "rc-market",
    title: "Market Presence",
    content: (
      <Box>
        {[
          ["Geographic Reach", reachCapacity.marketPresence.geographicReach.join(", ")],
          ["Exporting Products/Services?", reachCapacity.marketPresence.exporting.value ? `Yes — ${reachCapacity.marketPresence.exporting.countries.join(", ")}` : "No"],
          ["Market Segments Served", reachCapacity.marketPresence.marketSegmentsServed.join(", ")],
        ].map(([label, value], i, arr) => (
          <Box key={i} py="10px" borderBottom={i < arr.length - 1 ? "1px solid #f0f0f0" : "none"} display="flex" justifyContent="space-between">
            <Typography fontSize="14px" color="text.hint">{label}</Typography>
            <Typography fontSize="14px">{String(value)}</Typography>
          </Box>
        ))}
      </Box>
    ),
  },
  {
    id: "rc-human",
    title: "Human Capital",
    content: (
      <Box>
        {[
          ["Full-Time Staff", String(reachCapacity.humanCapital.fullTime)],
          ["Part-Time Staff", String(reachCapacity.humanCapital.partTime)],
          ["Contract/Seasonal Workers", String(reachCapacity.humanCapital.seasonal)],
          ["Youth Employment (18–35)?", reachCapacity.humanCapital.youthEmployment.value ? `Yes — ${reachCapacity.humanCapital.youthEmployment.count}` : "No"],
          ["Female Employment?", reachCapacity.humanCapital.femaleEmployment.value ? `Yes — ${reachCapacity.humanCapital.femaleEmployment.count}` : "No"],
          ["Special Groups Employed", reachCapacity.humanCapital.specialGroups.join(", ")],
          ["Skills & Capacity Gaps", reachCapacity.humanCapital.skillsGaps.join(", ")],
        ].map(([label, value], i, arr) => (
          <Box key={i} py="10px" borderBottom={i < arr.length - 1 ? "1px solid #f0f0f0" : "none"} display="flex" justifyContent="space-between">
            <Typography fontSize="14px" color="text.hint">{label}</Typography>
            <Typography fontSize="14px">{String(value)}</Typography>
          </Box>
        ))}
      </Box>
    ),
  },
  {
    id: "rc-infra",
    title: "Infrastructure",
    content: (
      <Box>
        {[
          ["Business Premises", reachCapacity.infrastructure.premises],
          ["Type of Facility", reachCapacity.infrastructure.facilityTypes.join(", ")],
          ["Utilities Available", reachCapacity.infrastructure.utilities.join(", ")],
          ["Equipment Owned", reachCapacity.infrastructure.equipmentOwned.join(", ")],
          ["Asset Value Estimate", reachCapacity.infrastructure.assetValueEstimate],
        ].map(([label, value], i, arr) => (
          <Box key={i} py="10px" borderBottom={i < arr.length - 1 ? "1px solid #f0f0f0" : "none"} display="flex" justifyContent="space-between">
            <Typography fontSize="14px" color="text.hint">{label}</Typography>
            <Typography fontSize="14px">{String(value)}</Typography>
          </Box>
        ))}
      </Box>
    ),
  },
];

const pscItems = [
  {
    id: "psc-product",
    title: "Product/Service Information",
    content: (
      <Box>
        {[
          ["Main Products/Services", productsServicesCustomers.productServiceInfo.mainProducts.join(", ")],
          ["Product Categories", productsServicesCustomers.productServiceInfo.categories.join(", ")],
          ["Value Chain Position", productsServicesCustomers.productServiceInfo.valueChainPosition],
          ["Production Volume / Month", productsServicesCustomers.productServiceInfo.monthlyProductionVolume],
          ["Unique Selling Point", productsServicesCustomers.productServiceInfo.usp],
          ["Certifications/Standards", productsServicesCustomers.productServiceInfo.certifications.join(", ")],
        ].map(([label, value], i, arr) => (
          <Box key={i} py="10px" borderBottom={i < arr.length - 1 ? "1px solid #f0f0f0" : "none"} display="flex" justifyContent="space-between">
            <Typography fontSize="14px" color="text.hint">{label}</Typography>
            <Typography fontSize="14px" sx={{ maxWidth: "60%", textAlign: "right" }}>{String(value)}</Typography>
          </Box>
        ))}
      </Box>
    ),
  },
  {
    id: "psc-customer",
    title: "Customer Segments",
    content: (
      <Box>
        {[
          ["Type of Customers", productsServicesCustomers.customerSegments.customerTypes.join(", ")],
          ["Customer Location", productsServicesCustomers.customerSegments.customerLocations.join(", ")],
          ["Average Customer Size", productsServicesCustomers.customerSegments.averageCustomerSize.join(", ")],
          ["% Repeat Customers", `${productsServicesCustomers.customerSegments.repeatCustomersPct}%`],
          ["Key Client List", productsServicesCustomers.customerSegments.keyClients.join(", ")],
        ].map(([label, value], i, arr) => (
          <Box key={i} py="10px" borderBottom={i < arr.length - 1 ? "1px solid #f0f0f0" : "none"} display="flex" justifyContent="space-between">
            <Typography fontSize="14px" color="text.hint">{label}</Typography>
            <Typography fontSize="14px">{String(value)}</Typography>
          </Box>
        ))}
      </Box>
    ),
  },
];

const growthPartnershipsItems = [
  {
    id: "gp-goals",
    title: "Business Goals",
    content: (
      <Box>
        {[
          ["Short-Term Goals", growthPartnerships.businessGoals.shortTerm],
          ["Long-Term Vision", growthPartnerships.businessGoals.longTerm],
          ["Growth Stage", growthPartnerships.businessGoals.growthStage],
          ["Expansion Plans", growthPartnerships.businessGoals.expansionPlans],
        ].map(([label, value], i, arr) => (
          <Box key={i} py="10px" borderBottom={i < arr.length - 1 ? "1px solid #f0f0f0" : "none"} display="flex" justifyContent="space-between">
            <Typography fontSize="14px" color="text.hint">{label}</Typography>
            <Typography fontSize="14px" sx={{ maxWidth: "60%", textAlign: "right" }}>{String(value)}</Typography>
          </Box>
        ))}
      </Box>
    ),
  },
  {
    id: "gp-partnerships",
    title: "Partnerships",
    content: (
      <Box>
        {[
          ["Existing Partners", growthPartnerships.partnerships.existingPartners.join(", ")],
          ["Interested in Partnerships?", growthPartnerships.partnerships.interestedInPartnerships.value ? `Yes — ${growthPartnerships.partnerships.interestedInPartnerships.interests.join(", ")}` : "No"],
          ["Type of Support Desired", growthPartnerships.partnerships.desiredSupport.join(", ")],
        ].map(([label, value], i, arr) => (
          <Box key={i} py="10px" borderBottom={i < arr.length - 1 ? "1px solid #f0f0f0" : "none"} display="flex" justifyContent="space-between">
            <Typography fontSize="14px" color="text.hint">{label}</Typography>
            <Typography fontSize="14px">{String(value)}</Typography>
          </Box>
        ))}
      </Box>
    ),
  },
];

const risksReadinessItems = [
  {
    id: "rr-challenges",
    title: "Business Challenges",
    content: (
      <Box>
        {[
          ["Current Barriers", risksReadiness.businessChallenges.currentBarriers.join(", ")],
        ].map(([label, value], i) => (
          <Box key={i} py="10px" display="flex" justifyContent="space-between">
            <Typography fontSize="14px" color="text.hint">{label}</Typography>
            <Typography fontSize="14px">{String(value)}</Typography>
          </Box>
        ))}
      </Box>
    ),
  },
];

export default function FirmProfile() {
  useScrollbarStyle();

  const [activeTab, setActiveTab] = useState("Business Overview");
  const [expandedSections, setExpandedSections] = useState<Record<string | number, boolean>>({});

  const toggleSection = (id: number | string) =>
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <Fragment>
      <Box px={4} py={4} style={{ width: "100%" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <SidebarCard firmData={firmData} />
          </Grid>

          <Grid item xs={12} lg={8}>
            <TabsRow tabs={tabs} active={activeTab} onChange={setActiveTab} />

            {activeTab === "Business Overview" && (
              <BusinessOverview items={businessIdentityItems} expanded={expandedSections} onToggle={toggleSection} />
            )}

            {activeTab === "Governance & Compliance" && (
              <GovernanceCompliance items={governanceComplianceItems} expanded={expandedSections} onToggle={toggleSection} />
            )}

            {activeTab === "Revenue & Finance" && (
              <BusinessOverview items={revenueFinanceItems} expanded={expandedSections} onToggle={toggleSection} />
            )}

            {activeTab === "Reach & Capacity" && (
              <BusinessOverview items={reachCapacityItems} expanded={expandedSections} onToggle={toggleSection} />
            )}

            {activeTab === "Products, Services & Customers" && (
              <BusinessOverview items={pscItems} expanded={expandedSections} onToggle={toggleSection} />
            )}

            {activeTab === "Growth & Partnerships" && (
              <BusinessOverview items={growthPartnershipsItems} expanded={expandedSections} onToggle={toggleSection} />
            )}

            {activeTab === "Risks & Readiness" && (
              <BusinessOverview items={risksReadinessItems} expanded={expandedSections} onToggle={toggleSection} />
            )}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
