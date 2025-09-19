// Mock implementation of Dataverse API service
// In a real implementation, this would make actual API calls to Dataverse
// Mock cache to simulate API data
let dataCache = null;
// Simulate API call to fetch business profile data
export const fetchBusinessProfileData = async () => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 300));
  // If we have cached data, return it
  if (dataCache) {
    return dataCache;
  }
  // Otherwise, simulate API response with mock data
  // In a real implementation, this would be:
  // const response = await fetch('https://your-dataverse-api-endpoint/business-profiles/current');
  // const data = await response.json();
  // For now, we'll use the mock data structure but format it as if it came from Dataverse
  const mockData = generateMockDataverseResponse();
  dataCache = mockData;
  return mockData;
};
// Calculate completion percentage for a section based on field values
export const calculateSectionCompletion = sectionData => {
  if (!sectionData || !sectionData.fields || Object.keys(sectionData.fields).length === 0) {
    return 0;
  }
  let completedFields = 0;
  let totalFields = 0;
  // Count completed fields across all groups
  Object.keys(sectionData.fields).forEach(fieldKey => {
    totalFields++;
    if (sectionData.fields[fieldKey] && sectionData.fields[fieldKey].trim() !== '') {
      completedFields++;
    }
  });
  return Math.round(completedFields / totalFields * 100);
};
// Calculate mandatory fields completion for a section based on company stage
export const calculateMandatoryCompletion = (sectionData, sectionId, companyStage, config) => {
  if (!sectionData || !sectionData.fields || !config) {
    return {
      completed: 0,
      total: 0,
      percentage: 0
    };
  }
  const sectionConfig = config.tabs.find(tab => tab.id === sectionId);
  if (!sectionConfig) return {
    completed: 0,
    total: 0,
    percentage: 0
  };
  let mandatoryFields = 0;
  let completedMandatory = 0;
  sectionConfig.groups.forEach(group => {
    group.fields.forEach(field => {
      if (field.mandatory && field.mandatory.includes(companyStage)) {
        mandatoryFields++;
        if (sectionData.fields[field.fieldName] && sectionData.fields[field.fieldName].trim() !== '') {
          completedMandatory++;
        }
      }
    });
  });
  return {
    completed: completedMandatory,
    total: mandatoryFields,
    percentage: mandatoryFields > 0 ? Math.round(completedMandatory / mandatoryFields * 100) : 100
  };
};
// Generate mock data structure that simulates Dataverse API response
function generateMockDataverseResponse() {
  return {
    id: "12345",
    name: "FutureTech LLC",
    companyType: "Information Technology",
    companySize: "Medium Enterprise",
    companyStage: "growth",
    sections: {
      basic: {
        fields: {
          tradeName: "FutureTech",
          registrationNumber: "FT12345678",
          establishmentDate: "15-Mar-2010",
          entityType: "Limited Liability Company",
          registrationAuthority: "ADGM Registration Authority",
          legalStatus: "Active",
          businessType: "Limited Liability Company",
          industry: "Information Technology",
          businessSize: "Medium Enterprise",
          annualRevenue: "$25M - $50M",
          numberOfEmployees: "120",
          businessDescription: "Enterprise software solutions specializing in cloud-based enterprise management systems with AI-driven analytics capabilities. Our flagship products serve various industries including finance, healthcare, and manufacturing.",
          licenseExpiry: "31-Dec-2023",
          renewalStatus: "Pending",
          complianceStatus: "Compliant",
          lastUpdated: "10-Jun-2023",
          primaryIsicCode: "6201",
          primaryIsicDescription: "Computer programming activities",
          secondaryIsicCode: "6202",
          businessCategory: "Technology",
          marketSegment: "Enterprise Solutions",
          vatRegistrationNumber: "100123456700003",
          commercialLicenseNumber: "CN-12345",
          dunsNumber: "123456789",
          leiCode: "984500B38RH80URRT231",
          chamberOfCommerceNumber: "ADCCI-12345",
          fiveYearVision: "To become the leading enterprise software provider in the MENA region, with a focus on AI-driven solutions that transform business operations across industries.",
          investmentGoals: "$15M by Q2 2024 (Series B) - 60% complete",
          technologyRoadmap: "2023 Q4: Launch AI analytics platform\n2024 Q2: Expand IoT integration capabilities\n2024 Q4: Develop industry-specific solutions for healthcare\n2025: Blockchain integration for secure transactions"
        },
        status: {
          tradeName: "completed",
          registrationNumber: "completed",
          establishmentDate: "completed",
          entityType: "completed",
          registrationAuthority: "completed",
          legalStatus: "completed",
          businessType: "completed",
          industry: "completed",
          businessSize: "completed",
          annualRevenue: "completed",
          numberOfEmployees: "completed",
          businessDescription: "completed",
          licenseExpiry: "completed",
          renewalStatus: "editable",
          complianceStatus: "completed",
          lastUpdated: "completed",
          primaryIsicCode: "completed",
          primaryIsicDescription: "completed",
          secondaryIsicCode: "editable",
          businessCategory: "completed",
          marketSegment: "completed",
          vatRegistrationNumber: "completed",
          commercialLicenseNumber: "completed",
          dunsNumber: "completed",
          leiCode: "completed",
          chamberOfCommerceNumber: "completed",
          fiveYearVision: "completed",
          investmentGoals: "editable",
          technologyRoadmap: "completed"
        }
      },
      contact: {
        fields: {
          contactName: "John Smith",
          position: "Chief Executive Officer",
          email: "john.smith@futuretech.com",
          phone: "+971 50 123 4567",
          nationality: "British",
          languages: "English, Arabic",
          addressLine1: "Level 42, Al Maqam Tower",
          addressLine2: "ADGM Square, Al Maryah Island",
          city: "Abu Dhabi",
          country: "United Arab Emirates",
          poBox: "P.O. Box 12345",
          geoCoordinates: "24.4991° N, 54.3816° E",
          mainPhone: "+971 2 123 4567",
          website: "www.futuretech.com",
          generalEmail: "info@futuretech.com",
          supportEmail: "support@futuretech.com",
          fax: "+971 2 123 4568",
          socialMedia: "@futuretechllc"
        },
        status: {
          contactName: "completed",
          position: "completed",
          email: "completed",
          phone: "completed",
          nationality: "completed",
          languages: "completed",
          addressLine1: "completed",
          addressLine2: "completed",
          city: "completed",
          country: "completed",
          poBox: "completed",
          geoCoordinates: "editable",
          mainPhone: "completed",
          website: "completed",
          generalEmail: "completed",
          supportEmail: "completed",
          fax: "editable",
          socialMedia: "completed"
        }
      },
      legal: {
        fields: {
          legalForm: "Limited Liability Company",
          jurisdiction: "Abu Dhabi Global Market (ADGM)",
          registrationAuthority: "ADGM Registration Authority",
          governingLaw: "ADGM Companies Regulations 2020",
          foreignBranchStatus: "Not Applicable",
          legalCapacity: "Full",
          taxRegistrationNumber: "100123456700003",
          taxStatus: "Compliant",
          lastFilingDate: "31-Mar-2023",
          taxJurisdiction: "UAE",
          vatRegistrationDate: "01-Jan-2018",
          taxYearEnd: "31-Dec"
        },
        status: {
          legalForm: "completed",
          jurisdiction: "completed",
          registrationAuthority: "completed",
          governingLaw: "completed",
          foreignBranchStatus: "editable",
          legalCapacity: "completed",
          taxRegistrationNumber: "completed",
          taxStatus: "completed",
          lastFilingDate: "completed",
          taxJurisdiction: "completed",
          vatRegistrationDate: "completed",
          taxYearEnd: "completed"
        }
      },
      // Add empty structures for all other sections to support empty states
      financial: {
        fields: {},
        status: {}
      },
      operational: {
        fields: {},
        status: {}
      },
      ownership: {
        fields: {},
        status: {}
      },
      licensing: {
        fields: {},
        status: {}
      },
      compliance: {
        fields: {},
        status: {}
      },
      industry: {
        fields: {},
        status: {}
      },
      employees: {
        fields: {},
        status: {}
      },
      facilities: {
        fields: {},
        status: {}
      },
      products: {
        fields: {},
        status: {}
      },
      certifications: {
        fields: {},
        status: {}
      }
    }
  };
}