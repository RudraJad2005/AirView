
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/layout/auth-provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, AlertTriangle, BadgeHelp } from 'lucide-react';
import { getLocationsData } from '@/lib/data';
import { calculateDistance, cn } from '@/lib/utils';
import { getAqiInfo } from '@/lib/aqi-helpers';
import { Badge } from '../ui/badge';
import type { LocationData } from '@/types';

export function CurrentLocationAqi() {
  const { user } = useAuth();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setStatus('idle');
      return;
    }

    if ('geolocation' in navigator) {
      setStatus('loading');
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
        (error) => {
          console.error("Geolocation error:", error);
          setError("Permission to access location was denied. Please enable it in your browser settings to see local AQI.");
          setStatus('error');
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setStatus('error');
    }
  }, [user]);

  if (!user) {
    return (
      <Card className="flex flex-col items-center justify-center text-center min-h-[250px] bg-muted/50">
        <CardHeader>
          <CardTitle>See Your Local Air Quality</CardTitle>
          <CardDescription>Log in and grant location access to view the real-time AQI for your area.</CardDescription>
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
        <p className="mt-4 text-destructive">{error || "Could not determine your location."}</p>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">{error ? "" : "We couldn't find a monitoring station near you. Please check the dashboard for other cities."}</p>
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
