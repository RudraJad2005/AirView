
'use client';

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getLocationsData } from '@/lib/data';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  aqi: {
    label: 'Overall AQI',
    color: 'hsl(var(--primary))',
  },
  PM25: {
    label: 'PM2.5',
    color: 'hsl(var(--chart-2))',
  },
  PM10: {
    label: 'PM10',
    color: 'hsl(var(--chart-3))',
  },
  O3: {
    label: 'Ozone (O3)',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export function NationalAqiSnapshot() {
  const locations = getLocationsData();

  const mostPollutedCities = [...locations]
    .sort((a, b) => b.aqi - a.aqi)
    .slice(0, 10);

  const chartData = mostPollutedCities.map(location => {
    const pollutantsData: {[key: string]: number} = {};
    location.pollutants.forEach(p => {
        // recharts dataKeys can't have dots
        pollutantsData[p.name.replace('.', '')] = p.value;
    });
    return {
        name: location.city,
        aqi: location.aqi,
        ...pollutantsData
    }
  }).reverse(); // Reverse to show highest on the right

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
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer>
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
                <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-30} textAnchor="end" height={70} interval={0} />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="aqi" barSize={20} fill="var(--color-aqi)" radius={[4, 4, 0, 0]} />
                <Area type="monotone" dataKey="PM25" fill="var(--color-PM25)" stroke="var(--color-PM25)" fillOpacity={0.4} />
                <Line type="monotone" dataKey="PM10" stroke="var(--color-PM10)" strokeWidth={2} />
                <Line type="monotone" dataKey="O3" stroke="var(--color-O3)" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
