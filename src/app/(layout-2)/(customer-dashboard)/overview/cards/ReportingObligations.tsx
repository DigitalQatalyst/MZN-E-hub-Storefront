import React from 'react';
import { ChevronRight } from 'lucide-react';

// TypeScript interfaces
interface ReportingObligation {
  id: string;
  title: string;
  dueDate: string;
  status: 'Due Soon' | 'Overdue' | 'Complete' | 'Submitted';
  statusColor: string;
}

interface ReportingObligationsCardProps {
  obligations: ReportingObligation[];
  onViewAll?: () => void;
  onObligationClick?: (obligationId: string) => void;
}

// Reporting Obligation Item component
const ReportingObligationItem: React.FC<ReportingObligation & { onClick?: () => void }> = ({ 
  title, 
  dueDate, 
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
          backgroundColor: status === 'Due Soon' ? '#FF56301A' : status === 'Submitted' ? '#0065FF1A' : statusColor,
          color: status === 'Due Soon' ? '#FF5630' : status === 'Submitted' ? '#0065FF' : 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          {status}
        </span>
      </div>
      
      <div style={{ fontSize: '12px', color: '#666' }}>{dueDate}</div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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

export const ReportingObligationsCard: React.FC<ReportingObligationsCardProps> = ({
  obligations,
  onViewAll,
  onObligationClick
}) => {
  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '24px'
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
          Reporting Obligations
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
          View all reporting obligations
        </button>
      </div>
      {obligations.map(obligation => (
        <ReportingObligationItem 
          key={obligation.id} 
          {...obligation}
          onClick={() => onObligationClick?.(obligation.id)}
        />
      ))}
    </div>
  );
};