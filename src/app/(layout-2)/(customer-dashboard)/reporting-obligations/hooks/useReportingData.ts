"use client";

import { useEffect, useState } from 'react';
import { fetchReportingData } from '../services/reportingService';
import { ReportingData } from '../types/reporting';


export function useReportingData() {
  const [data, setData] = useState<ReportingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const reportData = await fetchReportingData();
      setData(reportData);
    } catch (err) {
      console.error('Error fetching report data:', err);
      setError('Failed to load reports data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, error, refetch: loadData };
}


