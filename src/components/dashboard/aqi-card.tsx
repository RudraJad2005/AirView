import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAqiInfo } from "@/lib/aqi-helpers";
import type { LocationData } from "@/types";
import { cn } from "@/lib/utils";
import { Info } from 'lucide-react';
import Link from "next/link";

interface AqiCardProps {
  location: LocationData;
  onPollutantInfoClick: () => void;
}

export function AqiCard({ location, onPollutantInfoClick }: AqiCardProps) {
  const { category, color } = getAqiInfo(location.aqi);

  return (
    <Link href={`/location/${location.id}`} className="block">
      <Card
        className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 h-full"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
              <CardTitle className="text-sm font-medium">{location.city}</CardTitle>
              <CardDescription>{location.state}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPollutantInfoClick(); }}>
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Pollutant Information</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold">{location.aqi}</div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
            <span>US AQI</span>
            <Badge className={cn("text-white", color)}>{category}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
