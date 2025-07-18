
'use client';

import { getLocationsData } from "@/lib/data";
import { getAqiInfo } from "@/lib/aqi-helpers";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

export function CityOverview() {
    const locations = getLocationsData();
    const cityOverview = locations.slice(0, 5).map(location => {
        const { category, color } = getAqiInfo(location.aqi);
        return {
          name: `${location.city}, ${location.state}`,
          aqi: location.aqi,
          category,
          color,
        };
    });

    return (
        <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20 border-primary/20 hover:border-primary/50">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>City AQI Overview</CardTitle>
                    <CardDescription>A snapshot of key locations</CardDescription>
                </div>
                <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="uppercase text-muted-foreground/80 text-xs">City</TableHead>
                            <TableHead className="text-center uppercase text-muted-foreground/80 text-xs">Current AQI</TableHead>
                            <TableHead className="text-center uppercase text-muted-foreground/80 text-xs">Air Quality</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cityOverview.map(c => (
                            <TableRow key={c.name} className="hover:bg-muted/80">
                                <TableCell className="font-semibold">{c.name}</TableCell>
                                <TableCell className="text-center font-semibold">{c.aqi}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col items-center">
                                        <span className={cn("font-semibold", c.color.replace('bg-', 'text-'))}>{c.category}</span>
                                        <Progress value={c.aqi > 300 ? 100 : c.aqi / 3} className="h-1 w-full mt-1" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
