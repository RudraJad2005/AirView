
"use client";

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import { getLocationsData } from '@/lib/data';
import { getAqiInfo } from '@/lib/aqi-helpers';

// Dynamically import the map components to prevent SSR issues with Leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const MarkerClusterGroup = dynamic(() => import('react-leaflet-markercluster'), { ssr: false });

const createAqiIcon = (aqi: number) => {
  const { color } = getAqiInfo(aqi);
  // Translate Tailwind color to actual hex/rgb for the inline style
  const colorMap: Record<string, string> = {
    'bg-green-500': '#22c55e',
    'bg-yellow-500': '#eab308',
    'bg-orange-500': '#f97316',
    'bg-red-500': '#ef4444',
    'bg-purple-500': '#8b5cf6',
    'bg-red-900': '#7f1d1d',
  };

  const iconHtml = `<div style="background-color: ${colorMap[color]}; color: white; border-radius: 50%; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);">${aqi}</div>`;
  
  return L.divIcon({
    html: iconHtml,
    className: '', // important to clear default styling
    iconSize: [35, 35],
    iconAnchor: [17, 35],
  });
};

export default function MapPage() {
  const locations = getLocationsData();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">National AQI Map</h2>
        <p className="text-muted-foreground">
          An interactive map showing real-time AQI levels across India.
        </p>
      </div>
      <div className="rounded-lg overflow-hidden shadow-lg h-[calc(100vh-200px)]">
        <MapContainer
          center={[20.5937, 78.9629]} // Centered on India
          zoom={5}
          style={{ height: '100%', width: '100%', zIndex: 0 }}
          className="map-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MarkerClusterGroup>
            {locations.map(location => (
              <Marker
                key={location.id}
                position={[location.lat, location.lng]}
                icon={createAqiIcon(location.aqi)}
              >
                <Popup>
                  <strong>{location.city}, {location.state}</strong><br />
                  AQI: {location.aqi}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}
