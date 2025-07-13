import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAqiInfo } from "@/lib/aqi-helpers";
import type { LocationData } from "@/types";
import { cn } from "@/lib/utils";
import { Info, ArrowRight } from 'lucide-react';
import Link from "next/link";

interface AqiCardProps {
  location: LocationData;
  onPollutantInfoClick: () => void;
  onSelect: () => void;
  isSelected: boolean;
}

export function AqiCard({ location, onPollutantInfoClick, onSelect, isSelected }: AqiCardProps) {
  const { category, color } = getAqiInfo(location.aqi);

  return (
      <Card
        onClick={onSelect}
        className={cn(
          "cursor-pointer transition-colors duration-200 h-full flex flex-col",
          isSelected ? "ring-2 ring-primary" : "border"
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
              <CardTitle className="text-base font-medium">{location.city}</CardTitle>
              <CardDescription className="text-xs">{location.state}</CardDescription>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); onPollutantInfoClick(); }}>
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Pollutant Information</span>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
              <Link href={`/location/${location.id}`}>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">View Details for {location.city}</span>
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center">
          <div className="text-5xl font-bold">{location.aqi}</div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
            <span>US AQI</span>
            <Badge className={cn("text-white text-xs", color)}>{category}</Badge>
          </div>
        </CardContent>
      </Card>
  );
}
