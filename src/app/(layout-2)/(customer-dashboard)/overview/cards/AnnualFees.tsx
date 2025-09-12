import React from 'react';
import { Eye } from 'lucide-react';

interface FeeInfo {
  year: number;
  amount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  nextDueDate: string;
}

interface AnnualFeesCardProps {
  feeInfo: FeeInfo;
  onViewInvoice?: () => void;
}

export const AnnualFeesCard: React.FC<AnnualFeesCardProps> = ({
  feeInfo,
  onViewInvoice
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return { bg: '#34C7591A', color: '#34C759' };
      case 'Pending': return { bg: '#FF8F001A', color: '#FF8F00' };
      case 'Overdue': return { bg: '#FF56301A', color: '#FF5630' };
      default: return { bg: '#f0f0f0', color: '#666' };
    }
  };

  const statusColors = getStatusColor(feeInfo.status);

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '24px'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#333',
        margin: 0,
        marginBottom: '16px'
      }}>
        Annual Fees Summary
      </h3>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <div style={{ fontSize: '14px', color: '#666' }}>
          License Fee {feeInfo.year}
        </div>
        <div style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
          {feeInfo.currency} {feeInfo.amount.toLocaleString()}
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <div style={{ fontSize: '14px', color: '#666' }}>Status</div>
        <div style={{
          backgroundColor: statusColors.bg,
          color: statusColors.color,
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          {feeInfo.status}
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <div style={{ fontSize: '14px', color: '#666' }}>Next Due</div>
        <div style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
          {feeInfo.nextDueDate}
        </div>
      </div>
      <button 
        style={{
          backgroundColor: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '6px',
          padding: '8px 16px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#333',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#f8f9fa';
          e.currentTarget.style.borderColor = '#9B1823';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.borderColor = '#e0e0e0';
        }}
        onClick={onViewInvoice}
      >
        <Eye size={16} />
        View Invoice
      </button>
    </div>
  );
};