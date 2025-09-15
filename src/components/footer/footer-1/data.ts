// Link interface for type safety
interface LinkItem {
  name: string;
  url: string;
  badge?: string; // Optional badge text like "New" or "Coming soon"
  showArrow?: boolean; // For social media links
}

// Footer column interface
interface FooterColumn {
  title: string;
  links: LinkItem[];
}

// Legacy data (kept for backward compatibility)
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
  { iconName: "google", url: "/" },
  { iconName: "twitter", url: "/" },
  { iconName: "youtube", url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg" },
  { iconName: "instagram", url: "/" }
];

/**
 * Updated footer data structure matching the new design
 * Includes 5 columns: Get to Know Us, For Enterprises, For Partners, Find Us, Legal
 */
export const footerData: Record<string, FooterColumn> = {
  getToKnowUs: {
    title: "Get to Know Us",
    links: [
      { name: "About Enterprise Journey", url: "#" },
      { name: "Help Centre", url: "#" },
      { name: "Discover AbuDhabi", url: "#" },
      { name: "Media Centre", url: "#" }
    ]
  },
  forEnterprises: {
    title: "For Enterprises",
    links: [
      { name: "Financial Services", url: "#" },
      { name: "Non-financial Services", url: "#" },
      { name: "Community", url: "#" },
      { name: "Events", url: "#", badge: "Coming soon" }
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
  findUs: {
    title: "Find Us",
    links: [
      { name: "LinkedIn", url: "https://linkedin.com", showArrow: true },
      { name: "Facebook", url: "https://facebook.com", showArrow: true },
      { name: "YouTube", url: "https://youtube.com", showArrow: true }
    ]
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Privacy Policy", url: "#" },
      { name: "Terms of Service", url: "#" }
    ]
  }
};

// Social media links (kept for backward compatibility, but now integrated into footerData)
export const socialMediaLinks = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: "linkedin"
  },
  {
    name: "Facebook", 
    url: "https://facebook.com",
    icon: "facebook"
  },
  {
    name: "YouTube",
    url: "https://youtube.com",
    icon: "youtube"
  }
];