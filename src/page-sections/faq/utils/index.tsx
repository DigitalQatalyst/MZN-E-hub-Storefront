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

export const knowledgeitems = [
  {
    id: "business-setup",
    icon: <FaShoppingCart size={20} color="#0030E3" />,
    title: "Business Setup",
    articles: [
      "How to register your business",
      "Choosing a legal structure",
      "How do I add or change my details?",
      "Accessing trade licenses?",
      "How to apply for a virtual office or co-working setup",
      "Required documents by business type and size",
    ],
    linkText: "See all 10 articles",
  },
  {
    id: "funding-incentives",
    icon: <IoHelp size={20} color="#0030E3" />,
    title: "Funding & Incentives",
    articles: [
      "Available grants and programs",
      "How to apply for financing",
      "Access to export incentives",
      "Eligibility criteria for early-stage...",
      "Repayment schedules",
      "Understanding equity, debt, and...",
    ],
    linkText: "See all 14 articles",
  },
  {
    id: "market-access",
    icon: <BsCurrencyDollar size={15} color="#0030E3" />,
    title: "Market Access & Exporting",
    articles: [
      "Finding and joining international trade...",
      "Franchising your business: where to...",
      "I'm making a test site - it's not for...",
      "Accessing the UAE’s non-oil export...",
      "I want to make multiple end prod...",
      "Using the Business Landscape Map to...",
    ],
    linkText: "See all 8 articles",
  },
  {
    id: "opportunities-marketplace",
    icon: <BsTags size={20} color="#0030E3" />,
    title: "Opportunities Marketplace",
    articles: [
      "How do I find and apply for opportuni...",
      "Accessing training through the LXP",
      "Participating in incubation programs...",
      "Troubleshooting Import Problems",
      "Community events and hackathons...",
    ],
    linkText: "See all 5 articles",
  },
  {
    id: "account-password",
    icon: <IoLockOpenOutline size={15} color="#0030E3" />,
    title: "Account & Password",
    articles: [
      "Signing in with a social account",
      "Locked Out of Account",
      "I'm not receiving the verification email",
      "Forgotten Username Or Password",
      "New password not accepted",
      "What is Sign In Verification?",
    ],
    linkText: "See all 16 articles",
  },
  {
    id: "account-settings",
    icon: <FaUser size={15} color="#0030E3" />,
    title: "Account Settings",
    articles: [
      "How do I change my password?",
      "How do I change my username?",
      "How do I close my account?",
      "How do I change my email address?",
      "How can I regain access to my a...",
      "Are RSS feeds available on Market?",
      "Are RSS feeds available on Market?",
    ],
    linkText: "See all 12 articles",
  },
];
