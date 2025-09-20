// Mock data for the Course Marketplace
export interface ProviderType {
  name: string;
  logoUrl: string;
  description: string;
}
export interface CourseType {
  id: string;
  title: string;
  description: string;
  category: string;
  deliveryMode: string;
  duration: string;
  durationType: string;
  businessStage: string;
  provider: ProviderType;
  learningOutcomes: string[];
  startDate: string;
  price?: string;
  location?: string;
}
// Categories
export const categories = ['Entrepreneurship', 'Compliance', 'Finance', 'Technology', 'Marketing', 'Operations', 'HR', 'Leadership'];
// Delivery Modes
export const deliveryModes = ['Online', 'In-person', 'Hybrid'];
// Durations
export const durations = [{
  value: 'Short',
  label: 'Short (<1 week)'
}, {
  value: 'Medium',
  label: 'Medium (1-4 weeks)'
}, {
  value: 'Long',
  label: 'Long (1+ month)'
}];
// Business Stages
export const businessStages = ['Conception', 'Growth', 'Maturity', 'Restructuring'];
// Providers
export const providers = [{
  name: 'Khalifa Fund Academy',
  logoUrl: "/image.png",
  description: 'Khalifa Fund for Enterprise Development is an independent, not-for-profit small and medium enterprises (SMEs) socio-economic development organization established in 2007.'
}, {
  name: 'ADGM Academy',
  logoUrl: 'https://images.squarespace-cdn.com/content/v1/5cc0e1e9a0cd27177a2dd7ec/1556171141973-2BKLJ7QWZM0RN9Y1DKBY/ADGM+Academy.png',
  description: 'ADGM Academy is the knowledge arm of Abu Dhabi Global Market (ADGM), the International Financial Centre of Abu Dhabi.'
}, {
  name: 'Hub71',
  logoUrl: 'https://hub71.com/wp-content/uploads/2023/05/hub71-logo-1.png',
  description: 'Hub71 is a global tech ecosystem that enables startups to scale globally from Abu Dhabi.'
}, {
  name: 'NYU Abu Dhabi',
  logoUrl: 'https://nyuad.nyu.edu/content/dam/nyuad/departments/public-affairs/logos/NYUAD-logo-color.png',
  description: 'NYU Abu Dhabi is a degree-granting research university with a fully integrated liberal arts and science college.'
}, {
  name: 'Google for Startups',
  logoUrl: 'https://storage.googleapis.com/cms-storage-bucket/6e19fee6b47b36ca613f.png',
  description: 'Google for Startups connects startups with the right people, products, and best practices to help them grow.'
}];
// Mock Courses
export const mockCourses: CourseType[] = [{
  id: '1',
  title: 'Business Plan Development',
  description: 'Learn how to create a comprehensive business plan that will help you secure funding and guide your business growth. This course covers market research, financial projections, and strategic planning.',
  category: 'Entrepreneurship',
  deliveryMode: 'Online',
  duration: '2 weeks',
  durationType: 'Medium',
  businessStage: 'Conception',
  provider: providers[0],
  learningOutcomes: ['Develop a comprehensive business plan', 'Create realistic financial projections', 'Conduct effective market research', 'Craft a compelling executive summary', 'Present your business plan to potential investors'],
  startDate: 'January 15, 2024',
  price: 'AED 1,500'
}, {
  id: '2',
  title: 'Financial Management for SMEs',
  description: 'Master the essentials of financial management for small and medium enterprises. This course covers budgeting, cash flow management, financial analysis, and strategic financial planning.',
  category: 'Finance',
  deliveryMode: 'Hybrid',
  duration: '4 weeks',
  durationType: 'Medium',
  businessStage: 'Growth',
  provider: providers[1],
  learningOutcomes: ['Create and manage effective budgets', 'Develop cash flow forecasts and management strategies', 'Analyze financial statements to make informed decisions', 'Implement cost-saving measures', 'Understand financial risks and mitigation strategies'],
  startDate: 'February 1, 2024',
  price: 'AED 2,200'
}, {
  id: '3',
  title: 'Digital Marketing Fundamentals',
  description: 'Develop a comprehensive digital marketing strategy for your business. Learn about SEO, social media marketing, content creation, email marketing, and analytics to drive growth and engagement.',
  category: 'Marketing',
  deliveryMode: 'Online',
  duration: '3 weeks',
  durationType: 'Medium',
  businessStage: 'Growth',
  provider: providers[2],
  learningOutcomes: ['Create a comprehensive digital marketing strategy', 'Implement effective SEO techniques', 'Develop engaging social media campaigns', 'Design effective email marketing sequences', 'Analyze marketing performance using analytics tools'],
  startDate: 'January 22, 2024',
  price: 'AED 1,800'
}, {
  id: '4',
  title: 'Leadership Excellence',
  description: 'Develop essential leadership skills to effectively manage teams and drive organizational success. This course focuses on communication, motivation, delegation, and strategic decision-making.',
  category: 'Leadership',
  deliveryMode: 'In-person',
  duration: '2 days',
  durationType: 'Short',
  businessStage: 'Maturity',
  provider: providers[3],
  learningOutcomes: ['Develop effective leadership communication skills', 'Learn techniques for motivating and engaging team members', 'Master the art of delegation and empowerment', 'Implement strategic decision-making frameworks', 'Create a positive and productive work culture'],
  startDate: 'March 5, 2024',
  price: 'AED 3,500',
  location: 'NYU Abu Dhabi Campus'
}, {
  id: '5',
  title: 'Compliance and Legal Essentials',
  description: 'Navigate the legal and regulatory landscape for businesses in the UAE. This comprehensive course covers business laws, licensing requirements, employment regulations, and compliance best practices.',
  category: 'Compliance',
  deliveryMode: 'Hybrid',
  duration: '5 weeks',
  durationType: 'Long',
  businessStage: 'Conception',
  provider: providers[1],
  learningOutcomes: ['Understand UAE business laws and regulations', 'Navigate licensing and permit requirements', 'Implement compliance best practices', 'Manage employment contracts and labor laws', 'Mitigate legal risks in business operations'],
  startDate: 'February 15, 2024',
  price: 'AED 2,800'
}, {
  id: '6',
  title: 'E-commerce Implementation',
  description: 'Build and optimize an e-commerce platform for your business. Learn about platform selection, payment integration, inventory management, customer experience, and digital marketing strategies specific to e-commerce.',
  category: 'Technology',
  deliveryMode: 'Online',
  duration: '6 weeks',
  durationType: 'Long',
  businessStage: 'Growth',
  provider: providers[4],
  learningOutcomes: ['Select the right e-commerce platform for your business', 'Implement secure payment processing systems', 'Develop effective inventory management strategies', 'Optimize the customer journey and experience', 'Create e-commerce specific marketing campaigns'],
  startDate: 'March 1, 2024',
  price: 'Free'
}, {
  id: '7',
  title: 'Supply Chain Optimization',
  description: 'Streamline your business operations with effective supply chain management strategies. This course covers procurement, inventory management, logistics, supplier relationships, and technology integration.',
  category: 'Operations',
  deliveryMode: 'In-person',
  duration: '3 days',
  durationType: 'Short',
  businessStage: 'Maturity',
  provider: providers[0],
  learningOutcomes: ['Optimize procurement processes and costs', 'Implement effective inventory management systems', 'Streamline logistics and distribution channels', 'Develop strong supplier relationships', 'Integrate technology solutions for supply chain visibility'],
  startDate: 'April 10, 2024',
  price: 'AED 2,500',
  location: 'Khalifa Fund Headquarters, Abu Dhabi'
}, {
  id: '8',
  title: 'HR Management for Growing Businesses',
  description: 'Develop effective human resources strategies as your business grows. This course covers recruitment, onboarding, performance management, employee development, and creating a positive workplace culture.',
  category: 'HR',
  deliveryMode: 'Hybrid',
  duration: '4 weeks',
  durationType: 'Medium',
  businessStage: 'Growth',
  provider: providers[3],
  learningOutcomes: ['Create effective recruitment and selection processes', 'Develop comprehensive onboarding programs', 'Implement performance management systems', 'Design employee development and retention strategies', 'Build a positive and inclusive workplace culture'],
  startDate: 'February 20, 2024',
  price: 'AED 2,000'
}, {
  id: '9',
  title: 'Business Restructuring Strategies',
  description: 'Navigate the challenges of business restructuring with strategic approaches to organizational change. This course covers financial restructuring, operational transformation, change management, and communication strategies.',
  category: 'Entrepreneurship',
  deliveryMode: 'Online',
  duration: '8 weeks',
  durationType: 'Long',
  businessStage: 'Restructuring',
  provider: providers[2],
  learningOutcomes: ['Develop comprehensive restructuring plans', 'Implement financial restructuring strategies', 'Execute operational transformation initiatives', 'Manage change effectively throughout the organization', 'Create clear communication plans for stakeholders'],
  startDate: 'March 15, 2024',
  price: 'AED 3,200'
}, {
  id: '10',
  title: 'Data Analytics for Business Decisions',
  description: 'Harness the power of data to make informed business decisions. This course covers data collection, analysis techniques, visualization tools, and implementing data-driven strategies across your organization.',
  category: 'Technology',
  deliveryMode: 'Online',
  duration: '5 weeks',
  durationType: 'Long',
  businessStage: 'Growth',
  provider: providers[4],
  learningOutcomes: ['Implement effective data collection methods', 'Apply appropriate data analysis techniques', 'Create compelling data visualizations', 'Develop data-driven decision-making processes', 'Integrate analytics into business strategy'],
  startDate: 'April 1, 2024',
  price: 'Free'
}, {
  id: '11',
  title: 'Strategic Marketing Planning',
  description: 'Develop a comprehensive marketing strategy aligned with your business goals. This course covers market analysis, brand positioning, marketing mix development, campaign planning, and performance measurement.',
  category: 'Marketing',
  deliveryMode: 'Hybrid',
  duration: '3 weeks',
  durationType: 'Medium',
  businessStage: 'Maturity',
  provider: providers[0],
  learningOutcomes: ['Conduct thorough market and competitor analysis', 'Develop effective brand positioning strategies', 'Create comprehensive marketing mix plans', 'Design and implement marketing campaigns', 'Measure and optimize marketing performance'],
  startDate: 'February 5, 2024',
  price: 'AED 2,100'
}, {
  id: '12',
  title: 'Financial Planning for Business Expansion',
  description: 'Prepare your business for growth with strategic financial planning. This course covers funding options, investment analysis, risk assessment, financial forecasting, and capital allocation strategies.',
  category: 'Finance',
  deliveryMode: 'In-person',
  duration: '2 weeks',
  durationType: 'Medium',
  businessStage: 'Growth',
  provider: providers[1],
  learningOutcomes: ['Identify and evaluate appropriate funding options', 'Conduct investment analysis for expansion opportunities', 'Assess and mitigate financial risks', 'Develop accurate financial forecasts', 'Create effective capital allocation strategies'],
  startDate: 'March 10, 2024',
  price: 'AED 2,800',
  location: 'ADGM Academy, Abu Dhabi'
}];