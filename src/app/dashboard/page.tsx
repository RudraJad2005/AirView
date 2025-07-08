"use client";

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { LocationData } from '@/types';
import { getLocationsData } from '@/lib/data';
import { AqiCard } from '@/components/dashboard/aqi-card';
import { AqiChart } from '@/components/dashboard/aqi-chart';
import { KeyPollutants } from '@/components/dashboard/key-pollutants';
import { HealthAdviceModal } from '@/components/dashboard/health-advice-modal';
import { Button } from '@/components/ui/button';
import { HeartPulse, Search } from 'lucide-react';
import { PollutantInfoModal } from '@/components/dashboard/pollutant-info-modal';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getAqiInfo } from '@/lib/aqi-helpers';

// Fix for default icon issue with Leaflet in Next.js
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const createAqiIcon = (aqi: number, isSelected: boolean) => {
  const { color } = getAqiInfo(aqi);
  const size = isSelected ? 40 : 32;
  const pulseClass = aqi > 150 && !isSelected ? 'animate-breathe' : '';
  
  return L.divIcon({
    html: `<div class="relative flex items-center justify-center rounded-full text-white font-bold text-xs ${color} ${pulseClass}" style="width: ${size}px; height: ${size}px; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">${aqi}</div>`,
    className: '', // important to clear default leaflet styles
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
};

interface MapMarkersProps {
  locations: LocationData[];
  onSelectLocation: (location: LocationData) => void;
  selectedLocationId: string;
}

function MapMarkers({ locations, onSelectLocation, selectedLocationId }: MapMarkersProps) {
  const map = useMap();

  useEffect(() => {
    const selectedLocation = locations.find(l => l.id === selectedLocationId);
    if (selectedLocation) {
        map.flyTo([selectedLocation.lat, selectedLocation.lng], map.getZoom());
    }
  }, [selectedLocationId, locations, map]);

  return (
    <>
      {locations.map((location) => {
        const isSelected = location.id === selectedLocationId;
        return (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={createAqiIcon(location.aqi, isSelected)}
            eventHandlers={{
              click: () => {
                onSelectLocation(location);
              },
            }}
          >
            <Tooltip>
              <p className="font-semibold">{location.city}</p>
              <p>AQI: {location.aqi}</p>
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
}

// We need to dynamically load the MapContainer to avoid SSR issues.
const Map = dynamic(
  () => Promise.resolve(({ children, ...props }) => <MapContainer {...props}>{children}</MapContainer>),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[500px] w-full rounded-lg" />,
  }
);

export default function DashboardPage() {
  const locations = getLocationsData();
  const [selectedLocation, setSelectedLocation] = useState<LocationData>(locations[0]);
  const [healthAdviceModalOpen, setHealthAdviceModalOpen] = useState(false);
  const [pollutantInfoModalOpen, setPollutantInfoModalOpen] = useState(false);
  const [pollutantInfoLocation, setPollutantInfoLocation] = useState<LocationData>(locations[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectLocation = useCallback((location: LocationData) => {
    setSelectedLocation(location);
  }, []);

  const handlePollutantInfoClick = useCallback((location: LocationData) => {
    setPollutantInfoLocation(location);
    setPollutantInfoModalOpen(true);
  }, []);

  const filteredLocations = locations.filter(location =>
    location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time air quality monitoring for {selectedLocation.city}, {selectedLocation.state}.
          </p>
        </div>
        <div className="flex items-center space-x-2">
            <HealthAdviceModal 
              location={selectedLocation} 
              open={healthAdviceModalOpen}
              onOpenChange={setHealthAdviceModalOpen}
            >
              <Button>
                <HeartPulse className="mr-2 h-4 w-4" />
                Personalized Health Advice
              </Button>
            </HealthAdviceModal>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <AqiChart data={selectedLocation.historical} />
        </div>
        <div className="lg:col-span-3">
          <KeyPollutants pollutants={selectedLocation.pollutants} />
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
            <h3 className="text-2xl font-bold tracking-tight">AQI Across India</h3>
            <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search city or state..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <AqiCard
                key={location.id}
                location={location}
                isSelected={selectedLocation.id === location.id}
                onSelect={() => handleSelectLocation(location)}
                onPollutantInfoClick={() => handlePollutantInfoClick(location)}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-full">No locations found for your search.</p>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interactive AQI Map</CardTitle>
          <CardDescription>Visualize real-time air quality. Click a location marker to see details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full rounded-md overflow-hidden z-0">
            <Map center={[22.5937, 78.9629]} zoom={5} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapMarkers 
                locations={locations}
                onSelectLocation={handleSelectLocation}
                selectedLocationId={selectedLocation.id}
              />
            </Map>
          </div>
        </CardContent>
      </Card>
      
      <PollutantInfoModal 
        location={pollutantInfoLocation}
        open={pollutantInfoModalOpen}
        onOpenChange={setPollutantInfoModalOpen}
      />
    </div>
  );
}