// Types for Community Explore components
export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
}

export interface NavLink {
  id: string;
  label: string;
  icon: string;
}

export interface CommunityCard {
  id: string;
  title: string;
  members: string;
  description: string;
  avatar: string;
}

export interface MainNavLink {
  id: string;
  label: string;
  icon: string;
}

export interface SidebarItemProps {
  item: SidebarItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export interface CommunityCardProps {
  community: CommunityCard;
  onJoin?: (id: string) => void;
}

export interface NavButtonProps {
  link: NavLink;
  isActive: boolean;
  onClick: () => void;
}

export interface MainNavButtonProps {
  link: MainNavLink;
  isActive: boolean;
  onClick: () => void;
}

export interface ComingSoonProps {
  title: string;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}