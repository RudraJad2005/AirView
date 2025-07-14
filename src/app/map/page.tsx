
import { MapClient } from '@/components/map-client';

export default function MapPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">National AQI Map</h2>
        <p className="text-muted-foreground">
          An interactive map showing real-time AQI levels across India.
        </p>
      </div>
      <div className="rounded-lg overflow-hidden shadow-lg h-[calc(100vh-200px)]">
        <MapClient />
      </div>
    </div>
  );
}
