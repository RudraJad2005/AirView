import { AnalyticsClient } from '@/components/dashboard/analytics-client';
import { getLocationsData } from '@/lib/data';

export default function AnalyticsPage() {
  const locations = getLocationsData();
  const states = [...new Set(locations.map(l => l.state))];
  return <AnalyticsClient states={states} />;
}
