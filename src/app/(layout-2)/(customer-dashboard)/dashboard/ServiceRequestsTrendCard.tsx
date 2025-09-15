"use client"

import { useState } from "react";
import dynamic from 'next/dynamic';
import type { SyntheticEvent } from 'react';
import type { ApexOptions } from 'apexcharts';
import Image from "next/image";

// MUI imports
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

import Box from "@component/Box";
import Card from "@component/Card";
import Typography, { H5 } from "@component/Typography";

// Dynamic import for ApexCharts to avoid SSR issues
const AppReactApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type ApexChartSeries = NonNullable<ApexOptions['series']>
type ApexChartSeriesData = Exclude<ApexChartSeries[0], number>
type TabCategory = 'financial' | 'non-financial'

type TabType = {
  type: TabCategory
  label: string
  icon: string
  series: ApexChartSeries
}

export function ServiceRequestsTrendCard() {
  const [value, setValue] = useState<TabCategory>('financial');

  const tabData: TabType[] = [
    {
      type: 'financial',
      label: 'Financial Requests',
      icon: '/images/columns.svg',
      series: [{ data: [2, 1, 4, 3, 1, 2, 3, 2, 1] }]
    },
    {
      type: 'non-financial',
      label: 'Non-Financial Requests',
      icon: '/images/shield-check.svg',
      series: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0] }]
    }
  ];

  const handleChange = (event: SyntheticEvent, newValue: TabCategory) => {
    setValue(newValue);
  };

  const colors = Array(9).fill('rgba(0, 48, 227, 0.2)'); // Light blue color

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '33%',
        borderRadiusApplication: 'end',
        dataLabels: { position: 'top' }
      }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: {
      offsetY: -20,
      formatter: (val: number) => `${val}`,
      style: {
        fontWeight: 500,
        colors: ['#374151'],
        fontSize: '12px'
      }
    },
    colors,
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      show: false,
      padding: {
        top: -19,
        left: -4,
        right: 0,
        bottom: -7
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { color: '#e5e7eb' },
      categories: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
      labels: {
        style: {
          colors: '#9ca3af',
          fontSize: '11px'
        }
      }
    },
    yaxis: {
      min: 0,
      max: 5,
      tickAmount: 5,
      labels: {
        offsetX: -16,
        formatter: (val: number) => `${Math.round(val)}`,
        style: {
          colors: '#9ca3af',
          fontSize: '12px'
        }
      }
    }
  };

  const renderTabPanels = () => {
    return tabData.map((item, index) => {
      const max = Math.max(...((item.series[0] as ApexChartSeriesData).data as number[]));
      const seriesIndex = ((item.series[0] as ApexChartSeriesData).data as number[]).indexOf(max);
      
      const finalColors = colors.map((color, i) => 
        seriesIndex === i ? '#0030E3' : color // Highlight max value with primary color
      );

      return (
        <TabPanel key={index} value={item.type} sx={{ p: 0 }}>
          <AppReactApexCharts
            type='bar'
            height={173}
            width={520}
            options={{ ...options, colors: finalColors }}
            series={item.series}
          />
        </TabPanel>
      );
    });
  };

  return (
    <Card 
      p="18px" 
      // ml="81px"
      borderRadius={6}
      style={{ 
        width: '556px',
        height: '362px',
        border: '1px solid #e5e7eb'
      }}
    >
      <H5 mb="4px" fontWeight="600">My Service Requests Trend</H5>
      <Typography fontSize="14px" color="text.hint" mb="15px">
        Yearly Overview
      </Typography>

      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="service requests tabs"
          sx={{
            mb: 2.5,
            '& .MuiTabs-indicator': { 
              display: 'none'
            },
            '& .MuiTab-root': { 
              textTransform: 'none',
              minWidth: 'auto',
              width: '180px',
              height: '71px',
              mr: 2,
              p: '12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 500,
              color: '#6b7280',
              backgroundColor: 'transparent',
              border: '1px dashed #e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              '&.Mui-selected': { 
                color: '#6b7280',
                backgroundColor: 'transparent',
                border: '1px solid #0030E3'
              }
            }
          }}
        >
          {tabData.map((tab) => (
            <Tab
              key={tab.type}
              value={tab.type}
              label={
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <Box style={{ 
                    width: '24px', 
                    height: '24px', 
                    backgroundColor: '#7367F014', 
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px'
                  }}>
                    <Image
                      src={tab.icon}
                      alt={tab.type}
                      width={16}
                      height={16}
                      style={{
                        objectFit: 'contain',
                        filter: 'brightness(0) saturate(100%) invert(41%) sepia(8%) saturate(1567%) hue-rotate(203deg) brightness(95%) contrast(84%)'
                      }}
                    />
                  </Box>
                  <span style={{ fontSize: '12px', lineHeight: 1.2 }}>{tab.label}</span>
                </Box>
              }
            />
          ))}
        </TabList>
        {renderTabPanels()}
      </TabContext>
    </Card>
  );
}