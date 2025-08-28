import {
  BsCreditCard,
  BsCurrencyDollar,
  BsGift,
  BsRocket,
  BsTag,
  BsTags,
} from "react-icons/bs";
import {
  FaDollarSign,
  FaLockOpen,
  FaShoppingCart,
  FaUser,
  FaUserAlt,
} from "react-icons/fa";
import { IoHelp, IoLockOpenOutline } from "react-icons/io5";

export const articles = [
  {
    id: 1,
    title: "Getting Started",
    description:
      "Learn how to register your business, acess funding and connect to services.",
    link: "",
    icon: <BsRocket size={40} color="#6E6B78" />,
  },
  {
    id: 2,
    title: "First Steps",
    description:
      "Step by step guide on licenses, funding programs, mentorship and more.",
    link: "",
    icon: <BsGift size={40} color="#6E6B78" />,
  },
  {
    id: 3,
    title: "Partner Tools overview",
    description:
      "Overview of programs like SME Champion, Numou and ADIO market Access.",
    link: "",
    icon: <BsCreditCard size={40} color="#6E6B78" />,
  },
];

// export const knowledgeitems = [
//   {
//     id: "business-setup",
//     icon: <FaShoppingCart size={20} color="#0030E3" />,
//     title: "Business Setup",
//     articles: [
//       "How to register your business",
//       "Choosing a legal structure",
//       "How do I add or change my details?",
//       "Accessing trade licenses?",
//       "How to apply for a virtual office or co-working setup",
//       "Required documents by business type and size",
//     ],
//     linkText: "See all 10 articles",
//   },
//   {
//     id: "funding-incentives",
//     icon: <IoHelp size={20} color="#0030E3" />,
//     title: "Funding & Incentives",
//     articles: [
//       "Available grants and programs",
//       "How to apply for financing",
//       "Access to export incentives",
//       "Eligibility criteria for early-stage...",
//       "Repayment schedules",
//       "Understanding equity, debt, and...",
//     ],
//     linkText: "See all 14 articles",
//   },
//   {
//     id: "market-access",
//     icon: <BsCurrencyDollar size={15} color="#0030E3" />,
//     title: "Market Access & Exporting",
//     articles: [
//       "Finding and joining international trade...",
//       "Franchising your business: where to...",
//       "I'm making a test site - it's not for...",
//       "Accessing the UAE’s non-oil export...",
//       "I want to make multiple end prod...",
//       "Using the Business Landscape Map to...",
//     ],
//     linkText: "See all 8 articles",
//   },
//   {
//     id: "opportunities-marketplace",
//     icon: <BsTags size={20} color="#0030E3" />,
//     title: "Opportunities Marketplace",
//     articles: [
//       "How do I find and apply for opportuni...",
//       "Accessing training through the LXP",
//       "Participating in incubation programs...",
//       "Troubleshooting Import Problems",
//       "Community events and hackathons...",
//     ],
//     linkText: "See all 5 articles",
//   },
//   {
//     id: "account-password",
//     icon: <IoLockOpenOutline size={15} color="#0030E3" />,
//     title: "Account & Password",
//     articles: [
//       "Signing in with a social account",
//       "Locked Out of Account",
//       "I'm not receiving the verification email",
//       "Forgotten Username Or Password",
//       "New password not accepted",
//       "What is Sign In Verification?",
//     ],
//     linkText: "See all 16 articles",
//   },
//   {
//     id: "account-settings",
//     icon: <FaUser size={15} color="#0030E3" />,
//     title: "Account Settings",
//     articles: [
//       "How do I change my password?",
//       "How do I change my username?",
//       "How do I close my account?",
//       "How do I change my email address?",
//       "How can I regain access to my a...",
//       "Are RSS feeds available on Market?",
//       "Are RSS feeds available on Market?",
//     ],
//     linkText: "See all 12 articles",
//   },
// ];

