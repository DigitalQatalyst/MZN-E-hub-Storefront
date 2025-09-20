// Mock data for Financial Services and Non-Financial Services
import { providers } from './mockData';
// Mock financial services data
export const mockFinancialServices = [{
  id: 'f1',
  title: 'Business Startup Loan',
  description: 'Get funding to start your business with competitive interest rates and flexible repayment terms.',
  category: 'Loans',
  serviceType: 'Financing',
  provider: {
    name: 'Khalifa Fund',
    logoUrl: "/image.png",
    description: 'Khalifa Fund for Enterprise Development supports UAE nationals in developing their entrepreneurial skills and establishing their own SMEs.'
  },
  amount: 'Up to AED 500,000',
  duration: '5 years',
  eligibility: 'UAE Nationals, 21+ years',
  interestRate: '0%',
  details: ['Zero interest rate for qualified applicants', 'Flexible repayment terms up to 5 years', 'No collateral required for loans under AED 250,000', 'Dedicated business advisor throughout the loan term', 'Access to business development workshops and training'],
  highlights: ['Zero interest rate for qualified applicants', 'Flexible repayment terms up to 5 years', 'No collateral required for loans under AED 250,000', 'Dedicated business advisor throughout the loan term', 'Access to business development workshops and training'],
  requiredDocuments: ['Valid Emirates ID', 'Business plan', 'Feasibility study', 'Quotations for equipment/setup costs', 'Proof of premises (if applicable)'],
  applicationProcess: ['Submit online application', 'Initial screening (1-2 weeks)', 'Interview with loan officer', 'Business plan review', 'Final approval (3-4 weeks)', 'Disbursement of funds'],
  terms: ['Repayment begins 6 months after disbursement', 'Monthly repayment schedule', 'No early repayment penalties', 'Must maintain business operation throughout loan term', 'Quarterly progress reports required']
}, {
  id: 'f2',
  title: 'SME Growth Financing',
  description: 'Financing solution designed to help small and medium enterprises expand their operations and reach new markets.',
  category: 'Financing',
  serviceType: 'Credit',
  provider: {
    name: 'ADGM Academy',
    logoUrl: 'https://images.squarespace-cdn.com/content/v1/5cc0e1e9a0cd27177a2dd7ec/1556171141973-2BKLJ7QWZM0RN9Y1DKBY/ADGM+Academy.png',
    description: 'ADGM Academy is the knowledge arm of Abu Dhabi Global Market.'
  },
  amount: 'AED 100,000 - 2,000,000',
  duration: '3-7 years',
  eligibility: 'Established businesses, 2+ years in operation',
  interestRate: '3.5%',
  details: ['Competitive interest rates starting at 3.5%', 'Flexible use of funds for expansion, equipment, or working capital', 'Streamlined application process with fast approval', 'Option for interest-only payments during initial period', 'No early repayment penalties'],
  highlights: ['Competitive interest rates starting at 3.5%', 'Flexible use of funds for expansion, equipment, or working capital', 'Streamlined application process with fast approval', 'Option for interest-only payments during initial period', 'No early repayment penalties'],
  requiredDocuments: ['Business registration documents', 'Financial statements for the past 2 years', 'Bank statements for the past 6 months', 'Business expansion plan', 'Cash flow projections', 'Collateral documentation (if applicable)'],
  applicationProcess: ['Online application submission', 'Document verification (1 week)', 'Credit assessment (1-2 weeks)', 'Approval and offer letter', 'Collateral registration (if applicable)', 'Fund disbursement'],
  terms: ['Repayment term between 3-7 years based on assessment', 'Monthly repayment schedule', 'Discounted rates for early repayment', 'Quarterly financial reporting required', 'Option to restructure in case of business challenges']
}, {
  id: 'f3',
  title: 'Export Credit Insurance',
  description: 'Protect your business against non-payment risks when selling goods and services internationally.',
  category: 'Insurance',
  serviceType: 'Risk Management',
  provider: {
    name: 'Hub71',
    logoUrl: 'https://hub71.com/wp-content/uploads/2023/05/hub71-logo-1.png',
    description: 'Hub71 is a global tech ecosystem that enables startups to scale globally from Abu Dhabi.'
  },
  coverageLimit: 'Up to AED 5,000,000',
  premium: 'Based on risk assessment',
  eligibility: 'UAE-based exporters',
  interestRate: 'N/A',
  amount: 'Up to AED 5,000,000 coverage',
  duration: '1 year (renewable)',
  details: ['Coverage for commercial and political risks', 'Customizable policies based on your export markets', 'Enhances ability to offer competitive payment terms to buyers', 'Access to market intelligence and risk assessments', 'Claims paid within 60 days of due date'],
  highlights: ['Coverage for commercial and political risks', 'Customizable policies based on your export markets', 'Enhances ability to offer competitive payment terms to buyers', 'Access to market intelligence and risk assessments', 'Claims paid within 60 days of due date'],
  requiredDocuments: ['Export contracts or purchase orders', 'Company registration documents', 'Financial statements', 'Export history documentation', 'Buyer information and credit history (if available)'],
  applicationProcess: ['Initial consultation and risk assessment', 'Application submission with required documents', 'Underwriting review (1-2 weeks)', 'Policy customization and pricing', 'Policy issuance'],
  terms: ['Annual policy with monthly premium payments', 'Coverage for both commercial and political risks', 'Claim submission within 30 days of payment default', 'Quarterly reporting of export activities', 'Premium adjustments based on risk profile changes']
}, {
  id: 'f4',
  title: 'Business Credit Card',
  description: 'Manage your business expenses with a dedicated credit card offering rewards and cashback on business purchases.',
  category: 'Credit Card',
  serviceType: 'Financing',
  provider: {
    name: 'NYU Abu Dhabi',
    logoUrl: 'https://nyuad.nyu.edu/content/dam/nyuad/departments/public-affairs/logos/NYUAD-logo-color.png',
    description: 'NYU Abu Dhabi is a degree-granting research university with a fully integrated liberal arts and science college.'
  },
  creditLimit: 'Up to AED 100,000',
  annualFee: 'AED 500',
  cashback: '2% on all purchases',
  interestRate: '18% p.a.',
  amount: 'Up to AED 100,000 credit limit',
  duration: 'Ongoing',
  eligibility: 'Businesses with 1+ year operation, min. annual turnover AED 500,000',
  details: ['2% cashback on all business purchases', 'No foreign transaction fees', 'Complimentary airport lounge access', 'Purchase protection and extended warranty', 'Detailed expense reporting and integration with accounting software'],
  highlights: ['2% cashback on all business purchases', 'No foreign transaction fees', 'Complimentary airport lounge access', 'Purchase protection and extended warranty', 'Detailed expense reporting and integration with accounting software'],
  requiredDocuments: ['Business registration documents', 'Trade license', 'Financial statements', 'Bank statements for the past 6 months', 'Personal guarantee from business owner'],
  applicationProcess: ['Online application', 'Document submission', 'Credit assessment (3-5 business days)', 'Approval and card issuance', 'Card delivery (5-7 business days)'],
  terms: ['Annual fee: AED 500 (waived if annual spend exceeds AED 100,000)', 'Interest rate: 18% p.a. on unpaid balances', '25-day interest-free period on purchases', 'Minimum payment: 5% of outstanding balance', 'Late payment fee: AED 230']
}];
// Mock non-financial services data
export const mockNonFinancialServices = [{
  id: 'nf1',
  title: 'Business Setup Consultancy',
  description: 'Comprehensive guidance on establishing your business in the UAE, including legal structure, licensing, and registration.',
  category: 'Consultancy',
  serviceType: 'Advisory',
  provider: {
    name: 'Khalifa Fund',
    logoUrl: "/image.png",
    description: 'Khalifa Fund for Enterprise Development supports UAE nationals in developing their entrepreneurial skills and establishing their own SMEs.'
  },
  duration: '2-4 weeks',
  deliveryMode: 'In-person',
  price: 'AED 5,000 - 15,000',
  details: ['Personalized business structure recommendations', 'Assistance with all licensing and registration paperwork', 'Guidance on location selection and office setup', 'Introduction to potential partners and service providers', 'Post-setup support for 3 months'],
  highlights: ['Personalized business structure recommendations', 'Assistance with all licensing and registration paperwork', 'Guidance on location selection and office setup', 'Introduction to potential partners and service providers', 'Post-setup support for 3 months'],
  requiredDocuments: ['Passport copies of all shareholders', 'Emirates ID (for UAE nationals/residents)', 'Business concept or plan', 'Initial capital proof (if available)', 'Educational certificates (for professional licenses)'],
  applicationProcess: ['Initial consultation (free)', 'Service package selection', 'Agreement signing and initial payment', 'Document collection and submission', 'Follow-up on government processes', 'License issuance and completion'],
  eligibility: 'Open to all entrepreneurs and businesses',
  deliveryDetails: ['Initial consultation conducted in-person or virtually', 'Regular progress updates via email and phone', 'In-person meetings for document signing and submission', 'Final handover meeting upon service completion', 'Three follow-up support sessions included']
}, {
  id: 'nf2',
  title: 'Digital Transformation Package',
  description: 'Modernize your business operations with digital tools and strategies to improve efficiency and customer experience.',
  category: 'Technology',
  serviceType: 'Implementation',
  provider: {
    name: 'Hub71',
    logoUrl: 'https://hub71.com/wp-content/uploads/2023/05/hub71-logo-1.png',
    description: 'Hub71 is a global tech ecosystem that enables startups to scale globally from Abu Dhabi.'
  },
  duration: '3 months',
  deliveryMode: 'Hybrid',
  price: 'AED 25,000 - 75,000',
  details: ['Comprehensive digital needs assessment', 'Custom technology implementation roadmap', 'Integration of cloud-based business solutions', 'Staff training on new digital tools', 'Ongoing technical support and optimization'],
  highlights: ['Comprehensive digital needs assessment', 'Custom technology implementation roadmap', 'Integration of cloud-based business solutions', 'Staff training on new digital tools', 'Ongoing technical support and optimization'],
  requiredDocuments: ['Current IT infrastructure documentation', 'Business process flowcharts (if available)', 'Staff organization chart', 'Current software licenses and subscriptions', 'Digital transformation objectives'],
  applicationProcess: ['Discovery meeting and needs assessment', 'Proposal and quotation', 'Contract signing and project initiation', 'Implementation phase (2-3 months)', 'Training and handover', 'Post-implementation support'],
  eligibility: 'SMEs with at least 5 employees and 1+ year in operation',
  deliveryDetails: ['Initial assessment conducted on-site', 'Weekly progress meetings (virtual or in-person)', 'Implementation team works both on-site and remotely', 'Training sessions conducted in-person', 'Remote support available 5 days a week during business hours', '3 months of post-implementation support included']
}, {
  id: 'nf3',
  title: 'Market Research Report',
  description: 'Detailed analysis of market trends, consumer behavior, and competitive landscape for your industry.',
  category: 'Research',
  serviceType: 'Information',
  provider: {
    name: 'ADGM Academy',
    logoUrl: 'https://images.squarespace-cdn.com/content/v1/5cc0e1e9a0cd27177a2dd7ec/1556171141973-2BKLJ7QWZM0RN9Y1DKBY/ADGM+Academy.png',
    description: 'ADGM Academy is the knowledge arm of Abu Dhabi Global Market.'
  },
  deliveryMode: 'Online',
  duration: '2 weeks',
  price: 'AED 8,000 - 20,000',
  turnaround: '2 weeks',
  details: ['In-depth analysis of target market size and growth potential', 'Consumer behavior and preferences insights', 'Competitive landscape and SWOT analysis', 'Pricing strategy recommendations', 'Market entry or expansion strategies'],
  highlights: ['In-depth analysis of target market size and growth potential', 'Consumer behavior and preferences insights', 'Competitive landscape and SWOT analysis', 'Pricing strategy recommendations', 'Market entry or expansion strategies'],
  requiredDocuments: ['Research brief with specific objectives', 'Current business model canvas (if available)', 'Information on current target audience', 'Competitor information (if available)', 'Specific research questions to address'],
  applicationProcess: ['Research brief submission', 'Scope clarification meeting', 'Proposal and quotation', 'Contract and payment', 'Research execution (2 weeks)', 'Report delivery and presentation'],
  eligibility: 'All businesses and entrepreneurs',
  deliveryDetails: ['Research conducted remotely', 'Weekly progress updates via email', 'Final report delivered in PDF format', 'Optional virtual presentation of findings', 'One round of revisions included', '30-day support for questions after delivery']
}, {
  id: 'nf4',
  title: 'Export Development Program',
  description: 'Comprehensive program to help businesses expand internationally, including market entry strategies and compliance guidance.',
  category: 'Export',
  serviceType: 'Program',
  provider: {
    name: 'Google for Startups',
    logoUrl: 'https://storage.googleapis.com/cms-storage-bucket/6e19fee6b47b36ca613f.png',
    description: 'Google for Startups connects startups with the right people, products, and best practices to help them grow.'
  },
  duration: '6 months',
  deliveryMode: 'Hybrid',
  price: 'AED 30,000 - 50,000',
  details: ['International market opportunity assessment', 'Export readiness evaluation and preparation', 'Regulatory compliance and documentation guidance', 'International logistics and supply chain planning', 'Introduction to potential distributors and partners'],
  highlights: ['International market opportunity assessment', 'Export readiness evaluation and preparation', 'Regulatory compliance and documentation guidance', 'International logistics and supply chain planning', 'Introduction to potential distributors and partners'],
  requiredDocuments: ['Business registration documents', 'Product/service catalog', 'Current export activities (if any)', 'Target markets of interest', 'Financial statements for the past 2 years'],
  applicationProcess: ['Application submission', 'Initial assessment and eligibility check', 'Program acceptance and onboarding', 'Customized export development plan creation', 'Program implementation (6 months)', 'Final assessment and future planning'],
  eligibility: 'Established businesses with export-ready products/services, min. 2 years in operation',
  deliveryDetails: ['Monthly in-person workshops (1 day each)', 'Bi-weekly virtual coaching sessions', 'Online learning modules and resources', 'International market visit (optional, additional cost)', 'Networking events with potential partners', 'Final export strategy presentation']
}];