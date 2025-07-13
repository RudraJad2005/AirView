
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
  const [containerRef, { width }] = ResizeObserver();

  return (
    <div 
      ref={containerRef}
      className="w-full h-[250px] md:h-[300px] min-w-[300px] overflow-hidden"
    >
      <ChartContainer config={chartConfig} className="h-full w-full">
        {width && (
          <LineChart
            accessibilityLayer
            data={data}
            width={width}
            height={300} // Fixed height works with responsive width
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={width < 400 ? 3 : 1} // Dynamic interval based on width
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
              dot={width > 400} // Only show dots on larger screens
            />
          </LineChart>
        )}
      </ChartContainer>
    </div>
  );
}

