
"use client";

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { getLocationsData } from '@/lib/data';
import { getAqiInfo } from '@/lib/aqi-helpers';

// Helper function to create custom map icons with AQI values
const createAqiIcon = (aqi: number) => {
  const { color } = getAqiInfo(aqi);
  // Map Tailwind CSS classes to actual colors for inline styles
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
    className: '', // Important to clear default styling from leaflet.css
    iconSize: [35, 35],
    iconAnchor: [17, 35],
  });
};

export default function MapClient() {
  const locations = getLocationsData();

  // The check for client-side execution is handled by dynamic import with ssr:false on the page.
  // We can render the map directly here.
  return (
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
  );
}
