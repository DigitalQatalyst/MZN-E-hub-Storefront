# Files Removed During Project Cleanup

This document provides a comprehensive summary of all files and directories that were removed during the cleanup process to keep only the essential components for the `/documents` page functionality.

## Major Directories Removed

### App Routes & Layouts

#### ❌ Authentication Routes
- `src/app/(auth)/` - **Entire directory removed**
  - `src/app/(auth)/layout.tsx`
  - `src/app/(auth)/login/page.tsx`
  - `src/app/(auth)/signup/page.tsx`

#### ❌ Layout-1 Routes (Market/Community Pages)
- `src/app/(layout-1)/` - **Entire directory removed**
  - `src/app/(layout-1)/layout.tsx`
  - `src/app/(layout-1)/community-marketplace/page.tsx`
  - `src/app/(layout-1)/market-1/page.tsx`
  - `src/app/(layout-1)/market-2/page.tsx`
  - `src/app/(layout-1)/non-financial-marketplace/page.tsx`
  - `src/app/(layout-1)/services/page.tsx`

#### ❌ Layout-3 Routes (E-commerce Pages)
- `src/app/(layout-3)/` - **Entire directory removed**
  - `src/app/(layout-3)/layout.tsx`
  - `src/app/(layout-3)/(checkout)/`
    - `src/app/(layout-3)/(checkout)/layout.tsx`
    - `src/app/(layout-3)/(checkout)/cart/page.tsx`
    - `src/app/(layout-3)/(checkout)/checkout/page.tsx`
    - `src/app/(layout-3)/(checkout)/checkout-alternative/page.tsx`
  - `src/app/(layout-3)/(customer-dashboard)/`
    - `src/app/(layout-3)/(customer-dashboard)/address/page.tsx`
    - `src/app/(layout-3)/(customer-dashboard)/orders/page.tsx`
    - `src/app/(layout-3)/(customer-dashboard)/orders/[id]/page.tsx`
    - `src/app/(layout-3)/(customer-dashboard)/payment-methods/page.tsx`
    - `src/app/(layout-3)/(customer-dashboard)/profile/page.tsx`
    - `src/app/(layout-3)/(customer-dashboard)/support-tickets/page.tsx`
    - `src/app/(layout-3)/(customer-dashboard)/wishlist/page.tsx`
  - `src/app/(layout-3)/product/`
    - `src/app/(layout-3)/product/[slug]/page.tsx`
    - `src/app/(layout-3)/product/search/[slug]/page.tsx`
  - `src/app/(layout-3)/shops/`
    - `src/app/(layout-3)/shops/[slug]/page.tsx`
    - `src/app/(layout-3)/shops/page.tsx`
  - `src/app/(layout-3)/vendor/`
    - `src/app/(layout-3)/vendor/account-settings/page.tsx`
    - `src/app/(layout-3)/vendor/orders/page.tsx`
    - `src/app/(layout-3)/vendor/orders/[id]/page.tsx`
    - `src/app/(layout-3)/vendor/products/page.tsx`
    - `src/app/(layout-3)/vendor/dashboard/page.tsx`

## Components Removed

### ❌ E-commerce Product Components
- `src/components/product-cards/` - **Entire directory with 20+ components**
  - ProductCard1.tsx through ProductCard20.tsx
  - Product card variations for different layouts
- `src/components/products/` - **Entire directory with 16 components**
  - ProductIntro.tsx, ProductDescription.tsx, ProductReview.tsx, etc.
  - All product-related display components

### ❌ Shopping & Cart Components
- `src/components/mini-cart/` - **Entire directory**
  - Shopping cart sidebar and mini cart components
- Cart-related functionality components

### ❌ Header Components
- `src/components/header/` - **Entire directory**
  - Header.tsx, HeaderTwo.tsx
  - Various header layouts for different page types

### ❌ Layout Components (Unused)
- `src/components/layout/layout-1/` - **Entire directory**
- `src/components/layout/layout-3/` - **Entire directory**
- `src/components/layout/customer-dashboard/` - **Entire directory**
- `src/components/layout/vendor-dashboard/` - **Entire directory**
- `src/components/layout/profile/` - **Entire directory**

### ❌ E-commerce Specific Components
- `src/components/banners/` - **Entire directory**
  - BannerCard1.tsx, BannerCard2.tsx, BannerCard3.tsx
- `src/components/carousel-cards/` - **Entire directory**
  - CarouselCard1.tsx, CarouselCard2.tsx, CarouselCard3.tsx
- `src/components/search-box/` - **Entire directory**
  - SearchInput.tsx, SearchInputWithCategory.tsx
