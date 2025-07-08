"use client";

import { useState } from 'react';
import type { LocationData } from '@/types';
import { AqiCard } from '@/components/dashboard/aqi-card';
import { AqiChart } from '@/components/dashboard/aqi-chart';
import { KeyPollutants } from '@/components/dashboard/key-pollutants';
import { HealthAdviceModal } from '@/components/dashboard/health-advice-modal';
import { Button } from '@/components/ui/button';
import { HeartPulse, Search } from 'lucide-react';
import { PollutantInfoModal } from './dashboard/pollutant-info-modal';
import { Input } from '@/components/ui/input';

interface DashboardClientProps {
  locations: LocationData[];
}

export function DashboardClient({ locations }: DashboardClientProps) {
  const [selectedLocation, setSelectedLocation] = useState<LocationData>(locations[0]);
  const [healthAdviceModalOpen, setHealthAdviceModalOpen] = useState(false);
  const [pollutantInfoModalOpen, setPollutantInfoModalOpen] = useState(false);
  const [pollutantInfoLocation, setPollutantInfoLocation] = useState<LocationData>(locations[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectLocation = (location: LocationData) => {
    setSelectedLocation(location);
  };

  const handlePollutantInfoClick = (location: LocationData) => {
    setPollutantInfoLocation(location);
    setPollutantInfoModalOpen(true);
  };

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

      <PollutantInfoModal 
        location={pollutantInfoLocation}
        open={pollutantInfoModalOpen}
        onOpenChange={setPollutantInfoModalOpen}
      />
    </div>
  );
}
