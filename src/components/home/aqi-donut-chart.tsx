
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getLocationsData } from '@/lib/data';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { getAqiInfo } from '@/lib/aqi-helpers';
import { useMemo } from 'react';

const colorHexMap: Record<string, string> = {
  'bg-green-500': '#22c55e',
  'bg-yellow-500': '#eab308',
  'bg-orange-500': '#f97316',
  'bg-red-500': '#ef4444',
  'bg-purple-500': '#a855f7',
  'bg-red-900': '#7f1d1d',
};

const chartConfig = {
    Good: { label: 'Good' },
    Moderate: { label: 'Moderate' },
    'Unhealthy for Sensitive Groups': { label: 'Unhealthy (Sensitive)' },
    Unhealthy: { label: 'Unhealthy' },
    'Very Unhealthy': { label: 'Very Unhealthy' },
    Hazardous: { label: 'Hazardous' },
} satisfies ChartConfig;

export function AqiDonutChart() {
  const locations = getLocationsData();
  
  const chartData = useMemo(() => {
    const categoryCounts = locations.reduce((acc, loc) => {
        const { category } = getAqiInfo(loc.aqi);
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));
  }, [locations]);

  const totalCities = locations.length;

  return (
    <Card className="backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20 border-primary/20 hover:border-primary/50">
      <CardHeader>
        <CardTitle>National AQI Distribution</CardTitle>
        <CardDescription>
          Breakdown of air quality levels across all monitored cities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full">
            <ResponsiveContainer>
              <PieChart>
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={<ChartTooltipContent nameKey="name" />}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="60%"
                  strokeWidth={5}
                  labelLine={false}
                >
                  {chartData.map((entry) => {
                     const { color } = getAqiInfo(
                         entry.name === 'Good' ? 25 :
                         entry.name === 'Moderate' ? 75 :
                         entry.name === 'Unhealthy for Sensitive Groups' ? 125 :
                         entry.name === 'Unhealthy' ? 175 :
                         entry.name === 'Very Unhealthy' ? 250 : 350
                     );
                     return <Cell key={`cell-${entry.name}`} fill={colorHexMap[color]} className="focus:outline-none" />;
                  })}
                </Pie>
                {/* Center Label */}
                <foreignObject x="50%" y="50%" width="1" height="1" style={{ overflow: 'visible' }}>
                  <div style={{ transform: 'translate(-50%, -50%)' }} className="text-center">
                    <p className="text-4xl font-bold text-foreground">{totalCities}</p>
                    <p className="text-sm text-muted-foreground">Cities</p>
                  </div>
                </foreignObject>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
