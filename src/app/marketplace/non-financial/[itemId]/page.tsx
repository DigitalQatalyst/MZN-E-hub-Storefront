'use client';

import MarketplaceDetailsPage from 'app/marketplace/MarketplaceDetailsPage';
import React, { useState } from 'react';

export default function NonFinancialDetailsPage({ params }: { params: { itemId: string } }) {
  // State for bookmarked items (non-financial-specific)
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([]);

  // Toggle bookmark handler
  const handleToggleBookmark = (itemId: string) => {
    setBookmarkedItems(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  return (
    <MarketplaceDetailsPage
      marketplaceType="non-financial"
      bookmarkedItems={bookmarkedItems}
      onToggleBookmark={handleToggleBookmark}
    //   itemId={params.itemId}
    />
  );
}