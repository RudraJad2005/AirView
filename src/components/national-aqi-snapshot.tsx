
'use client';

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getLocationsData } from '@/lib/data';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  PM25: {
    label: 'PM2.5',
    color: 'hsl(var(--chart-1))',
  },
  PM10: {
    label: 'PM10',
    color: 'hsl(var(--chart-2))',
  },
  O3: {
    label: 'Ozone (O3)',
    color: 'hsl(var(--chart-3))',
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
        // recharts dataKeys can't have dots, e.g. PM2.5 -> PM25
        const key = p.name.replace('.', '');
        pollutantsData[key] = p.value;
    });
    return {
        name: location.city,
        ...pollutantsData
    }
  }).reverse(); // Reverse to show highest on the left/top in a horizontal bar chart

  return (
    <Card>
      <CardHeader>
        <CardTitle>National Pollutant Snapshot</CardTitle>
        <CardDescription>
          Key pollutant concentrations for the 10 cities with the highest AQI today.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[450px] w-full">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer>
              <BarChart
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
                <Bar dataKey="PM25" fill="var(--color-PM25)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="PM10" fill="var(--color-PM10)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="O3" fill="var(--color-O3)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