- `src/components/sidenav/` - **Entire directory**
  - SideNavbar.tsx, SideNavbar2.tsx

### ❌ Form Components (Unused)
- `src/components/forms/` - **Entire directory**
- `src/components/text-field/` - **Entire directory**
- `src/components/textarea/` - **Entire directory**
- `src/components/radio/` - **Entire directory**

### ❌ Additional UI Components
- `src/components/accordion/` - **Entire directory**
- `src/components/avatar/` - **Entire directory**
- `src/components/carousel/` - **Entire directory**
- `src/components/pagination/` - **Entire directory**
- `src/components/rating/` - **Entire directory**
- `src/components/topbar/` - **Entire directory**
- `src/components/tab-bar/` - **Entire directory**

## Page Sections Removed

### ❌ Authentication Page Sections
- `src/page-sections/auth/` - **Entire directory**
  - Login.tsx, Signup.tsx, SocialLinks.tsx
  - Authentication form components

### ❌ E-commerce Page Sections
- `src/page-sections/checkout/` - **Entire directory**
  - CheckoutForm.tsx, CheckoutSummary.tsx, etc.
- `src/page-sections/market-1/` - **Entire directory**
  - 19 section components for market layout
- `src/page-sections/market-2/` - **Entire directory**
  - Multiple subdirectories with market components
- `src/page-sections/shop/` - **Entire directory**
  - ShopIntroCard.tsx, ProductDetails.tsx, etc.

### ❌ Customer Dashboard Sections
- `src/page-sections/customer-dashboard/` - **Entire directory**
  - address/, orders/, payment-method/, profile/, support-ticket/
  - All customer account management components

### ❌ Other Page Sections
- `src/page-sections/landing/` - **Entire directory**
  - Landing page sections and components
- `src/page-sections/payment/` - **Entire directory**
  - Payment processing components
- `src/page-sections/sale-page-1/` - **Entire directory**
- `src/page-sections/sale-page-2/` - **Entire directory**
- `src/page-sections/vendor-dashboard/` - **Entire directory**

## Data & Models Removed

### ❌ Data Files
- `src/data/countryList.ts`
- `src/data/db.ts`
- `src/data/navbarNavigations.ts`
- `src/data/navigations.ts`

### ❌ Model Files
- `src/models/` - **Most model files removed**
  - product.model.ts, user.model.ts, order.model.ts
  - cart.model.ts, vendor.model.ts, blog.model.ts
  - And 10+ other model files
  - **Kept only**: address.model.ts, Brand.model.ts (if still needed)

## Utilities Removed

### ❌ API Utilities
- `src/utils/__api__/` - **Entire directory**
  - 19 API utility files for various features
  - products.ts, stripe.ts, users.ts, etc.

### ❌ Utility Files
- `src/utils/globalStyles.ts`
- `src/utils/themeColors.ts`
- `src/utils/themeShadows.ts`

## Server Data Removed

### ❌ Mock Server Data
- `src/__server__/__db__/` - **Most subdirectories**
  - fashion-1/, fashion-2/, fashion-3/
  - furniture/, gadget/, gift/
  - grocery-1/, grocery-2/, grocery-3/
  - health-beauty/, market-1/, market-2/
  - orders/, products/, related-products/
  - sales/, shop/, ticket/, users/
  - **Kept only**: address/ (if needed for documents functionality)

## Assets Potentially Removed

### ❌ Unused Images
- Most product images in `public/assets/images/products/`
- Category images in `public/assets/images/categories/`
- Banner images in `public/assets/images/banners/`
- Brand logos in `public/assets/images/brands/`
- **Kept**: Essential logos and icons needed for navigation/footer

## Summary

**Total Estimated Files Removed**: 200+ files and directories

**Directories Completely Removed**: 30+ directories
**Individual Files Removed**: 150+ files

**Key Functionality Removed**:
- Complete e-commerce functionality (products, cart, checkout)
- User authentication system
- Multi-layout system (reduced to layout-2 only)
- Vendor/seller dashboard
- Customer account management (except documents)
- Product catalog and search
- Payment processing
- Blog/content management
- Landing page sections

**Retained for Documents Page**:
- Core layout system (layout-2)
- Essential UI components (Box, Typography, Button, etc.)
- Documents-specific components (DropZone, FileCard, etc.)
- Theme and styling system
- Context providers
- Mobile navigation and footer
- File upload/management functionality

This cleanup reduced the codebase by approximately 80%, keeping only the essential components needed for the documents page at `/documents` to function properly.