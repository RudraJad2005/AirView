
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Trash2, Loader2, PlusCircle } from 'lucide-react';
import { useAuth } from '@/components/layout/auth-provider';
import { getSavedLocations, addSavedLocation, removeSavedLocation } from '@/lib/firestore';
import { getLocationsData } from '@/lib/data';
import type { LocationData } from '@/types';
import { useErrorDialog } from '@/hooks/use-error-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function LocationSettingsPage() {
  const { user } = useAuth();
  const [savedLocations, setSavedLocations] = useState<LocationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useErrorDialog();
  const allLocations = getLocationsData();

  const fetchSavedLocations = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const locations = await getSavedLocations(user.uid);
      setSavedLocations(locations);
    } catch (error) {
      console.error('Error fetching saved locations:', error);
      showError('Fetch Error', 'Could not fetch your saved locations.');
    } finally {
      setIsLoading(false);
    }
  }, [user, showError]);

  useEffect(() => {
    fetchSavedLocations();
  }, [fetchSavedLocations]);

  const handleAddLocation = async (locationId: string) => {
    if (!user) return;
    if (savedLocations.some(l => l.id === locationId)) {
        showError('Already Saved', 'This location is already in your saved list.');
        return;
    }
    try {
      await addSavedLocation(user.uid, locationId);
      await fetchSavedLocations(); // Re-fetch to update the list
    } catch (error) {
      console.error('Error adding location:', error);
      showError('Save Error', 'Could not save the new location.');
    }
  };

  const handleRemoveLocation = async (locationId: string) => {
    if (!user) return;
    try {
      await removeSavedLocation(user.uid, locationId);
      await fetchSavedLocations(); // Re-fetch to update the list
    } catch (error) {
      console.error('Error removing location:', error);
      showError('Delete Error', 'Could not remove the location.');
    }
  };
  
  const availableLocations = allLocations.filter(
    (l) => !savedLocations.some((sl) => sl.id === l.id)
  );

  if (!user) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Location Settings</h3>
                <p className="text-sm text-muted-foreground">
                Please log in to manage your saved locations.
                </p>
            </div>
        </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Location Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your saved locations for quick access.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Saved Locations</CardTitle>
          <CardDescription>
            These locations appear on your dashboard for quick AQI checks.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : savedLocations.length > 0 ? (
            savedLocations.map((location) => (
              <div key={location.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>{location.city}, {location.state}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveLocation(location.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))
          ) : (
             <p className="text-sm text-muted-foreground text-center p-4">You have no saved locations yet.</p>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="w-full" variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Add New Location
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {availableLocations.map(location => (
                    <DropdownMenuItem key={location.id} onSelect={() => handleAddLocation(location.id)}>
                        {location.city}, {location.state}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </div>
  );
}
