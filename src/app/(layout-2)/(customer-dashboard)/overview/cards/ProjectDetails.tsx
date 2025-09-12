import React from 'react';

// TypeScript interfaces
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  color?: string;
}

interface CompanyInfoProps {
  companyName: string;
  licenseNumber: string;
  licenseType: string;
  issueDate: string;
  expiryDate: string;
  reportingObligations: number;
  openApplications: number;
  profileCompletion: number;
}

// Reusable StatCard component
const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, color = '#666' }) => (
  <div style={{
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '24px',
    textAlign: 'center',
    height: '4.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }}>
    <div style={{
      fontSize: '16px',
      fontWeight: 'bold',
      color: color,
      marginBottom: '8px'
    }}>
      {value}
    </div>
    <div style={{
      fontSize: '12px',
      color: '#666',
      fontWeight: '500',
      marginBottom: '4px'
    }}>
      {title}
    </div>
    <div style={{
      fontSize: '12px',
      color: '#999'
    }}>
      {subtitle}
    </div>
  </div>
);

export const CompanyInfoCard: React.FC<CompanyInfoProps> = ({
  companyName,
  licenseNumber,
  licenseType,
  issueDate,
  expiryDate,
  reportingObligations,
  openApplications,
  profileCompletion
}) => {
  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '24px'
    }}>
      {/* Header Section */}
      <div style={{
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#333',
              margin: 0
            }}>
              {companyName}
            </h1>
            <span style={{
              backgroundColor: '#34C7591A',
              color: '#34C759',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              Active License
            </span>
          </div>
          <button style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#0030E3',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}>
            View profile details
          </button>
        </div>
        <div style={{
          fontSize: '14px',
          color: '#666'
        }}>
          {licenseNumber}
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <StatCard 
          title="Reporting Obligations" 
          value={reportingObligations} 
          subtitle="" 
          color="##FF5630"
        />
        <StatCard 
          title="Open Applications" 
          value={openApplications} 
          subtitle="" 
          color="#2A2B2D"
        />
        <StatCard 
          title="Profile Completion" 
          value={`${profileCompletion}%`} 
          subtitle="" 
          color="#2A2B2D"
        />
      </div>

      {/* License Information */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px'
      }}>
        <div>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>License Type</div>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>{licenseType}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>License Number</div>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>{licenseNumber}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Issue Date</div>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>{issueDate}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Expiry Date</div>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>{expiryDate}</div>
        </div>
      </div>
    </div>
  );
};