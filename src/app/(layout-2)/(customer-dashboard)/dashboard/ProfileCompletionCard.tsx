import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Typography, { H3 } from "@component/Typography";
import { useRouter } from 'next/navigation';

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ProfileCompletionCardProps {
  completionPercentage?: number;
}

export default function ProfileCompletionCard({ 
  completionPercentage = 60 
}: ProfileCompletionCardProps) {
  const router = useRouter();
  const chartOptions: ApexOptions = {
    colors: ['#ffffff'],
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
          background: 'rgba(255,255,255,0.2)',
          strokeWidth: '100%',
          margin: 0
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: 20,
            color: 'rgba(255,255,255,0.8)',
            fontSize: '12px',
            fontWeight: '400',
            show: true
          },
          value: {
            offsetY: -10,
            fontWeight: '600',
            formatter: (val: number) => `${val}%`,
            color: 'white',
            fontSize: '28px',
            show: true
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          chart: { width: 200, height: 237 }
        }
      },
      {
        breakpoint: 768,
        options: {
          chart: { width: 150, height: 199 }
        }
      }
    ]
  };

  const series = [completionPercentage];

  return (
    <Card
      p="24px"
      // ml="-36px"
      mb="20px"
      borderRadius={12}
      style={{
        background: 'linear-gradient(84.35deg, #7970FF 30.7%, #6C7DFA 44.15%, #6089F5 55.18%, #5395F1 64.07%, #48A0EC 71.15%, #3DABE8 76.69%, #33B5E4 81.01%, #29BEE0 84.4%, #20C7DD 87.16%, #18CEDA 89.6%, #12D5D7 92.01%, #0CDAD5 94.69%, #07DFD3 97.95%, #04E2D2 102.08%, #02E4D1 107.38%, #01E5D1 114.16%)',

        color: 'white',
        width: '556px',
        height: '240px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <FlexBox justifyContent="space-between" alignItems="flex-start" height="100%">
        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <Box>
            <H3 color="white" mb="8px" fontWeight="600">
              My Profile Completion
            </H3>
            <Typography fontSize="14px" color="rgba(255,255,255,0.8)" mb="16px">
              Access a wider range of tailored services,<br />
              and personalized support.
            </Typography>
          </Box>
          <Box>
            <Typography 
              fontSize="14px" 
              color="white" 
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => router.push('/firm-profile')}
            >
              Complete your profile &gt;
            </Typography>
          </Box>
        </Box>
        
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <ReactApexChart
            type="radialBar"
            width={200}
            height={200}
            series={series}
            options={chartOptions}
          />
        </Box>
      </FlexBox>
    </Card>
  );
}