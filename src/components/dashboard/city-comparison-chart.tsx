
"use client"

import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { LocationData } from "@/types";

interface CityComparisonChartProps {
  locations: LocationData[];
}

const chartColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
];

export function CityComparisonChart({ locations }: CityComparisonChartProps) {
  const { chartData, chartConfig } = useMemo(() => {
    const config: ChartConfig = {};
    locations.forEach((loc, index) => {
      config[loc.city] = {
        label: loc.city,
        color: chartColors[index % chartColors.length],
      };
    });

    if (!locations.length) {
      return { chartData: [], chartConfig: {} };
    }

    // Assuming all locations have historical data for the same dates
    const data = locations[0].historical.map((_, dayIndex) => {
      const entry: { [key: string]: string | number } = {
        date: locations[0].historical[dayIndex].date,
      };
      locations.forEach(loc => {
        entry[loc.city] = loc.historical[dayIndex]?.aqi || 0;
      });
      return entry;
    });

    return { chartData: data, chartConfig: config };
  }, [locations]);

  return (
    <div className="h-[400px] w-full pt-4">
      {locations.length > 0 ? (
        <ChartContainer config={chartConfig} className="h-full w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Legend />
            {Object.keys(chartConfig).map(city => (
              <Line
                key={city}
                dataKey={city}
                type="monotone"
                stroke={`var(--color-${city})`}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      ) : (
         <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed bg-muted/50">
            <p className="text-muted-foreground">Add a city to start the comparison.</p>
         </div>
      )}
    </div>
  )
}
