
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getLocationsData } from '@/lib/data';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { getAqiInfo } from '@/lib/aqi-helpers';

const chartConfig = {
  aqi: {
    label: 'AQI',
  },
} satisfies ChartConfig;

// Map Tailwind colors to hex for Recharts
const colorHexMap: Record<string, string> = {
  'bg-green-500': '#22c55e',
  'bg-yellow-500': '#eab308',
  'bg-orange-500': '#f97316',
  'bg-red-500': '#ef4444',
  'bg-purple-500': '#8b5cf6',
  'bg-red-900': '#7f1d1d',
};

export function NationalAqiSnapshot() {
  const locations = getLocationsData();
  const top10Locations = locations
    .sort((a, b) => b.aqi - a.aqi)
    .slice(0, 10)
    .reverse(); // reverse for correct order in horizontal chart

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Highest AQI Cities</CardTitle>
        <CardDescription>
          A snapshot of the most polluted cities currently being monitored.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[450px] w-full">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer>
              <BarChart
                data={top10Locations}
                layout="vertical"
                margin={{ left: 20, right: 20 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="city"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  width={80}
                />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="aqi" radius={5}>
                  {top10Locations.map((entry) => {
                     const { color } = getAqiInfo(entry.aqi);
                     return <Cell key={`cell-${entry.id}`} fill={colorHexMap[color]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
