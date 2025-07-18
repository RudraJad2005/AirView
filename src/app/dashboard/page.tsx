
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Leaf, Thermometer, MapPin, BarChart2, MoreHorizontal, ArrowUp, ArrowDown } from "lucide-react";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { ActiveUsersChart } from "@/components/dashboard/active-users-chart";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getLocationsData } from "@/lib/data";
import { getAqiInfo } from "@/lib/aqi-helpers";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const locations = getLocationsData();
  const aqiValues = locations.map(l => l.aqi);
  const highestAqi = Math.max(...aqiValues);
  const lowestAqi = Math.min(...aqiValues);
  const averageAqi = Math.round(aqiValues.reduce((a, b) => a + b, 0) / aqiValues.length);
  const highestAqiLocation = locations.find(l => l.aqi === highestAqi);
  const lowestAqiLocation = locations.find(l => l.aqi === lowestAqi);

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
    <div className="flex-1 space-y-6">
      {/* Top Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Highest AQI Today</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-tr from-primary to-primary/70">
                <ArrowUp className="h-5 w-5 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highestAqi}</div>
            <p className="text-xs text-muted-foreground">
              in {highestAqiLocation?.city}
            </p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lowest AQI Today</CardTitle>
             <div className="p-2 rounded-lg bg-gradient-to-tr from-primary to-primary/70">
                <ArrowDown className="h-5 w-5 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowestAqi}</div>
            <p className="text-xs text-muted-foreground">
              in {lowestAqiLocation?.city}
            </p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average AQI</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-tr from-primary to-primary/70">
                <Thermometer className="h-5 w-5 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageAqi}</div>
            <p className="text-xs text-muted-foreground">
              across all cities
            </p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monitored Locations</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-tr from-primary to-primary/70">
                <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locations.length}</div>
            <p className="text-xs text-muted-foreground">
              cities across India
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20">
             <CardHeader>
                <CardTitle>BreatheEasy India</CardTitle>
                <CardDescription>Your personal air quality companion.</CardDescription>
             </CardHeader>
             <CardContent>
                <p className="text-4xl font-bold">Stay Informed, Stay Healthy</p>
             </CardContent>
             <Image 
                src="https://placehold.co/600x400.png"
                alt="Clean environment"
                width={300}
                height={200}
                data-ai-hint="sky clouds"
                className="absolute right-0 bottom-0 opacity-80"
             />
          </Card>
          <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20">
            <CardHeader>
              <CardTitle>Historical AQI Trend (Delhi)</CardTitle>
              <CardDescription>
                <span className="text-green-500"><ArrowDown className="inline-block h-4 w-4" /> 4% less</span> pollution than last month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SalesChart />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20">
            <CardHeader>
              <CardTitle>City AQI Comparison</CardTitle>
              <CardDescription>(+23) than last week average</CardDescription>
            </CardHeader>
            <CardContent>
              <ActiveUsersChart />
            </CardContent>
          </Card>
        </div>
      </div>
      
       <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20">
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
    </div>
  );
}
