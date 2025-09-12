import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ProfileCompletionCardProps {
  completionPercentage: number;
  onCompleteProfile?: () => void;
  backgroundImageUrl?: string;
}

export const ProfileCompletionCard: React.FC<ProfileCompletionCardProps> = ({
  completionPercentage,
  onCompleteProfile,
  backgroundImageUrl = '/assets/images/DFSA/spiral.png'
}) => {
  const chartOptions: ApexOptions = {
    colors: ['#0030E3'],
    stroke: { 
      width: 0,
      lineCap: 'square'
    },
    legend: { show: false },
    tooltip: { 
      enabled: false,
      theme: false as any,
      style: {
        fontSize: '12px',
        fontFamily: undefined
      }
    },
    dataLabels: { enabled: false },
    labels: ['Complete'],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      padding: {
        top: -10,
        bottom: -10
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%',
          background: 'transparent'
        },
        track: {
          background: '#0030E32A',
          strokeWidth: '100%',
          margin: 0
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: 20,
            color: '#0030E3',
            fontSize: '12px',
            fontWeight: '400',
            show: true
          },
          value: {
            offsetY: -15,
            fontWeight: '500',
            formatter: (val: number) => `${val}%`,
            color: '#0030E3',
            fontSize: '24px',
            show: true
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          chart: { width: 150, height: 150 }
        }
      },
      {
        breakpoint: 768,
        options: {
          chart: { width: 150, height: 150 }
        }
      }
    ]
  };

  const series = [completionPercentage];

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '24px',
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      position: 'relative',
      minHeight: '12.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'stretch'
    }}>
      {/* Left Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        paddingRight: '24px'
      }}>
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#333',
            margin: 0,
            marginBottom: '8px'
          }}>
            Your Profile Completion
          </h3>
          <p style={{
            fontSize: '12px',
            color: '#666',
            margin: 0
          }}>
            A complete profile ensures timely reviews and full service access.
          </p>
        </div>
        
        {/* Complete your profile button at bottom */}
        <div>
          <button 
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#0030E3',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              textDecoration: 'none',
              padding: 0
            }}
            onClick={onCompleteProfile}
          >
            Complete your profile
          </button>
        </div>
      </div>

      {/* Right Side - ApexCharts Circular Progress Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ReactApexChart
          type="radialBar"
          width={175}
          height={175}
          series={series}
          options={chartOptions}
        />
      </div>
    </div>
  );
};