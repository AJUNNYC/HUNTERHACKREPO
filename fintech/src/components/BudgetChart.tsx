"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
} from "recharts";

interface BudgetChartProps {
  monthlyData: Array<{
    month: number;
    savings: number;
    income: number;
    expenses: number;
  }>;
  expensesBreakdown: Array<{ category: string; amount: number }>;
}

export default function BudgetChart({ monthlyData, expensesBreakdown }: BudgetChartProps) {
  const [activeTab, setActiveTab] = useState("savings");

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  const COLORS = [
    "#22c55e", "#16a34a", "#15803d", "#166534", "#14532d",
    "#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d",
  ];

  return (
    <div className="w-full space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
          <TabsTrigger value="savings" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
            Savings Projection
          </TabsTrigger>
          <TabsTrigger value="expenses" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
            Expenses Breakdown
          </TabsTrigger>
        </TabsList>

        <TabsContent value="savings" className="mt-4">
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" label={{ value: "Months", position: "insideBottomRight", offset: -10, fill: "#888" }} />
                <YAxis
                  stroke="#888"
                  tickFormatter={formatCurrency}
                  label={{ value: "Amount ($)", position: "insideLeft", angle: -90, fill: "#888" }}
                />
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]} contentStyle={{ backgroundColor: "#222", border: "1px solid #333", color: "#fff" }} />
                <Legend />
                <Line type="monotone" dataKey="income" name="Cumulative Income" stroke="#4ade80" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: "#4ade80" }} />
                <Line type="monotone" dataKey="expenses" name="Cumulative Expenses" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: "#ef4444" }} />
                <Line type="monotone" dataKey="savings" name="Cumulative Savings" stroke="#22c55e" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: "#22c55e" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="mt-4">
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="amount"
                  nameKey="category"
                >
                  {expensesBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]} contentStyle={{ backgroundColor: "#222", border: "1px solid #333", color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
