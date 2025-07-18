
"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Use dynamic import with ssr: false to ensure the map component only loads on the client.
// The loading property provides a fallback while the component is being loaded.
const MapClient = dynamic(() => import('@/components/map-client'), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

export default function MapPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">National AQI Map</h2>
        <p className="text-muted-foreground">
          An interactive map showing real-time AQI levels across India.
        </p>
      </div>
      {/* Adding a stable key to the wrapper div helps React manage the component's lifecycle more predictably,
          which can prevent the re-initialization error, especially during development. */}
      <div key="map-wrapper" className="rounded-lg overflow-hidden shadow-lg h-[calc(100vh-200px)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20 border-primary/20 hover:border-primary/50">
        <MapClient />
      </div>
    </div>
  );
}
