import { CommunityCard, MainNavLink, NavLink, SidebarItem } from './types';

// Data for sidebar items
export const sidebarItems: SidebarItem[] = [
  {
    id: "home",
    label: "Home",
    icon: "home",
  },
  {
    id: "explore",
    label: "Explore",
    icon: "explore",
  },
  {
    id: "my-communities",
    label: "My Communities",
    icon: "communities",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "notifications",
  },
  {
    id: "messages",
    label: "Messages",
    icon: "messages",
  },
];

// Data for navigation links
export const navLinks: NavLink[] = [
  { id: "trending", label: "Trending", icon: "/images/trending-up.svg" },
  { id: "recently-added", label: "Recently Added", icon: "/images/clock.svg" },
  { id: "popular", label: "Popular", icon: "/images/star2.svg" },
];

// Data for main navigation
export const mainNavLinks: MainNavLink[] = [
  { id: "promo-zone", label: "Promo Zone", icon: "/images/brand_awareness.svg" },
  { id: "ask-community", label: "Ask the Community", icon: "/images/indeterminate_question_box.svg" },
  { id: "women-in-business", label: "Women in Business", icon: "/images/face_4.svg" },
  { id: "next-gen-hustle", label: "Next Gen Hustle", icon: "/images/rocket_launch.svg" },
  { id: "car-connect", label: "Car Connect", icon: "/images/airport_shuttle.svg" },
  { id: "creative-media", label: "Creative Media Exchange", icon: "/images/Palette.svg" },
  { id: "startup-diaries", label: "Startup Diaries", icon: "/images/partner_exchange.svg" },
];

// Sample community data
export const featuredCommunities: CommunityCard[] = [
  {
    id: "1",
    title: "Women in Business AbuDhabi",
    members: "10k+ Members",
    description: "A community focused on empowering women entrepreneurs, offering resources, networking, and support for business growth and leadership in...",
    avatar: "/images/avatar.png",
  },
  {
    id: "2",
    title: "Women in Technology & Innovation",
    members: "10k+ Members",
    description: "A network for women leading the charge in technology and innovation, driving digital transformation and fostering tech entrepreneurship.",
    avatar: "/images/avatar.png",
  },
  {
    id: "3",
    title: "Women in Finance & Investment",
    members: "10k+ Members",
    description: "A community dedicated to women in finance, providing resources, mentorship, and networking opportunities for investment professionals and entrepreneurs.",
    avatar: "/images/avatar.png",
  },
  {
    id: "4",
    title: "Women in Retail & E-Commerce",
    members: "10k+ Members",
    description: "A community for female entrepreneurs in retail and e-commerce, sharing strategies for business growth, digital marketing, and consumer engagement in the UAE.",
    avatar: "/images/avatar.png",
  },
];

export const innovatorsCommunities: CommunityCard[] = [
  {
    id: "5",
    title: "Female Founders in Fintech",
    members: "10k+ Members",
    description: "A hub for women revolutionizing the financial services industry through fintech solutions, offering insights into investment strategies and tech...",
    avatar: "/images/avatar.png",
  },
  {
    id: "6",
    title: "AI & Machine Learning Innovators",
    members: "10k+ Members",
    description: "A community dedicated to women developing cutting-edge AI and machine learning technologies, creating solutions across industries like healthcare...",
    avatar: "/images/avatar.png",
  },
  {
    id: "7",
    title: "EdTech Founders Network",
    members: "10k+ Members",
    description: "For women in the education technology space, sharing ideas, solutions, and strategies for improving learning through innovation and technology.",
    avatar: "/images/avatar.png",
  },
  {
    id: "8",
    title: "Social Impact Entrepreneurs",
    members: "10k+ Members",
    description: "A community for women who are combining business with social impact, striving to address pressing societal challenges while building profitable...",
    avatar: "/images/avatar.png",
  },
];