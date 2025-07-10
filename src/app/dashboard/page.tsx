
"use client";

import { useState, useCallback } from 'react';
import type { LocationData } from '@/types';
import { getLocationsData } from '@/lib/data';
import { AqiCard } from '@/components/dashboard/aqi-card';
import { AqiChart } from '@/components/dashboard/aqi-chart';
import { KeyPollutants } from '@/components/dashboard/key-pollutants';
import { HealthAdviceModal } from '@/components/dashboard/health-advice-modal';
import { Button } from '@/components/ui/button';
import { HeartPulse, Search, PlusCircle, X } from 'lucide-react';
import { PollutantInfoModal } from '@/components/dashboard/pollutant-info-modal';
import { Input } from '@/components/ui/input';
import { CityComparisonChart } from '@/components/dashboard/city-comparison-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useErrorDialog } from '@/hooks/use-error-dialog';

export default function DashboardPage() {
  const allLocations = getLocationsData();
  const [selectedLocation, setSelectedLocation] = useState<LocationData>(allLocations[0]);
  const [healthAdviceModalOpen, setHealthAdviceModalOpen] = useState(false);
  const [pollutantInfoModalOpen, setPollutantInfoModalOpen] = useState(false);
  const [pollutantInfoLocation, setPollutantInfoLocation] = useState<LocationData>(allLocations[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const [comparisonLocations, setComparisonLocations] = useState<LocationData[]>([allLocations[0], allLocations[1]]);
  const [comparisonSearch, setComparisonSearch] = useState('');
  const { showError } = useErrorDialog();


  const handleSelectLocation = useCallback((location: LocationData) => {
    setSelectedLocation(location);
  }, []);

  const handlePollutantInfoClick = useCallback((location: LocationData) => {
    setPollutantInfoLocation(location);
    setPollutantInfoModalOpen(true);
  }, []);

  const handleAddComparison = () => {
    if (!comparisonSearch) return;

    if (comparisonLocations.length >= 5) {
      showError('Limit Reached', 'You can compare a maximum of 5 cities at a time.');
      return;
    }

    const locationToAdd = allLocations.find(
      l => l.city.toLowerCase() === comparisonSearch.toLowerCase()
    );

    if (locationToAdd) {
      if (comparisonLocations.some(l => l.id === locationToAdd.id)) {
        showError('Already Added', `${locationToAdd.city} is already in the comparison list.`);
      } else {
        setComparisonLocations(prev => [...prev, locationToAdd]);
      }
      setComparisonSearch('');
    } else {
      showError('Location Not Found', `Could not find data for "${comparisonSearch}". Please check the city name.`);
    }
  };

  const handleRemoveComparison = (locationId: string) => {
    setComparisonLocations(prev => prev.filter(l => l.id !== locationId));
  };

  const filteredLocations = allLocations.filter(location =>
    location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time air quality monitoring for {selectedLocation.city}, {selectedLocation.state}.
          </p>
        </div>
        <div className="flex w-full items-center space-x-2 sm:w-auto">
            <HealthAdviceModal 
              location={selectedLocation} 
              open={healthAdviceModalOpen}
              onOpenChange={setHealthAdviceModalOpen}
            >
              <Button className="w-full sm:w-auto">
                <HeartPulse className="mr-2 h-4 w-4" />
                Personalized Health Advice
              </Button>
            </HealthAdviceModal>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <AqiChart data={selectedLocation.historical} />
        </div>
        <div>
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            <p className="col-span-full text-muted-foreground">No locations found for your search.</p>
          )}
        </div>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Compare City AQI Trends</CardTitle>
            <CardDescription>Add up to 5 cities to compare their AQI for the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
                <Input
                    placeholder="Enter city name to add..."
                    value={comparisonSearch}
                    onChange={(e) => setComparisonSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComparison()}
                />
                <Button onClick={handleAddComparison} className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add City
                </Button>
            </div>
             {comparisonLocations.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {comparisonLocations.map(location => (
                  <div key={location.id} className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm">
                    <span>{location.city}</span>
                    <button onClick={() => handleRemoveComparison(location.id)} className="text-muted-foreground hover:text-foreground">
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {location.city}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <CityComparisonChart locations={comparisonLocations} />
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
