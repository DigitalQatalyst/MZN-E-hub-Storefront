import React, { useEffect, useRef } from 'react';
import { XIcon } from 'lucide-react';
import { getMarketplaceConfig } from '../../utils/marketplaceConfig';
interface MarketplaceComparisonProps {
  items: any[];
  onClose: () => void;
  onRemoveItem: (itemId: string) => void;
  marketplaceType: string;
}
export const MarketplaceComparison: React.FC<MarketplaceComparisonProps> = ({
  items,
  onClose,
  onRemoveItem,
  marketplaceType
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const config = getMarketplaceConfig(marketplaceType);
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);
  // Generate comparison categories based on marketplace type
  const comparisonCategories = [...config.attributes.map(attr => ({
    name: attr.label || attr.key,
    key: attr.key
  })), {
    name: 'Description',
    key: 'description'
  }];
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header - Sticky for better mobile experience */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center z-10">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
            {config.itemName} Comparison
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors p-1" aria-label="Close comparison">
            <XIcon size={24} />
          </button>
        </div>
        <div className="p-3 sm:p-6">
          {items.length === 0 ? <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                No items selected for comparison
              </p>
              <button onClick={onClose} className="px-4 py-2 text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                Close
              </button>
            </div> : <>
              {/* Mobile View - Carousel style for small screens */}
              <div className="block sm:hidden">
                <div className="mb-4 text-center text-sm text-gray-500">
                  Swipe horizontally to compare items
                </div>
                {/* Item headers - scrollable on mobile */}
                <div className="overflow-x-auto pb-4">
                  <div className="flex min-w-max">
                    <div className="w-32 flex-shrink-0">
                      <div className="h-24 flex items-end">
                        <h3 className="text-base font-semibold text-gray-700">
                          Item Details
                        </h3>
                      </div>
                    </div>
                    {items.map(item => <div key={item.id} className="w-56 flex-shrink-0 relative px-2">
                        <button onClick={() => onRemoveItem(item.id)} className="absolute top-0 right-0 p-1 text-gray-400 hover:text-gray-600" aria-label="Remove from comparison">
                          <XIcon size={16} />
                        </button>
                        <div className="flex flex-col items-center mb-2">
                          <img src={item.provider.logoUrl} alt={item.provider.name} className="h-12 w-12 object-contain mb-2" />
                          <span className="text-sm text-gray-500">
                            {item.provider.name}
                          </span>
                        </div>
                        <h4 className="text-center font-medium text-gray-900 text-sm">
                          {item.title}
                        </h4>
                      </div>)}
                    {Array(3 - items.length).fill(0).map((_, index) => <div key={`empty-${index}`} className="w-56 flex-shrink-0 border border-dashed border-gray-200 rounded-lg flex items-center justify-center mx-2">
                          <span className="text-gray-400 text-sm">
                            Add an item
                          </span>
                        </div>)}
                  </div>
                </div>
                {/* Comparison rows - scrollable on mobile */}
                <div className="space-y-4 overflow-x-auto">
                  {comparisonCategories.map(category => <div key={category.key} className="pb-3 border-t border-gray-100 pt-3">
                      <div className="font-medium text-gray-700 mb-2 sticky left-0 bg-white">
                        {category.name}
                      </div>
                      <div className="flex min-w-max">
                        {items.map(item => <div key={`${item.id}-${category.key}`} className="w-56 px-2">
                            {category.key === 'description' ? <p className="text-sm text-gray-700 text-left">
                                {item[category.key]?.substring(0, 100)}
                                {item[category.key]?.length > 100 ? '...' : ''}
                              </p> : category.key === 'price' && !item[category.key] ? <span className="text-gray-500">Free</span> : item[category.key] ? <span className="text-gray-900">
                                {item[category.key]}
                              </span> : <span className="text-gray-400">N/A</span>}
                          </div>)}
                        {Array(3 - items.length).fill(0).map((_, index) => <div key={`empty-${category.key}-${index}`} className="w-56 px-2" />)}
                      </div>
                    </div>)}
                  {/* Details/Features */}
                  <div className="pb-3 border-t border-gray-100 pt-3">
                    <div className="font-medium text-gray-700 mb-2 sticky left-0 bg-white">
                      {marketplaceType === 'courses' ? 'Learning Outcomes' : 'Features'}
                    </div>
                    <div className="flex min-w-max">
                      {items.map(item => <div key={`${item.id}-details`} className="w-56 px-2">
                          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                            {(item.learningOutcomes || item.details || []).slice(0, 3).map((detail: string, index: number) => <li key={index}>{detail}</li>)}
                          </ul>
                        </div>)}
                      {Array(3 - items.length).fill(0).map((_, index) => <div key={`empty-details-${index}`} className="w-56 px-2" />)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Desktop View - Grid layout for larger screens */}
              <div className="hidden sm:block">
                {/* Item headers */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="col-span-1">
                    <div className="h-24 flex items-end">
                      <h3 className="text-lg font-semibold text-gray-700">
                        Item Details
                      </h3>
                    </div>
                  </div>
                  {items.map(item => <div key={item.id} className="col-span-1 relative">
                      <button onClick={() => onRemoveItem(item.id)} className="absolute top-0 right-0 p-1 text-gray-400 hover:text-gray-600" aria-label="Remove from comparison">
                        <XIcon size={16} />
                      </button>
                      <div className="flex flex-col items-center mb-2">
                        <img src={item.provider.logoUrl} alt={item.provider.name} className="h-12 w-12 object-contain mb-2" />
                        <span className="text-sm text-gray-500">
                          {item.provider.name}
                        </span>
                      </div>
                      <h4 className="text-center font-medium text-gray-900">
                        {item.title}
                      </h4>
                    </div>)}
                  {Array(3 - items.length).fill(0).map((_, index) => <div key={`empty-${index}`} className="col-span-1 border border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                          Add an item
                        </span>
                      </div>)}
                </div>
                {/* Comparison rows */}
                <div className="space-y-4">
                  {comparisonCategories.map(category => <div key={category.key} className="grid grid-cols-4 gap-4 py-3 border-t border-gray-100">
                      <div className="col-span-1 font-medium text-gray-700">
                        {category.name}
                      </div>
                      {items.map(item => <div key={`${item.id}-${category.key}`} className="col-span-1 text-center">
                          {category.key === 'description' ? <p className="text-sm text-gray-700 text-left">
                              {item[category.key]?.substring(0, 100)}
                              {item[category.key]?.length > 100 ? '...' : ''}
                            </p> : category.key === 'price' && !item[category.key] ? <span className="text-gray-500">Free</span> : item[category.key] ? <span className="text-gray-900">
                              {item[category.key]}
                            </span> : <span className="text-gray-400">N/A</span>}
                        </div>)}
                      {Array(3 - items.length).fill(0).map((_, index) => <div key={`empty-${category.key}-${index}`} className="col-span-1" />)}
                    </div>)}
                  {/* Details/Features */}
                  <div className="grid grid-cols-4 gap-4 py-3 border-t border-gray-100">
                    <div className="col-span-1 font-medium text-gray-700">
                      {marketplaceType === 'courses' ? 'Learning Outcomes' : 'Features'}
                    </div>
                    {items.map(item => <div key={`${item.id}-details`} className="col-span-1">
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                          {(item.learningOutcomes || item.details || []).map((detail: string, index: number) => <li key={index}>{detail}</li>)}
                        </ul>
                      </div>)}
                    {Array(3 - items.length).fill(0).map((_, index) => <div key={`empty-details-${index}`} className="col-span-1" />)}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button onClick={onClose} className="px-4 py-2 text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                  Close
                </button>
              </div>
            </>}
        </div>
      </div>
    </div>;
};