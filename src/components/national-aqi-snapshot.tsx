
'use client';

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getLocationsData } from '@/lib/data';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

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
        const key = p.name.replace('.', '');
        if (Object.keys(chartConfig).includes(key)) {
            pollutantsData[key] = p.value;
        }
    });
    return {
        name: location.city,
        ...pollutantsData
    }
  }).reverse();

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
                layout="vertical"
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  bottom: 10,
                  left: 30,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  width={80}
                  interval={0}
                />
                <XAxis dataKey="value" type="number" hide />
                <ChartTooltip
                    cursor={{fill: 'hsl(var(--muted))'}}
                    content={<ChartTooltipContent />}
                />
                <Legend />
                <Bar dataKey="PM25" fill="var(--color-PM25)" radius={4} />
                <Bar dataKey="PM10" fill="var(--color-PM10)" radius={4} />
                <Bar dataKey="O3" fill="var(--color-O3)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
