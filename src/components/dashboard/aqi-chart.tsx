
"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ResponsiveContainer } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

interface AqiChartProps {
  data: { date: string; aqi: number }[];
}

const chartConfig = {
  aqi: {
    label: "AQI",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function AqiChart({ data }: AqiChartProps) {
  return (
    <div className="w-full h-[250px] md:h-[300px]">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ResponsiveContainer>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -10,
              bottom: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={4}
              domain={['dataMin - 20', 'dataMax + 20']}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="aqi"
              type="monotone"
              stroke="var(--color-aqi)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
