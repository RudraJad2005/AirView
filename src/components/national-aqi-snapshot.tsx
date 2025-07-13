
'use client';

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getLocationsData } from '@/lib/data';
import { ChartTooltipContent } from '@/components/ui/chart';

export function NationalAqiSnapshot() {
  const locations = getLocationsData();

  // Get the 10 most polluted cities
  const mostPollutedCities = [...locations]
    .sort((a, b) => b.aqi - a.aqi)
    .slice(0, 10);

  const chartData = mostPollutedCities.map(location => {
    const pollutantsData: {[key: string]: number} = {};
    location.pollutants.forEach(p => {
        pollutantsData[p.name.replace('.', '')] = p.value; // recharts doesn't like dots in keys
    });
    return {
        name: location.city,
        aqi: location.aqi,
        ...pollutantsData
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>National AQI & Pollutant Snapshot</CardTitle>
        <CardDescription>
          AQI and key pollutant levels for the 10 most polluted major cities today.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-30} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="aqi" barSize={20} fill="hsl(var(--primary))" name="Overall AQI" />
                <Line type="monotone" dataKey="PM25" stroke="hsl(var(--chart-2))" name="PM2.5" />
                <Line type="monotone" dataKey="PM10" stroke="hsl(var(--chart-3))" name="PM10" />
                <Line type="monotone" dataKey="O3" stroke="hsl(var(--chart-4))" name="Ozone (O3)" />
              </ComposedChart>
            </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
