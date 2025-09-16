import React from 'react';
import { ChevronRight } from 'lucide-react';

// TypeScript interfaces
interface ServiceApplication {
  id: string;
  title: string;
  lastUpdated: string;
  status: 'Submitted' | 'Under Review' | 'Approved';
  statusColor: string;
}

interface ServiceApplicationsCardProps {
  applications: ServiceApplication[];
  onViewAll?: () => void;
  onApplicationClick?: (applicationId: string) => void;
}

// Service Application Item component  
const ServiceApplicationItem: React.FC<ServiceApplication & { onClick?: () => void }> = ({ 
  title, 
  lastUpdated, 
  status, 
  statusColor,
  onClick 
}) => (
  <div style={{
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
    transition: 'all 0.2s ease',
    cursor: onClick ? 'pointer' : 'default'
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.backgroundColor = '#f8f9fa';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.backgroundColor = 'white';
  }}
  onClick={onClick}>
    <div style={{ flex: 1 }}>
      <div>
        <span style={{ 
          fontSize: '14px', 
          fontWeight: '500', 
          color: '#333', 
          marginBottom: '4px', 
          marginRight: '12px' 
        }}>
          {title}
        </span>
        <span style={{
          backgroundColor: '#0065FF1A',
          color: '#0065FF',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          {status}
        </span>
      </div>
      <div style={{ fontSize: '12px', color: '#666' }}>{lastUpdated}</div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{
        backgroundColor: '#0030E3',
        color: 'white',
        borderRadius: '4px',
        padding: '4px 8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '24px',
        height: '24px'
      }}>
        <ChevronRight size={14} />
      </div>
    </div>
  </div>
);

export const ServiceApplicationsCard: React.FC<ServiceApplicationsCardProps> = ({
  applications,
  onViewAll,
  onApplicationClick
}) => {
  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '24px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#333',
          margin: 0
        }}>
          Open Service Applications
        </h3>
        <button 
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#0030E3',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}
          onClick={onViewAll}
        >
          View all applications
        </button>
      </div>
      {applications.map(application => (
        <ServiceApplicationItem 
          key={application.id} 
          {...application}
          onClick={() => onApplicationClick?.(application.id)}
        />
      ))}
    </div>
  );
};