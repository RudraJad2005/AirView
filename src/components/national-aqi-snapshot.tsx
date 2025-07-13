
'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getLocationsData } from '@/lib/data';
import { getAqiInfo } from '@/lib/aqi-helpers';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { category } = getAqiInfo(payload[0].value);
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <p className="font-bold">{`${label}`}</p>
        <p className="text-sm text-muted-foreground">{`AQI: ${payload[0].value} (${category})`}</p>
      </div>
    );
  }
  return null;
};

export function NationalAqiSnapshot() {
  const locations = getLocationsData();

  // Get the 10 most polluted cities
  const mostPollutedCities = [...locations]
    .sort((a, b) => b.aqi - a.aqi)
    .slice(0, 10)
    .reverse(); // Reverse for ascending order in chart display

  const chartData = mostPollutedCities.map(location => ({
    name: location.city,
    aqi: location.aqi,
  }));
  
  const getFillColor = (aqi: number) => {
    const { color } = getAqiInfo(aqi);
    // The helper returns a tailwind class like `bg-green-500`. We need the hex code or HSL value.
    // For simplicity, let's map the colors directly here.
    if (aqi <= 50) return '#22c55e'; // green-500
    if (aqi <= 100) return '#eab308'; // yellow-500
    if (aqi <= 150) return '#f97316'; // orange-500
    if (aqi <= 200) return '#ef4444'; // red-500
    if (aqi <= 300) return '#a855f7'; // purple-500
    return '#7f1d1d'; // red-900 (for Hazardous)
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>National AQI Snapshot</CardTitle>
        <CardDescription>
          Air quality across the 10 most polluted major cities today.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={chartData}
                margin={{
                  top: 5,
                  right: 20,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 'dataMax + 50']} />
                <YAxis dataKey="name" type="category" width={80} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--muted))'}}/>
                <Bar dataKey="aqi" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getFillColor(entry.aqi)} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
