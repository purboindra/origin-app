"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#00E096",
  },
  mobile: {
    label: "Mobile",
    color: "#0095FF",
  },
} satisfies ChartConfig;

export function TotalIncome() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[50px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#E5E7EB"
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={16}
          tickFormatter={(value) => `${value}jt`}
          style={{ fill: "#94A3B8", fontSize: 12, fontWeight: 500 }}
        />

        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />

        <Bar
          dataKey="desktop"
          fill="var(--color-desktop)"
          radius={4}
          barSize={20}
        />
        <Bar
          dataKey="mobile"
          fill="var(--color-mobile)"
          radius={4}
          barSize={20}
        />
      </BarChart>
    </ChartContainer>
  );
}
