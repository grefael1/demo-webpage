"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#a855f7", "#f59e0b", "#94a3b8"];

type Props = { data: { name: string; value: number }[] };

export function AllocationChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          stroke="#0a0a0a"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#141414",
            border: "1px solid #262626",
            borderRadius: "8px",
            color: "#fafafa",
          }}
          formatter={(v: number) => `$${v.toLocaleString()}`}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
