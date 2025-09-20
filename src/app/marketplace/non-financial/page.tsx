'use client';

import React, { useState } from 'react';
import { MarketplacePage } from '../../../components/marketplace/MarketplacePage';
import { getMarketplaceConfig } from '../../../utils/marketplaceConfig';
import { DollarSign, Briefcase, Calendar } from 'lucide-react';

// Promo cards for non-financial services marketplace
const nonFinancialPromoCards = [
  {
    id: 'courses-promo',
    title: 'Improve your skills',
    description: 'Discover courses to enhance your business knowledge.',
    icon: <Calendar size={24} className="text-white" />,
    path: '/marketplace/courses',
    gradientFrom: 'from-green-500',
    gradientTo: 'to-teal-400'
  },
  {
    id: 'finance-promo',
    title: 'Looking for funding?',
    description: 'Explore financial opportunities and resources to grow your business.',
    icon: <DollarSign size={24} className="text-white" />,
    path: '/marketplace/financial',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-indigo-700'
  }
];

export default function NonFinancialPage() {
  // Get configuration for non-financial
  const nonFinancialConfig = getMarketplaceConfig('non-financial');

  // State for bookmarked items (non-financial-specific)
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([]);

  // Toggle bookmark handler
  const handleToggleBookmark = (itemId: string) => {
    setBookmarkedItems(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  return (
    <MarketplacePage 
      marketplaceType="non-financial" 
      title={nonFinancialConfig.title} 
      description={nonFinancialConfig.description} 
      promoCards={nonFinancialPromoCards}
    //   bookmarkedItems={bookmarkedItems}
    //   onToggleBookmark={handleToggleBookmark}
    />
  );
}