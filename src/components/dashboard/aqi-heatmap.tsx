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
  delhi: { x: '50%', y: '25%' },
  mumbai: { x: '25%', y: '55%' },
  bangalore: { x: '45%', y: '80%' },
  chennai: { x: '58%', y: '82%' },
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
      <CardContent className="flex justify-center items-center p-6 min-h-[300px] lg:min-h-[400px]">
        <TooltipProvider>
          <div className="relative w-full h-full max-w-sm aspect-square bg-muted/20 rounded-lg">
             <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
                 <path d="M50 0 L100 25 L85 90 L15 90 L0 25 Z" fill="hsl(var(--primary))" />
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
