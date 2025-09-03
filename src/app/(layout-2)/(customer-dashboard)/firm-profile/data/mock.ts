// ./data/mock.ts
// Tabs from EDE PDF
export const tabs = [
  "Business Overview",
  "Governance & Compliance",
  "Revenue & Finance",
  "Reach & Capacity",
  "Products, Services & Customers",
  "Growth & Partnerships",
  "Risks & Readiness",
];

// ---------- Business Overview ----------
export const businessOverview = {
  identityAndDescription: {
    businessName: "FreshHarvest Organics Ltd",
    tradingName: "FreshHarvest",
    yearOfEstablishment: "2017",
    tagline:
      "Empowering communities through organic food solutions.",
    legalStructure: "Private Ltd",
    registrationNumber: "CPR/2017/54321",
    businessLogo: "freshharvest-logo.png",
    industry: "Agribusiness",
  },
  contactAndDigitalPresence: {
    email: "info@freshharvest.co.ke",
    phone: "+254701234567",
    website: "https://www.freshharvest.co.ke",
    social: {
      facebook: "https://facebook.com/freshharvest",
      linkedin: "https://linkedin.com/company/freshharvest",
      instagram: "https://instagram.com/freshharvest",
    },
    whatsapp: "+254701234567",
    headOfficeLocation: "Industrial Area, Nairobi, Kenya",
    branchLocations: ["Eldoret", "Kisumu"],
  },
};

// ---------- Governance & Compliance ----------
export const governanceCompliance = {
  ownershipAndLeadership: {
    ownershipType: "Family-owned",
    ownerCeoName: "Grace Wambui",
    founderGender: "Female",
    founderAgeRange: "36–50",
    hasBoardOfDirectors: true,
    hasAdvisoryBoard: false,
    keyDecisionMakers: ["Managing Director", "Finance Manager"],
  },
  registrationAndLicensing: {
    registeredWith: ["BRS", "County Government"],
    businessLicenseType: "Trade License",
    taxId: "P012345678A",
    complianceCertificates: [
      {
        filename: "tax-compliance-cert.pdf",
        description: "Valid until Dec 2025",
      },
    ],
    statutoryCompliance: ["NSSF", "NHIF"],
  },
};

// ---------- Revenue & Finance ----------
export const revenueFinance = {
  businessModelAndIncome: {
    primaryRevenueModel: "Manufacturing",
    incomeSources: ["Direct Sales", "Export", "Licensing"],
    keyRevenueDrivers: ["Weekly supermarket contracts", "Export to Rwanda"],
  },
  financialProfile: {
    estAnnualRevenueRange: "KES 10M–20M",
    monthlyRevenueRange: "KES 800K–1.6M",
    bookkeepingMethod: "Accounting Software",
    accountingSoftware: "QuickBooks",
    hasFinancialStatements: true,
    hasBusinessBankAccount: true,
    isRegisteredForTax: true,
    isProfitable: true,
    hasOutstandingLoans: { value: true, total: "KES 2.5M" },
    previousFundingReceived: ["Loan", "Grant", "Mentorship"],
    currentFinancialChallenges: ["Cash flow", "Access to credit"],
  },
};

// ---------- Reach & Capacity ----------
export const reachCapacity = {
  marketPresence: {
    geographicReach: ["National", "Regional (EAC)"],
    exporting: { value: true, countries: ["Rwanda", "Tanzania"] },
    marketSegmentsServed: ["Premium", "Diaspora"],
  },
  humanCapital: {
    fullTime: 25,
    partTime: 10,
    seasonal: 15,
    youthEmployment: { value: true, count: 18 },
    femaleEmployment: { value: true, count: 12 },
    specialGroups: ["Women-led teams", "PWDs"],
    skillsGaps: ["Sales", "Leadership", "Product Development"],
  },
  infrastructure: {
    premises: "Rented",
    facilityTypes: ["Workshop", "Warehouse"],
    utilities: ["Electricity", "Water", "Internet"],
    equipmentOwned: ["Packaging Tools", "Delivery Van", "POS System"],
    assetValueEstimate: "KES 6.8M",
  },
};

// ---------- Products, Services & Customers ----------
export const productsServicesCustomers = {
  productServiceInfo: {
    mainProducts: ["Organic dried mango", "Herbal tea", "Chili sauce"],
    categories: ["Agro-processing"],
    valueChainPosition: "Manufacturer",
    monthlyProductionVolume: "3,500 units",
    usp:
      "100% pesticide-free products processed with eco-friendly packaging",
    certifications: ["KEBS", "Organic Certified (EcoCert)"],
  },
  customerSegments: {
    customerTypes: ["B2B", "B2C", "NGOs"],
    customerLocations: ["Local", "Diaspora", "Regional"],
    averageCustomerSize: ["SMEs", "Corporates"],
    repeatCustomersPct: 75,
    keyClients: ["Zucchini Grocers", "Village Market Kiosk", "Kigali Greenmart"],
  },
  deliveryChannels: {
    salesChannels: ["Social Media", "Distributors", "In-person Retail"],
    paymentMethods: ["Mobile Money", "Bank Transfer", "Cash"],
    orderFulfillment: "Own delivery",
  },
};

// ---------- Growth & Partnerships ----------
export const growthPartnerships = {
  businessGoals: {
    shortTerm:
      "Acquire cold storage facility and hire sales lead",
    longTerm:
      "Become East Africa’s leading organic snacks exporter",
    growthStage: "Growth",
    expansionPlans:
      "Expand product range into dried pineapples and online distribution",
  },
  partnerships: {
    existingPartners: ["Farm Africa", "TechnoServe", "Sarai Farmers Coop"],
    interestedInPartnerships: {
      value: true,
      interests: ["Market Access", "Tech Support"],
    },
    desiredSupport: ["Digital Tools", "Branding", "Logistics"],
  },
  supportHistory: {
    pastSupportReceived: ["Incubation", "Training", "Mentorship"],
    wasEffective: { value: true, comment: "Mentorship helped streamline operations" },
    barriersToUsingSupport: ["Cost", "Geographic location"],
  },
};

// ---------- Risks & Readiness ----------
export const risksReadiness = {
  businessChallenges: {
    currentBarriers: ["Equipment Costs", "Market Competition", "Access to Capital"],
  },
  investmentCreditReadiness: {
    hasBusinessPlan: { value: true, upload: "freshharvest-bizplan.pdf" },
    tracksFinancialsMonthly: true,
    hasAuditedFinancials: { value: false, upload: null },
    creditworthyScore: 4,
    openToDueDiligence: true,
  },
  regulatoryRisks: {
    encounteredRegulatoryChallenges: {
      value: true,
      detail: "Difficulty obtaining export permits",
    },
    pendingApprovals: { value: true, upload: "export-cert-application.pdf" },
    recentIncidents: { value: false, explanation: "" },
  },
};

// Keep these legacy exports used by SidebarCard (you can retire later if not needed)
export const firmData = {
  name: businessOverview.identityAndDescription.businessName,
  businessType: businessOverview.identityAndDescription.industry,
  stage: "Growth",
  industry: businessOverview.identityAndDescription.industry,
  location: businessOverview.contactAndDigitalPresence.headOfficeLocation,
  currency: "KES",
  founded: businessOverview.identityAndDescription.yearOfEstablishment,
  employees: String(reachCapacity.humanCapital.fullTime),
  incorporationType: businessOverview.identityAndDescription.legalStructure,
  website: businessOverview.contactAndDigitalPresence.website,
};
