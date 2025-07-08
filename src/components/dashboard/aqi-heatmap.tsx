"use client";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { LocationData } from '@/types';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { getAqiInfo } from '@/lib/aqi-helpers';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface AqiHeatmapProps {
  locations: LocationData[];
  onSelectLocation: (location: LocationData) => void;
  selectedLocationId: string;
}

// Fix for default icon issue with Leaflet in Next.js
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


export function AqiHeatmap({ locations, onSelectLocation, selectedLocationId }: AqiHeatmapProps) {
  
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive AQI Map</CardTitle>
        <CardDescription>Visualize real-time air quality. Click a location marker to see details.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full rounded-md overflow-hidden z-0">
            <MapContainer center={[22.5937, 78.9629]} zoom={5} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
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
            </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
