'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { LocationData } from '@/types';
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

interface InteractiveMapProps {
    locations: LocationData[];
    onSelectLocation: (location: LocationData) => void;
    selectedLocationId: string;
}

export function InteractiveMap({ locations, onSelectLocation, selectedLocationId }: InteractiveMapProps) {
    return (
        <MapContainer center={[22.5937, 78.9629]} zoom={5} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapMarkers 
                locations={locations}
                onSelectLocation={onSelectLocation}
                selectedLocationId={selectedLocationId}
            />
        </MapContainer>
    );
}
