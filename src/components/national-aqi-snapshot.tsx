'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getLocationsData } from '@/lib/data';
import type { LocationData } from '@/types';
import { getAqiInfo } from '@/lib/aqi-helpers';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, MapPin } from 'lucide-react';
import Link from 'next/link';

export function NationalAqiSnapshot() {
  const locations = getLocationsData();

  const sortedByAqi = [...locations].sort((a, b) => a.aqi - b.aqi);
  const cleanestCities = sortedByAqi.slice(0, 5);
  const mostPollutedCities = sortedByAqi.slice(-5).reverse();

  const CityListItem = ({ location }: { location: LocationData }) => {
    const { textColor } = getAqiInfo(location.aqi);
    return (
      <li className="flex items-center justify-between py-2 border-b last:border-b-0">
        <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div>
                <Link href={`/location/${location.id}`} className="font-medium hover:underline">{location.city}</Link>
                <p className="text-xs text-muted-foreground">{location.state}</p>
            </div>
        </div>
        <div className={cn("font-bold text-lg", textColor)}>{location.aqi}</div>
      </li>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>National AQI Snapshot</CardTitle>
        <CardDescription>
          A glimpse of air quality across major Indian cities today.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <TrendingDown className="h-5 w-5 text-green-500" />
            Cleanest Cities
          </h3>
          <ul className="space-y-2">
            {cleanestCities.map((location) => (
              <CityListItem key={location.id} location={location} />
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-red-500" />
            Most Polluted Cities
          </h3>
          <ul className="space-y-2">
            {mostPollutedCities.map((location) => (
              <CityListItem key={location.id} location={location} />
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
