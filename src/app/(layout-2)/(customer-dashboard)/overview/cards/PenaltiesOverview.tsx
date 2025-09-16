import React from 'react';

interface PenaltiesOverviewCardProps {
  hasOutstandingPenalties?: boolean;
  penaltyCount?: number;
  onViewHistory?: () => void;
  iconSrc?: string;
}

export const PenaltiesOverviewCard: React.FC<PenaltiesOverviewCardProps> = ({
  hasOutstandingPenalties = false,
  penaltyCount = 0,
  onViewHistory,
  iconSrc = '/assets/images/icons/bell.svg'
}) => {
  const displayTitle = hasOutstandingPenalties 
    ? `${penaltyCount} Outstanding Penalties` 
    : 'No Outstanding Penalties';
  
  const displaySubtitle = hasOutstandingPenalties
    ? 'Please review and address outstanding issues'
    : 'Your firm is in good regulatory standing';

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
          fontSize: '16px',
          fontWeight: '600',
          color: '#333',
          margin: 0
        }}>
          Penalties Overview
        </h3>
        <button 
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#0030E3',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}
          onClick={onViewHistory}
        >
          View penalty history
        </button>
      </div>
      <div style={{
        textAlign: 'center',
        padding: '32px 16px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: hasOutstandingPenalties ? '#FF56301A' : '#34C75914',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto'
        }}>
          <img 
            src={iconSrc} 
            alt="Status icon"
            style={{ 
              width: '48px', 
              height: '48px',
              filter: hasOutstandingPenalties 
                ? 'brightness(0) saturate(100%) invert(35%) sepia(95%) saturate(1945%) hue-rotate(360deg) brightness(96%) contrast(102%)'
                : 'brightness(0) saturate(100%) invert(70%) sepia(56%) saturate(2451%) hue-rotate(88deg) brightness(102%) contrast(87%)'
            }} 
          />
        </div>
        <div style={{
          fontSize: '16px',
          fontWeight: '500',
          color: '#333',
          marginBottom: '8px'
        }}>
          {displayTitle}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#666'
        }}>
          {displaySubtitle}
        </div>
      </div>
    </div>
  );
};