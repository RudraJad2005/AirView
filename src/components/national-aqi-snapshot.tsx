
'use client';

import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from 'recharts';
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>National AQI Overview</CardTitle>
        <CardDescription>
          A snapshot of current AQI levels across major Indian cities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[450px] w-full">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer>
              <PieChart>
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={<ChartTooltipContent nameKey="city" hideLabel />}
                />
                <Pie
                  data={locations}
                  dataKey="aqi"
                  nameKey="city"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    // Only show label if the slice is large enough
                    if ((percent * 100) > 5) {
                      return (
                        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                          {locations[index].city}
                        </text>
                      );
                    }
                    return null;
                  }}
                >
                  {locations.map((entry, index) => {
                    const { color } = getAqiInfo(entry.aqi);
                    return <Cell key={`cell-${index}`} fill={colorHexMap[color]} />;
                  })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