export const knowledgeitems = [
  {
    id: "business-setup",
    icon: <FaShoppingCart size={20} color="#0030E3" />,
    title: "Business Setup",
    articles: [
      {
        id: 1,
        title: "How to register your business",
        description:
          "This guide walks you through the official process of registering your business in the UAE. Learn the key steps, required documents, and government portals involved. Understand common challenges and how to overcome them efficiently. Ideal for both local and international entrepreneurs.",
      },
      {
        id: 2,
        title: "Choosing a legal structure",
        description:
          "Your legal structure affects liability, taxes, and operations. Explore sole proprietorships, LLCs, partnerships, and more. Learn the pros and cons of each and how to choose based on your business model. Includes tips from local experts and case examples.",
      },
      {
        id: 3,
        title: "How do I add or change my details?",
        description:
          "Need to update your trade name, contact, or address? This article shows you how. Walk through using the official business portal to make changes quickly. Includes guidance on required documents and approval timelines. Keep your registration accurate and compliant.",
      },
      {
        id: 4,
        title: "Accessing trade licenses?",
        description:
          "Explore how to apply, renew, or verify your trade license through official channels. Find out which license suits your industry best. Learn how to avoid common delays or rejections. Includes direct links to licensing authorities and useful contact information.",
      },
      {
        id: 5,
        title: "How to apply for a virtual office or co-working setup",
        description:
          "Discover flexible workspace options ideal for startups and remote businesses. Learn about government-supported co-working solutions and how to apply. Includes pricing ranges, application steps, and eligibility criteria. Save on overhead without compromising legitimacy.",
      },
      {
        id: 6,
        title: "Required documents by business type and size",
        description:
          "Not sure what paperwork you need? This checklist helps you based on your industry and business scale. Includes guidance for SMEs, freelancers, and larger corporations. Avoid missing documents during application or renewal. Updated with the latest regulatory requirements.",
      },
    ],
    linkText: "See all 10 articles",
  },
  {
    id: "funding-incentives",
    icon: <IoHelp size={20} color="#0030E3" />,
    title: "Funding & Incentives",
    articles: [
      {
        id: 1,
        title: "Available grants and programs",
        description:
          "Explore funding opportunities designed for startups and small businesses. Includes grants, zero-interest loans, and innovation vouchers. Learn how to match your business goals to available programs. Stay updated on new incentives and seasonal schemes.",
      },
      {
        id: 2,
        title: "How to apply for financing",
        description:
          "Understand the full process of applying for government or private funding. Get insights into crafting a solid business plan and financial forecast. Discover common mistakes that lead to rejection. Includes downloadable templates and checklists.",
      },
      {
        id: 3,
        title: "Access to export incentives",
        description:
          "Are you exporting products or services abroad? Learn how to qualify for rebates and duty exemptions. Includes a breakdown of eligible sectors and how to apply. Get guidance on leveraging export credit insurance. Maximize profitability through government support.",
      },
      {
        id: 4,
        title: "Eligibility criteria for early-stage...",
        description:
          "Find out if your startup qualifies for early-stage funding or seed rounds. Learn about the requirements regarding age, industry focus, and innovation. Get tips on how to present your idea persuasively. Save time by preparing ahead with proper documentation.",
      },
      {
        id: 5,
        title: "Repayment schedules",
        description:
          "Understand when and how to repay your funding, whether it’s a loan or equity-based support. Learn about grace periods, interest-free windows, and structured payment plans. Includes a sample repayment calendar. Avoid penalties and stay financially healthy.",
      },
      {
        id: 6,
        title: "Understanding equity, debt, and...",
        description:
          "Explore the differences between equity financing, debt loans, and hybrid models. Learn which model fits your business stage and growth goals. Compare pros, cons, and investor expectations. Make funding decisions with clarity and confidence.",
      },
    ],
    linkText: "See all 14 articles",
  },
  {
    id: "market-access",
    icon: <BsCurrencyDollar size={15} color="#0030E3" />,
    title: "Market Access & Exporting",
    articles: [
      {
        id: 1,
        title: "Finding and joining international trade...",
        description:
          "Discover how to connect with global trade bodies and networking groups. Learn the benefits of joining chambers and export associations. Includes links to recommended organizations and platforms. Expand your market reach beyond borders.",
      },
      {
        id: 2,
        title: "Franchising your business: where to...",
        description:
          "Considering franchising? Learn where to start and how to package your business model. Understand legal, operational, and brand considerations. Includes tips on protecting your IP and building consistency. Take your brand to new regions with confidence.",
      },
      {
        id: 3,
        title: "I'm making a test site - it's not for...",
        description:
          "Clarify the policies around test sites and prototype platforms. Learn what’s allowed and what might need approval. Ideal for developers, startups, and innovators. Avoid accidental violations while testing your ideas safely.",
      },
      {
        id: 4,
        title: "Accessing the UAE’s non-oil export...",
        description:
          "Explore lucrative export opportunities in agriculture, tech, and services. Learn how to navigate registration, logistics, and documentation. Get inspired by case studies of successful exporters. Tap into global demand outside oil sectors.",
      },
      {
        id: 5,
        title: "I want to make multiple end prod...",
        description:
          "Learn how to stay compliant when offering variations of a product. Understand batch approvals, certifications, and material usage. Includes examples from food, fashion, and tech industries. Ensure each version meets regulatory standards.",
      },
      {
        id: 6,
        title: "Using the Business Landscape Map to...",
        description:
          "Learn how to use the BLM to evaluate competition and identify demand zones. Visualize market gaps, customer clusters, and growth opportunities. This interactive tool helps you strategize your business plan. Start mapping your market position today.",
      },
    ],
    linkText: "See all 8 articles",
  },
  {
    id: "opportunities-marketplace",
    icon: <BsTags size={20} color="#0030E3" />,
    title: "Opportunities Marketplace",
    articles: [
      {
        id: 1,
        title: "How do I find and apply for opportuni...",
        description:
          "Learn to navigate platforms listing government grants, tenders, and private calls for proposals. Includes filters for sector, funding size, and deadlines. Find hidden gems relevant to your industry. Submit compelling applications with confidence.",
      },
      {
        id: 2,
        title: "Accessing training through the LXP",
        description:
          "Explore the Learning Experience Platform and its course catalog. Improve your skills in marketing, finance, compliance, and more. Track progress, earn certifications, and boost your eligibility for funding. Perfect for founders and team members.",
      },
      {
        id: 3,
        title: "Participating in incubation programs...",
        description:
          "Discover local incubators and what they offer: mentorship, funding, and workspace. Learn how to apply and what makes a strong pitch. Get insights from startups that graduated successfully. Join a program that accelerates your growth.",
      },
      {
        id: 4,
        title: "Troubleshooting Import Problems",
        description:
          "Facing customs delays or documentation issues? This guide covers the most common import challenges. Learn to resolve HS code mismatches and fee disputes. Save time and avoid shipment penalties with smart solutions.",
      },
      {
        id: 5,
        title: "Community events and hackathons...",
        description:
          "Find out how to participate in innovation challenges and networking events. Learn the benefits of community exposure, mentorship, and even seed capital. Includes a calendar of upcoming events. Boost your brand and build strong connections.",
      },
    ],
    linkText: "See all 5 articles",
  },
  {
    id: "account-password",
    icon: <IoLockOpenOutline size={15} color="#0030E3" />,
    title: "Account & Password",
    articles: [
      {
        id: 1,
        title: "Signing in with a social account",
        description:
          "Want to log in faster? Link your Google, Facebook, or LinkedIn account for single sign-on. We explain the setup process and privacy settings. Learn how to unlink at any time if needed. Easy access without compromising security.",
      },
      {
        id: 2,
        title: "Locked Out of Account",
        description:
          "Can’t access your profile? Follow this troubleshooting guide to restore your login. We cover password resets, email access, and security questions. Learn how to avoid lockouts in the future. Support contacts included for urgent help.",
      },
      {
        id: 3,
        title: "I'm not receiving the verification email",
        description:
          "If your inbox is empty, this guide helps you track down the missing verification email. Check spam folders, whitelist domains, and verify your email address. Includes detailed steps for popular providers like Gmail and Outlook.",
      },
      {
        id: 4,
        title: "Forgotten Username Or Password",
        description:
          "Reset your login credentials in just a few steps. This guide walks you through recovery using your email or phone number. Learn what to do if you no longer have access. Get back in securely and quickly.",
      },
      {
        id: 5,
        title: "New password not accepted",
        description:
          "Sometimes password rules can be tricky. Learn why your new password might be rejected and how to fix it. We explain length, complexity, and character requirements. Get tips on creating strong, memorable passwords.",
      },
      {
        id: 6,
        title: "What is Sign In Verification?",
        description:
          "Sign In Verification adds a second layer of protection to your account. Understand how it works and why it’s important. Learn how to activate or deactivate it easily. Stay safe from unauthorized access.",
      },
    ],
    linkText: "See all 16 articles",
  },
  {
    id: "account-settings",
    icon: <FaUser size={15} color="#0030E3" />,
    title: "Account Settings",
    articles: [
      {
        id: 1,
        title: "How do I change my password?",
        description:
          "Changing your password regularly helps keep your account secure. This guide walks you through the update steps. Learn what makes a secure password and where to change it. Includes mobile and desktop versions.",
      },
      {
        id: 2,
        title: "How do I change my username?",
        description:
          "You can update your display or login name in just a few clicks. Learn how username changes affect your profile and visibility. Includes naming guidelines and when changes are limited. Make your profile more personal and professional.",
      },
      {
        id: 3,
        title: "How do I close my account?",
        description:
          "Need to leave the platform? This guide helps you close your account permanently. Learn what data will be deleted and how long the process takes. Includes steps to download your information before you go.",
      },
      {
        id: 4,
        title: "How do I change my email address?",
        description:
          "You can easily update your email for notifications and login. Learn how to verify the new address and avoid disruption. This guide explains what happens to your old email. Keep your contact info current and secure.",
      },
      {
        id: 5,
        title: "How can I regain access to my a...",
        description:
          "If your account has been locked, suspended, or compromised, this article can help. Follow the recovery steps to verify your identity. Includes how to contact support if needed. Get your access back smoothly.",
      },
      {
        id: 6,
        title: "Are RSS feeds available on Market?",
        description:
          "Stay updated with RSS feeds if you're tracking topics or articles. Learn how to subscribe using an RSS reader. This article includes feed links and usage tips. Great for content creators and researchers.",
      },
    ],
    linkText: "See all 12 articles",
  },
];
