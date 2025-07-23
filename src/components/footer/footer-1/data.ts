// Link interface for type safety
interface LinkItem {
  name: string;
  url: string;
  badge?: string; // Optional badge text like "New" or "Coming soon"
}

// Footer column interface
interface FooterColumn {
  title: string;
  links: LinkItem[];
}

// Existing data (kept for backward compatibility)
export const aboutLinks = [
  "Business in AbuDhabi",
  "Help Center",
  "FAQs"
];

export const quickLinks = [
  "Explore Services",
  "Resources",
  "FAQs"
];

export const customerCareLinks = [
  "About MZN",
  "Updates",
  "Contact Us"
];

export const getToKnowUs = [
  "About Enterprise Journey",
  "Updates",
  "Contact Us"
];

export const partners = [
  "Become a Partner",
  "Government Entities",
  "Corporates",
  "International"
];

export const legalLinks = [
  "Privacy Policy",
  "Cookie Policy",
  "Terms of Service"
];

export const iconList = [
  // { iconName: "facebook", url: "https://www.facebook.com/UILibOfficial" },
  { iconName: "google", url: "/" },
  { iconName: "twitter", url: "/" },
  { iconName: "youtube", url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg" },
  { iconName: "instagram", url: "/" }
];

// New footer data structure for the updated 5-column layout
export const footerData: Record<string, FooterColumn> = {
  helpSupport: {
    title: "Help & Support",
    links: [
      { name: "Help Centre", url: "#" },
      { name: "FAQs", url: "#" },
      { name: "Report an Issue", url: "#" }
    ]
  },
  growWithUs: {
    title: "Grow with Us",
    links: [
      { name: "Discover AbuDhabi", url: "#" },
      { name: "Funding & Incentives", url: "#" },
      { name: "Tools", url: "#" },
      { name: "Success Stories", url: "#" },
      { name: "Learning & Resource Hub", url: "#" }
    ]
  },
  forEnterprises: {
    title: "For Enterprises",
    links: [
      { name: "Explore Services", url: "#" },
      { name: "Community", url: "#" },
      { name: "Events", url: "#", badge: "Coming soon" },
      { name: "Manage Applications", url: "#" }
    ]
  },
  forPartners: {
    title: "For Partners",
    links: [
      { name: "Become a Partner", url: "#" },
      { name: "Government Entities", url: "#" },
      { name: "Corporates", url: "#" },
      { name: "International", url: "#" }
    ]
  },
  getToKnowUs: {
    title: "Get to Know Us",
    links: [
      { name: "About Enterprise Journey", url: "#" },
      { name: "Media Centre", url: "#" },
      { name: "Contact Us", url: "#" }
    ]
  }
};

// Social media links with proper URLs
export const socialMediaLinks = [
  {
    name: "LinkedIn",
    url: "#",
    icon: "linkedin"
  },
  {
    name: "Twitter",
    url: "#",
    icon: "twitter"
  },
  {
    name: "YouTube",
    url: "#",
    icon: "youtube"
  },
  {
    name: "Instagram",
    url: "#",
    icon: "instagram"
  }
];