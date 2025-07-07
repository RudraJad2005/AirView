import { DashboardClient } from '@/components/dashboard-client';
import { getLocationsData } from '@/lib/data';

export default function Home() {
  const locations = getLocationsData();
  return <DashboardClient locations={locations} />;
}
