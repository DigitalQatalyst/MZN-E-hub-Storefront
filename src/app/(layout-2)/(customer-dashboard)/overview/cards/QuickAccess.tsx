import React from 'react';
import { ChevronRight } from 'lucide-react';

// TypeScript interfaces
interface QuickAccessItem {
  id: string;
  title: string;
  subtitle: string;
  iconSrc: string;
}

interface QuickAccessCardProps {
  items: QuickAccessItem[];
  onItemClick?: (itemId: string) => void;
}

// Quick Access Item component
const QuickAccessItem: React.FC<QuickAccessItem & { onClick?: () => void }> = ({ 
  title, 
  subtitle, 
  iconSrc,
  onClick 
}) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '6px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '8px'
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.backgroundColor = '#f8f9fa';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.backgroundColor = 'white';
  }}
  onClick={onClick}>
    <img 
      src={iconSrc} 
      alt={title}
      style={{ 
        width: '20px', 
        height: '20px', 
        marginRight: '12px' 
      }} 
    />
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>{title}</div>
      <div style={{ fontSize: '12px', color: '#666' }}>{subtitle}</div>
    </div>
    <div style={{
      backgroundColor: '#0030E3',
      borderRadius: '4px',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <ChevronRight size={16} style={{ color: 'white' }} />
    </div>
  </div>
);

export const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  items,
  onItemClick
}) => {
  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '24px'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#333',
        margin: 0,
        marginBottom: '8px'
      }}>
        My Quick Access
      </h3>
      <p style={{
        fontSize: '14px',
        color: '#666',
        margin: 0,
        marginBottom: '16px'
      }}>
        Essential Actions to Stay on Track
      </p>
      {items.map(item => (
        <QuickAccessItem 
          key={item.id} 
          {...item}
          onClick={() => onItemClick?.(item.id)}
        />
      ))}
    </div>
  );
};