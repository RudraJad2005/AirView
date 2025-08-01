
"use client";

import { useState, useMemo } from 'react';
import type { LocationData } from '@/types';
import Select from 'react-select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LineChart as LineChartIcon, BarChart3, Table as TableIcon, ArrowUp, ArrowDown, Thermometer } from 'lucide-react';
import Link from 'next/link';
import { Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface HistoricalAnalysisClientProps {
  locations: LocationData[];
}

const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function HistoricalAnalysisClient({ locations }: HistoricalAnalysisClientProps) {
  const [selectedLocations, setSelectedLocations] = useState<LocationData[]>(locations.slice(0, 2));

  const locationOptions = locations.map(l => ({ value: l.id, label: `${l.city}, ${l.state}` }));

  const handleSelectChange = (selectedOptions: any) => {
    const selectedIds = selectedOptions.map((opt: any) => opt.value);
    const newSelectedLocations = locations.filter(l => selectedIds.includes(l.id));
    setSelectedLocations(newSelectedLocations);
  };

  const { chartData, chartConfig, summaryStats, overallStats } = useMemo(() => {
    const config: ChartConfig = {};
    selectedLocations.forEach((loc, index) => {
      config[loc.city] = {
        label: loc.city,
        color: chartColors[index % chartColors.length],
      };
    });

    if (!selectedLocations.length) {
      return { chartData: [], chartConfig: {}, summaryStats: [], overallStats: { avg: 0, min: 0, max: 0 } };
    }

    const data = selectedLocations[0].historical.map((_, dayIndex) => {
      const entry: { [key: string]: string | number } = {
        date: selectedLocations[0].historical[dayIndex].date,
      };
      selectedLocations.forEach(loc => {
        entry[loc.city] = loc.historical[dayIndex]?.aqi || 0;
      });
      return entry;
    });

    const allAqiValues: number[] = [];
    const stats = selectedLocations.map(loc => {
        const aqiValues = loc.historical.map(h => h.aqi);
        allAqiValues.push(...aqiValues);
        const sum = aqiValues.reduce((a, b) => a + b, 0);
        return {
            city: loc.city,
            avg: Math.round(sum / aqiValues.length) || 0,
            min: Math.min(...aqiValues),
            max: Math.max(...aqiValues)
        };
    });

    const overall = {
        avg: allAqiValues.length ? Math.round(allAqiValues.reduce((a, b) => a + b, 0) / allAqiValues.length) : 0,
        min: allAqiValues.length ? Math.min(...allAqiValues) : 0,
        max: allAqiValues.length ? Math.max(...allAqiValues) : 0,
    }

    return { chartData: data, chartConfig: config, summaryStats: stats, overallStats: overall };
  }, [selectedLocations]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start gap-4">
        <Link href="/analytics" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Analytics
        </Link>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Historical Data Analysis</h2>
      </div>

      <Card className="relative z-20 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20 border-primary/20 hover:border-primary/50">
        <CardHeader>
          <CardTitle>Compare Historical AQI</CardTitle>
          <CardDescription>Select multiple cities to compare their AQI trends over the last 30 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            isMulti
            options={locationOptions}
            defaultValue={locationOptions.slice(0,2)}
            onChange={handleSelectChange}
            className="text-sm"
            classNamePrefix="select"
            styles={{
                control: (base) => ({
                    ...base,
                    background: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--input))'
                }),
                menu: (base) => ({
                    ...base,
                    background: 'hsl(var(--background))',
                    zIndex: 50
                }),
                option: (base, state) => ({
                    ...base,
                    background: state.isFocused ? 'hsl(var(--accent))' : 'hsl(var(--card))',
                    color: 'hsl(var(--foreground))',
                }),
                multiValue: (base) => ({
                    ...base,
                    backgroundColor: 'hsl(var(--muted))'
                }),
                 multiValueLabel: (base) => ({
                    ...base,
                    color: 'hsl(var(--muted-foreground))'
                }),
            }}
          />
        </CardContent>
      </Card>

      <div className="relative z-10 grid gap-6 md:grid-cols-3">
        <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20 border-primary/20 hover:border-primary/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Highest AQI</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-tr from-primary to-primary/70">
              <ArrowUp className="h-5 w-5 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.max}</div>
            <p className="text-xs text-muted-foreground">across selected cities (30d)</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20 border-primary/20 hover:border-primary/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Lowest AQI</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-tr from-primary to-primary/70">
              <ArrowDown className="h-5 w-5 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.min}</div>
            <p className="text-xs text-muted-foreground">across selected cities (30d)</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20 border-primary/20 hover:border-primary/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Average AQI</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-tr from-primary to-primary/70">
              <Thermometer className="h-5 w-5 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.avg}</div>
            <p className="text-xs text-muted-foreground">across selected cities (30d)</p>
          </CardContent>
        </Card>
      </div>


      <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20 border-primary/20 hover:border-primary/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><LineChartIcon className="h-5 w-5" />AQI Trend Comparison</CardTitle>
          <CardDescription>Area chart showing the daily AQI fluctuations for the selected cities.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full pt-4">
            {selectedLocations.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-full w-full">
                <AreaChart data={chartData} margin={{ left: -10, right: 20 }}>
                  <defs>
                    {Object.keys(chartConfig).map(city => (
                      <linearGradient key={`color-${city}`} id={`color-${city}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartConfig[city].color} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={chartConfig[city].color} stopOpacity={0.1}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid vertical={false} stroke="hsl(var(--muted))" strokeDasharray="3 3"/>
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `${value}`} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip content={<ChartTooltipContent indicator="line" />} cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1.5 }} />
                  <Legend />
                  {Object.keys(chartConfig).map(city => (
                     <Area 
                        key={city} 
                        dataKey={city} 
                        type="monotone" 
                        stroke={chartConfig[city].color}
                        fill={`url(#color-${city})`}
                        strokeWidth={2} 
                        dot={false} 
                      />
                  ))}
                </AreaChart>
              </ChartContainer>
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed bg-muted/50">
                <p className="text-muted-foreground">Select one or more cities to see the trend chart.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

       <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20 border-primary/20 hover:border-primary/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><TableIcon className="h-5 w-5" />Summary Statistics</CardTitle>
          <CardDescription>Key AQI metrics for the selected cities over the 30-day period.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>City</TableHead>
                        <TableHead className="text-right">Average AQI</TableHead>
                        <TableHead className="text-right">Min AQI</TableHead>
                        <TableHead className="text-right">Max AQI</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {summaryStats.map(stat => (
                        <TableRow key={stat.city} className="hover:bg-muted/80">
                            <TableCell className="font-medium">{stat.city}</TableCell>
                            <TableCell className="text-right">{stat.avg}</TableCell>
                            <TableCell className="text-right text-green-400">{stat.min}</TableCell>
                            <TableCell className="text-right text-red-400">{stat.max}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>

    </div>
  );
}
