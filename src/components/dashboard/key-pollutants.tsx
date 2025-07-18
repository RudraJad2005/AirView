
"use client"

import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Atom } from "lucide-react"
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import type { LocationData } from "@/types"

const chartColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-1))", // Re-using colors for simplicity
];

interface KeyPollutantsProps {
  pollutants: LocationData['pollutants'];
}

export function KeyPollutants({ pollutants }: KeyPollutantsProps) {
  const chartConfig = {
      pollutants: {
          label: "Pollutants",
      },
      ...pollutants.reduce((acc, p) => {
          acc[p.name] = { label: p.name };
          return acc;
      }, {} as any)
  } satisfies ChartConfig;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Atom className="h-5 w-5" />
          Key Pollutants
        </CardTitle>
        <CardDescription>
          Concentration of major pollutants in the air.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-full w-full max-w-[250px]"
        >
          <ResponsiveContainer>
              <PieChart>
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={pollutants}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  {pollutants.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
              </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
