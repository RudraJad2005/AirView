
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/layout/auth-provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, AlertTriangle } from 'lucide-react';
import { getLocationsData } from '@/lib/data';
import { calculateDistance, cn } from '@/lib/utils';
import { getAqiInfo } from '@/lib/aqi-helpers';
import { Badge } from '../ui/badge';
import type { LocationData } from '@/types';

// Extend the Window interface to include the potential Android bridge
declare global {
  interface Window {
    Android?: {
      requestLocationPermission?: () => void;
    };
  }
}

export function CurrentLocationAqi() {
  const { user } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This function will now handle the entire location-finding process.
    const findLocation = () => {
      if (!user) {
        setStatus('success');
        return;
      }

      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser or device.");
        setStatus('error');
        return;
      }
      
      setStatus('loading');
      setError(null);

      // The core logic to get position, now in its own function.
      const getPosition = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const allLocations = getLocationsData();
            let closestLocation: LocationData | null = null;
            let minDistance = Infinity;

            for (const loc of allLocations) {
              const distance = calculateDistance(latitude, longitude, loc.lat, loc.lng);
              if (distance < minDistance) {
                minDistance = distance;
                closestLocation = loc;
              }
            }
            
            setLocation(closestLocation);
            setStatus('success');
          },
          (geoError) => {
            console.error("Geolocation error:", geoError);
            let errorMessage = "An unknown error occurred while trying to get your location.";
             switch(geoError.code) {
              case geoError.PERMISSION_DENIED:
                errorMessage = "Location access was denied. Please enable it in your browser or app settings to see local AQI.";
                break;
              case geoError.POSITION_UNAVAILABLE:
                errorMessage = "Location information is unavailable. Please try again later.";
                break;
              case geoError.TIMEOUT:
                errorMessage = "The request to get user location timed out. Please try again.";
                break;
            }
            setError(errorMessage);
            setStatus('error');
          },
          { timeout: 10000 }
        );
      }

      // --- JavaScript Bridge Logic ---
      // Check if the app is running in the Android WebView with the bridge
      if (typeof window !== 'undefined' && window.Android?.requestLocationPermission) {
        console.log("Android bridge detected. Requesting native location permission.");
        // Call the native permission function provided by the converter.
        // NOTE: The name 'requestLocationPermission' is an assumption.
        // You might need to change it to match your converter's API.
        window.Android.requestLocationPermission();

        // Give the native prompt a moment before calling the web API
        setTimeout(() => {
          getPosition();
        }, 1000);

      } else {
        // If no bridge, proceed with the standard web flow
        console.log("No Android bridge detected. Using standard web Geolocation.");
        getPosition();
      }
    };
    
    findLocation();
  }, [user]);

  if (!user) {
    return (
      <Card className="flex flex-col items-center justify-center text-center min-h-[250px] bg-muted/50">
        <CardHeader>
          <CardTitle>See Your Local Air Quality</CardTitle>
          <CardDescription>Log in to view the real-time AQI for your area.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/auth/login">Log In to Continue</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (status === 'loading') {
    return (
      <Card className="flex flex-col items-center justify-center text-center min-h-[250px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Getting your location...</p>
      </Card>
    );
  }

  if (status === 'error' || !location) {
    return (
      <Card className="flex flex-col items-center justify-center text-center min-h-[250px] border-destructive/50">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <p className="mt-4 text-destructive max-w-sm">{error || "Could not determine your location."}</p>
        <Button variant="secondary" className="mt-4" onClick={() => window.location.reload()}>Try Again</Button>
      </Card>
    );
  }

  const { category, color } = getAqiInfo(location.aqi);

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary"/>
            Your Nearest Station: {location.city}, {location.state}
        </CardTitle>
        <CardDescription>Real-time Air Quality Index based on your current location.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
            <p className="text-7xl font-bold">{location.aqi}</p>
            <p className="text-muted-foreground">US AQI</p>
        </div>
        <div className="flex flex-col items-center gap-2">
            <Badge className={cn("text-2xl px-6 py-2 text-white", color)}>{category}</Badge>
            <p className="text-sm text-muted-foreground mt-1">Main Pollutant: {location.mainPollutant}</p>
        </div>
        <Button asChild size="lg">
            <Link href={`/location/${location.id}`}>View Full Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
