
"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { getLocationsData } from "@/lib/data"

const locations = getLocationsData();
const chartData = [
    { city: "Delhi", aqi: locations.find(l => l.id === 'delhi')?.aqi || 0 },
    { city: "Mumbai", aqi: locations.find(l => l.id === 'mumbai')?.aqi || 0 },
    { city: "Bengaluru", aqi: locations.find(l => l.id === 'bangalore')?.aqi || 0 },
    { city: "Kolkata", aqi: locations.find(l => l.id === 'kolkata')?.aqi || 0 },
    { city: "Chennai", aqi: locations.find(l => l.id === 'chennai')?.aqi || 0 },
    { city: "Lucknow", aqi: locations.find(l => l.id === 'lucknow')?.aqi || 0 },
]

const chartConfig = {
  aqi: {
    label: "AQI",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function ActiveUsersChart() {
  return (
    <div className="h-[250px] w-full">
        <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer>
                <BarChart
                    data={chartData}
                    margin={{
                        left: -20,
                        right: 10,
                        top: 10,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                    <XAxis
                        dataKey="city"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        cursor={{ fill: "hsl(var(--muted))" }}
                        content={<ChartTooltipContent />}
                    />
                    <Bar
                        dataKey="aqi"
                        fill="var(--color-aqi)"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    </div>
  )
}
