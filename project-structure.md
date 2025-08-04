# MZN-E-hub-Storefront Project Structure

```
├── .env
├── .gitignore
├── next.config.ts
├── package.json
├── README.md
├── tsconfig.json
│
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── avatars/
│   │   │   ├── badges/
│   │   │   ├── banners/
│   │   │   ├── blogs/
│   │   │   ├── brands/
│   │   │   ├── categories/
│   │   │   ├── products/
│   │   │   └── ...
│   ├── favicon.ico
│   └── various icon files
│
└── src/
    ├── __server__/
    │   ├── index.ts
    │   └── __db__/
    │
    ├── app/
    │   ├── 
    │   ├── page.tsx
    │   ├── not-found.tsx
    │   ├── (auth)/
    │   ├── (layout-1)/
    │   ├── (layout-2)/
    │   ├── (layout-3)/
    │   │   ├── layout.tsx
    │   │   ├── (checkout)/
    │   │   ├── (customer-dashboard)/
    │   │   ├── product/
    │   │   └── shops/
    │   ├── (sale)/
    │   └── mobile-category-nav/
    │
    ├── components/
    │   ├── accordion/
    │   ├── avatar/
    │   ├── badge/
    │   ├── banners/
    │   ├── buttons/
    │   ├── carousel/
    │   ├── product-cards/
    │   ├── products/
    │   ├── layout/
    │   └── various base components
    │
    ├── contexts/
    │   ├── StyledContext.tsx
    │   └── app-context/
    │
    ├── data/
    │   ├── countryList.ts
    │   ├── db.ts
    │   ├── navigations.ts
    │   └── navbarNavigations.ts
    │
    ├── hooks/
    │   ├── useScroll.ts
    │   └── useWindowSize.ts
    │
    ├── icons/
    │   └── Credit.tsx
    │
    ├── interfaces/
    │   └── index.ts
    │
    ├── lib/
    │   ├── axios.ts
    │   └── registry.tsx
    │
    ├── models/
    │   ├── product.model.ts
    │   ├── user.model.ts
    │   ├── order.model.ts
    │   └── other model files
    │
    ├── page-sections/
    │   ├── auth/
    │   ├── checkout/
    │   ├── customer-dashboard/
    │   ├── landing/
    │   ├── market-1/
    │   ├── payment/
    │   ├── sale-page-1/
    │   ├── sale-page-2/
    │   ├── shop/
    │   └── vendor-dashboard/
    │
    ├── theme/
    │   ├── colors/
    │   ├── global-styles/
    │   ├── shadows/
    │   ├── index.ts
    │   ├── theme.d.ts
    │   ├── themeOptions.ts
    │   └── type.ts
    │
    └── utils/
        ├── __api__/
        │   ├── products.ts
        │   ├── stripe.ts
        │   └── other API files
        ├── constants.ts
        ├── globalStyles.ts
        ├── theme.ts
        ├── themeColors.ts
        ├── themeShadows.ts
        └── utils.ts
```

## Key Directories

- **/public**: Static assets including images, icons, and other media files
- **/src/app**: Next.js 13+ app directory with route groups and layouts
- **/src/components**: Reusable React components
- **/src/page-sections**: Page-specific component sections
- **/src/models**: TypeScript interfaces and types for data models
- **/src/utils**: Utility functions and API handlers
- **/src/theme**: Theme configuration and styling utilities
- **/src/contexts**: React context providers
- **/src/hooks**: Custom React hooks

This is a Next.js e-commerce application using TypeScript, with a well-organized structure following modern React and Next.js best practices.
