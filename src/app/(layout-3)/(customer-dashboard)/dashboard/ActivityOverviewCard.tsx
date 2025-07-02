"use client"

import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
import Card from "@component/Card"
import Box from "@component/Box"
import FlexBox from "@component/FlexBox"
import Typography, { H3, H5 } from "@component/Typography"

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const ActivityOverviewCard = () => {
  // Mock data
  const activityData = {
    totalServices: 14,
    approved: 8,
    underReview: 4,
    rejected: 2
  };

  // Calculate dynamic approval rate
  const approvalRate = Math.ceil((activityData.approved/activityData.totalServices)*100);

  // Chart configuration
  const options: ApexOptions = {
    stroke: { dashArray: 10 },
    labels: ['Service Approval Rate'],
    colors: ['#0030E3'],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityTo: 0.5,
        opacityFrom: 1,
        shadeIntensity: 0.5,
        stops: [30, 70, 100],
        inverseColors: false,
        gradientToColors: ['#0030E3']
      }
    },
    plotOptions: {
      radialBar: {
        endAngle: 130,
        startAngle: -140,
        hollow: { size: '60%' },
        track: { background: 'transparent' },
        dataLabels: {
          name: {
            offsetY: -24,
            fontSize: '12px',
            color: '#9E9E9E',
          },
          value: {
            offsetY: 8,
            fontWeight: 500,
            fontSize: '35px',
            color: '#4B465C',
            formatter: value => `${value}%`,
          }
        }
      }
    },
    grid: {
      padding: {
        top: -18,
        left: 0,
        right: 0,
        bottom: 14
      }
    },
    responsive: [
      {
        breakpoint: 1380,
        options: {
          grid: {
            padding: {
              top: 8,
              left: 12
            }
          }
        }
      },
      {
        breakpoint: 1280,
        options: {
          chart: {
            height: 325
          },
          grid: {
            padding: {
              top: 12,
              left: 12
            }
          }
        }
      },
      {
        breakpoint: 1201,
        options: {
          chart: {
            height: 362
          }
        }
      },
      {
        breakpoint: 1135,
        options: {
          chart: {
            height: 350
          }
        }
      },
      {
        breakpoint: 980,
        options: {
          chart: {
            height: 300
          }
        }
      },
      {
        breakpoint: 900,
        options: {
          chart: {
            height: 350
          }
        }
      }
    ]
  }

  const series = [approvalRate]

  const serviceData = [
    {
      icon: '💳',
      title: 'Approved',
      value: String(activityData.approved).padStart(2, '0') + ' Services',
      bgColor: '#f3f4f6'
    },
    {
      icon: '⏱️',
      title: 'Under Review', 
      value: String(activityData.underReview).padStart(2, '0') + ' Services',
      bgColor: '#f3f4f6'
    },
    {
      icon: '⏰',
      title: 'Rejected',
      value: String(activityData.rejected).padStart(2, '0') + ' Services',
      bgColor: '#f3f4f6'
    }
  ]

  return (
    <Card 
      p="24px"
      ml="-36px"
      borderRadius={12}
      style={{
        width: '556px',
        height: '362px',
        border: '1px solid #e5e7eb',
        backgroundColor: '#ffffff'
      }}
    >
      <FlexBox justifyContent="space-between" alignItems="center" mb="12px">
        <Box>
          <H5 mb="4px" fontWeight="600">My Activity Overview</H5>
          <Typography fontSize="14px" color="text.hint">Last 30 Days</Typography>
        </Box>
        <Typography fontSize="18px" color="text.hint">⋯</Typography>
      </FlexBox>

      <FlexBox alignItems="flex-start" justifyContent="space-between" height="50px">
        <Box>
          <H3 fontSize="48px" fontWeight="bold" color="text.primary">
            {activityData.totalServices}
          </H3>
          <Typography fontSize="16px" color="text.hint" mb="24px">
            Total Services Requested
          </Typography>

          <FlexBox flexDirection="column">
            {serviceData.map((item, index) => (
              <FlexBox key={index} alignItems="center" style={{ marginBottom: index < serviceData.length - 1 ? '12px' : '0' }}>
                <Box 
                  style={{ 
                    width: '24px', 
                    height: '24px', 
                    backgroundColor: item.bgColor, 
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px'
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography fontSize="14px" fontWeight="500">{item.title}</Typography>
                  <Typography fontSize="12px" color="text.hint">{item.value}</Typography>
                </Box>
              </FlexBox>
            ))}
          </FlexBox>
        </Box>

        <Box style={{ width: '300px', height: '300px', marginTop: '-20px' }}>
          <Chart 
            options={options}
            series={series}
            type="radialBar"
            height="100%"
          />
        </Box>
      </FlexBox>
    </Card>
  )
}