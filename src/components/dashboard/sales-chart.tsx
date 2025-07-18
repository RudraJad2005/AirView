
"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { month: "Jan", sales: 186 },
  { month: "Feb", sales: 305 },
  { month: "Mar", sales: 237 },
  { month: "Apr", sales: 273 },
  { month: "May", sales: 209 },
  { month: "Jun", sales: 214 },
  { month: "Jul", sales: 345 },
  { month: "Aug", sales: 421 },
  { month: "Sep", sales: 349 },
  { month: "Oct", sales: 452 },
  { month: "Nov", sales: 389 },
  { month: "Dec", sales: 473 },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function SalesChart() {
  return (
    <div className="h-[250px] w-full">
        <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer>
                <AreaChart
                    data={chartData}
                    margin={{
                        left: -20,
                        right: 10,
                        top: 10,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
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
                        cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1.5 }}
                        content={<ChartTooltipContent />}
                    />
                    <Area
                        dataKey="sales"
                        type="monotone"
                        stroke="var(--color-sales)"
                        fillOpacity={1}
                        fill="url(#colorSales)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </ChartContainer>
    </div>
  )
}
