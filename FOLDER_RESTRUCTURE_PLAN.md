# Community Section Restructure Plan

## 🎯 Recommended Structure

### 1. Create New Community Section
```bash
src/page-sections/community/
├── explore/
│   ├── index.tsx                 # Main explore component
│   ├── styles.css               # Explore-specific styles
│   └── components/              # Explore sub-components
│       ├── SidebarItem.tsx
│       ├── CommunityCard.tsx
│       ├── NavButton.tsx
│       ├── MainNavButton.tsx
│       └── ComingSoon.tsx
├── shared/
│   ├── types.ts                 # Community TypeScript interfaces
│   ├── constants.ts             # Community constants & data
│   ├── hooks.ts                 # Community-specific hooks
│   └── utils.ts                 # Community utility functions
└── styles/
    ├── community-base.css       # Base community styles
    └── community-variables.css  # CSS custom properties
```

### 2. Create Reusable Community Components
```bash
src/components/community/
├── CommunityCard/
│   ├── index.tsx
│   ├── CommunityCard.tsx
│   ├── styles.css
│   └── types.ts
├── CommunityNavigation/
│   ├── index.tsx
│   ├── Sidebar.tsx
│   ├── TopNav.tsx
│   ├── MainNav.tsx
│   └── styles.css
├── CommunitySearch/
│   ├── index.tsx
│   ├── SearchBar.tsx
│   └── styles.css
└── shared/
    ├── CommunityLayout.tsx
    └── CommunityProvider.tsx
```

## 📋 Migration Steps

### Step 1: Create Directory Structure
1. Create `src/page-sections/community/` directory
2. Create `src/components/community/` directory
3. Set up subdirectories as shown above

### Step 2: Move and Refactor Files
1. Move `explore.tsx` → `src/page-sections/community/explore/index.tsx`
2. Move `explore.css` → `src/page-sections/community/explore/styles.css`
3. Extract reusable components to `src/components/community/`

### Step 3: Update Imports
1. Update `src/app/(layout-1)/community-explore/page.tsx`
2. Update any other files importing the explore component
3. Update CSS import paths

### Step 4: Extract Shared Logic
1. Move TypeScript interfaces to `src/page-sections/community/shared/types.ts`
2. Move data arrays to `src/page-sections/community/shared/constants.ts`
3. Create community-specific hooks in `src/page-sections/community/shared/hooks.ts`

## 🔄 Updated Import Structure

### Before:
```typescript
import Explore from "@sections/market-1/explore";
```

### After:
```typescript
import Explore from "@sections/community/explore";
```

## 🎨 CSS Organization

### Base Styles (`community-base.css`):
```css
/* Community-wide base styles */
.community-container { /* ... */ }
.community-sidebar { /* ... */ }
.community-main-content { /* ... */ }
```

### Variables (`community-variables.css`):
```css
:root {
  --community-primary-color: #0030E3;
  --community-secondary-color: #0078d4;
  --community-sidebar-width: 280px;
  --community-gap: 2rem;
}
```

## 🧩 Component Extraction Examples

### CommunityCard Component:
```typescript
// src/components/community/CommunityCard/index.tsx
export interface CommunityCardProps {
  id: string;
  title: string;
  members: string;
  description: string;
  avatar: string;
  onJoin?: (id: string) => void;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({ ... }) => {
  // Component implementation
};
```

### CommunityNavigation Component:
```typescript
// src/components/community/CommunityNavigation/index.tsx
export interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobile: boolean;
}

export const CommunityNavigation: React.FC<NavigationProps> = ({ ... }) => {
  // Navigation implementation
};
```

## 📱 Benefits of This Structure

### 1. Modularity
- Each component has a single responsibility
- Easy to test individual components
- Reusable across different community pages

### 2. Scalability
- Easy to add new community features
- Clear place for community-specific logic
- Supports future community types

### 3. Maintainability
- Clear file organization
- Consistent naming conventions
- Separated concerns

### 4. Performance
- Code splitting opportunities
- Lazy loading of community sections
- Optimized bundle sizes

## 🚀 Future Enhancements Ready

### Community Features:
- Community forums
- Event management
- Member profiles
- Community analytics
- Notification system

### Technical Features:
- API integration layer
- State management (Redux/Zustand)
- Real-time updates (WebSocket)
- Caching strategies
- SEO optimization

## 📋 Implementation Checklist

- [ ] Create directory structure
- [ ] Move explore files
- [ ] Extract reusable components
- [ ] Update import paths
- [ ] Create shared types and constants
- [ ] Update CSS organization
- [ ] Test all functionality
- [ ] Update documentation
- [ ] Review with team
- [ ] Deploy and monitor

This structure provides a solid foundation for community features while maintaining clean separation from marketplace functionality.