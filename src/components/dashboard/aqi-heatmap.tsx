'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getAqiInfo } from "@/lib/aqi-helpers";
import type { LocationData } from "@/types";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from 'react';

interface AqiHeatmapProps {
  locations: LocationData[];
}

const cityCoordinates: { [key: string]: { x: string; y: string } } = {
  delhi: { x: '49%', y: '29%' },
  mumbai: { x: '29%', y: '53%' },
  bangalore: { x: '42%', y: '78%' },
  chennai: { x: '58%', y: '78%' },
};

const LocationPoint = ({ location }: { location: LocationData }) => {
    const [animationDuration, setAnimationDuration] = useState('4s');
    
    useEffect(() => {
        setAnimationDuration(`${2 + Math.random() * 2}s`);
    }, []);

    const coords = cityCoordinates[location.id];
    if (!coords) return null;

    const { category, color } = getAqiInfo(location.aqi);
    const radius = 4 + location.aqi / 25;

    return (
        <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
                <div
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: coords.x, top: coords.y }}
                    aria-label={`${location.city}: ${category} (AQI ${location.aqi})`}
                >
                    <div
                        className={cn(
                            'rounded-full animate-breathe cursor-pointer border-2 border-background/50',
                            color
                        )}
                        style={{ width: `${radius * 2}px`, height: `${radius * 2}px`, animationDuration }}
                    />
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p className="font-semibold">{location.city}</p>
                <p>AQI: <span className="font-bold">{location.aqi}</span> ({category})</p>
            </TooltipContent>
        </Tooltip>
    );
};

export function AqiHeatmap({ locations }: AqiHeatmapProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive AQI Heatmap</CardTitle>
        <CardDescription>
          Visualize real-time air quality across different regions. Hover over a point for details.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center p-6 min-h-[400px] lg:min-h-[500px]">
        <TooltipProvider>
          <div className="relative w-full h-full max-w-sm aspect-[4/5]">
            <svg
                viewBox="0 0 512 512"
                className="absolute inset-0 w-full h-full opacity-10"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="m241.2 24.8c-2.4-0.1-4.7-0.2-7.1-0.2-9.7 0-18.6 2.8-26 7.5-4.3 2.6-8.2 5.9-11.2 9.8-0.2 0.3-0.4 0.5-0.6 0.8-2.1 2.8-3.9 5.9-5.4 9.2-0.4 0.7-0.7 1.4-1.1 2.2-1.4 3.2-2.7 6.5-3.6 9.9-1.1 3.9-1.8 7.9-2.2 12-0.2 3.2-0.2 6.4-0.2 9.6 0 3.8 0.2 7.5 0.7 11.2 0.6 4.3 1.5 8.6 2.7 12.8 1.3 4.3 2.8 8.4 4.7 12.5 0.7 1.4 1.3 2.7 2 4 1.8 3.5 3.7 6.9 5.8 10.1 1.1 1.6 2.2 3.2 3.4 4.7 1.3 1.6 2.6 3.1 4 4.5 3.7 4.1 7.9 7.7 12.3 10.9 1.4 1 2.8 2 4.3 2.9 2 1.2 3.8 2.3 5.8 3.4 1.8 0.9 3.6 1.8 5.4 2.5 5.6 2.2 11.2 3.8 17 4.6 2.9 0.4 5.8 0.7 8.7 0.8 2 0.1 4 0.1 6 0.1 8.2 0 16-1.1 23.6-3.3 3.7-1.1 7.4-2.4 10.9-4 4-1.8 7.9-3.9 11.6-6.4 2.1-1.4 4.2-2.9 6.1-4.5 0.9-0.7 1.8-1.4 2.6-2.2 1.8-1.6 3.5-3.3 5.2-5.1 1.6-1.8 3.1-3.7 4.5-5.7 3.3-4.3 6.1-9 8.5-13.9 1.3-2.6 2.4-5.2 3.3-7.9 0.2-0.7 0.3-1.3 0.5-2 1-2.7 1.8-5.5 2.4-8.3 0.7-2.9 1.1-5.8 1.2-8.8 0-0.7 0.1-1.4 0.1-2.1-0.1-4.5-0.8-8.9-1.8-13.3-0.9-3.9-2.1-7.7-3.7-11.5-1.6-3.7-3.6-7.3-5.8-10.8-2.5-3.9-5.4-7.7-8.6-11-0.2-0.2-0.3-0.4-0.4-0.5-3.2-3.3-6.9-6.1-11-8.5-5.6-3.2-11.7-5.5-18.2-6.5-2.2-0.3-4.4-0.5-6.6-0.6z m-35.3 402.7c-3.2 2-6.5 3.8-9.8 5.4-7.2 3.4-14.7 6.1-22.3 8-7.9 1.9-16 2.9-24.1 2.9-7.9 0-15.7-0.9-23.2-2.7-7.3-1.7-14.4-4.2-21.2-7.4-6.8-3.2-13.2-7.1-19.2-11.7-5.9-4.5-11.4-9.6-16.3-15.3-4.9-5.7-9.2-11.8-12.7-18.4-3.5-6.6-6.2-13.5-7.9-20.8-1.7-7.2-2.5-14.6-2.2-22.1 0.2-7.3 1.5-14.5 3.8-21.4 2.2-6.8 5.4-13.2 9.4-19.1 4-5.8 8.8-11 14.1-15.5 5.3-4.4 11-8.1 17.1-10.9 6-2.7 12.3-4.5 18.7-5.4 6.3-0.9 12.7-0.8 18.9 0.1 6.2 0.9 12.2 2.8 18 5.6 5.7 2.7 11.2 6.3 16.3 10.5 5.1 4.2 9.7 9.1 13.8 14.5 4.1 5.4 7.6 11.2 10.4 17.4 2.8 6.2 4.9 12.7 6.1 19.4 1.2 6.7 1.5 13.5 0.9 20.3-0.6 6.7-2.1 13.3-4.6 19.5-2.5 6.2-5.9 12.1-10.1 17.5-4.2 5.4-9.1 10.2-14.6 14.4z"
                    fill="hsl(var(--primary))"
                />
            </svg>
            {locations.map((location) => (
                <LocationPoint key={location.id} location={location} />
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
