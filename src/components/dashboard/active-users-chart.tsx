
"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { month: "Jan", users: 186 },
  { month: "Feb", users: 305 },
  { month: "Mar", users: 237 },
  { month: "Apr", users: 273 },
  { month: "May", users: 209 },
  { month: "Jun", users: 214 },
];

const chartConfig = {
  users: {
    label: "Active Users",
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
                        dataKey="month"
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
                        dataKey="users"
                        fill="var(--color-users)"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    </div>
  )
}
