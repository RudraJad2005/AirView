
import { HistoricalAnalysisClient } from '@/components/dashboard/historical-analysis-client';
import { getLocationsData } from '@/lib/data';

export default function HistoricalAnalysisPage() {
  const locations = getLocationsData();
  return <HistoricalAnalysisClient locations={locations} />;
}
