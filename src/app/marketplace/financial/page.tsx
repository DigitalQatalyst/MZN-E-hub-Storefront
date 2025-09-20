'use client';

import React, { useState } from 'react';
import { MarketplacePage } from '../../../components/marketplace/MarketplacePage';
import { getMarketplaceConfig } from '../../../utils/marketplaceConfig';
import { DollarSign, Briefcase, Calendar } from 'lucide-react';

// Promo cards for financial services marketplace
const financialPromoCards = [
  {
    id: 'courses-promo',
    title: 'Improve your skills',
    description: 'Discover courses to enhance your financial knowledge.',
    icon: <Calendar size={24} className="text-white" />,
    path: '/marketplace/courses',
    gradientFrom: 'from-green-500',
    gradientTo: 'to-teal-400'
  },
  {
    id: 'advisory-promo',
    title: 'Need expert advice?',
    description: 'Connect with industry experts and get personalized guidance.',
    icon: <Briefcase size={24} className="text-white" />,
    path: '/marketplace/non-financial',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-pink-500'
  }
];

export default function FinancialPage() {
  // Get configuration for financial
  const financialConfig = getMarketplaceConfig('financial');

  // State for bookmarked items (financial-specific)
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([]);

  // Toggle bookmark handler
  const handleToggleBookmark = (itemId: string) => {
    setBookmarkedItems(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  return (
    <MarketplacePage 
      marketplaceType="financial" 
      title={financialConfig.title} 
      description={financialConfig.description} 
      promoCards={financialPromoCards}
    //   bookmarkedItems={bookmarkedItems}
    //   onToggleBookmark={handleToggleBookmark}
    />
  );
}