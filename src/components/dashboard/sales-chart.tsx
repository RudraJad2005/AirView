
"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { getLocationsData } from "@/lib/data"

const delhiData = getLocationsData().find(l => l.id === 'delhi')?.historical.map(h => ({
    date: h.date,
    aqi: h.aqi,
})) || [];


const chartConfig = {
  aqi: {
    label: "AQI",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function SalesChart() {
  return (
    <div className="h-[250px] w-full">
        <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer>
                <AreaChart
                    data={delhiData}
                    margin={{
                        left: -20,
                        right: 10,
                        top: 10,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-aqi)" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="var(--color-aqi)" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                    <XAxis
                        dataKey="date"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value, index) => index % 5 === 0 ? value : ''} // Show every 5th label
                    />
                    <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1.5 }}
                        content={<ChartTooltipContent />}
                    />
                    <Area
                        dataKey="aqi"
                        type="monotone"
                        stroke="var(--color-aqi)"
                        fillOpacity={1}
                        fill="url(#colorAqi)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </ChartContainer>
    </div>
  )
}
