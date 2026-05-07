"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChart3,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

import { mockData } from "@/lib/mock-data";

const data = mockData.chartData;
const stats = mockData.stats.map(s => ({
  ...s,
  icon: s.title.includes("Campaigns") ? Calendar : 
        s.title.includes("Revenue") ? DollarSign : 
        s.title.includes("Spend") ? BarChart3 : TrendingUp
}));

const influencers = mockData.influencers.map(i => ({
  name: i.name,
  handle: i.handle,
  revenue: i.revenue,
  roas: i.roas,
  status: i.status
}));

export default function DashboardPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h2>
          <p className="text-slate-500 font-medium mt-1">
            Welcome back! Here's a snapshot of your campaign performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 rounded-xl px-4 border-slate-200 bg-white font-bold text-sm shadow-sm hover:bg-slate-50 transition-all">
            <Calendar className="mr-2 h-4 w-4 text-slate-400" />
            Last 30 Days
          </Button>
          <Button className="h-11 rounded-xl px-6 bg-primary hover:bg-indigo-700 font-bold text-sm shadow-lg shadow-primary/20 transition-all">
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden bg-white hover:translate-y-[-4px] transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-8 pt-8">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">{stat.title}</CardTitle>
              <div className="p-2.5 rounded-2xl bg-slate-50 group-hover:bg-primary/10 transition-colors">
                <stat.icon className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</div>
              <div className="flex items-center pt-2">
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  stat.trend === "up" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"
                }`}>
                  {stat.trend === "up" ? <ArrowUpIcon className="h-2.5 w-2.5" /> : <ArrowDownIcon className="h-2.5 w-2.5" />}
                  {stat.description.split(" ")[0]}
                </div>
                <span className="text-[10px] font-bold text-slate-400 ml-2 uppercase tracking-wider">vs Last Month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-none shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden bg-white">
          <CardHeader className="px-8 pt-8 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Revenue Analytics</CardTitle>
                <CardDescription className="font-medium">Comparing marketing spend and generated revenue.</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-xs font-bold text-slate-500">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary/30" />
                  <span className="text-xs font-bold text-slate-500">Spend</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-8">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    fontSize={12}
                    fontWeight={600}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={12}
                    fontWeight={600}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{ 
                      borderRadius: "16px", 
                      border: "none", 
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      padding: "12px"
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="hsl(var(--primary))"
                    radius={[6, 6, 0, 0]}
                    barSize={40}
                  />
                  <Bar
                    dataKey="spend"
                    fill="hsl(var(--primary) / 0.2)"
                    radius={[6, 6, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 border-none shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden bg-white">
          <CardHeader className="px-8 pt-8 pb-4">
            <CardTitle className="text-xl font-bold">Top Performing KOLs</CardTitle>
            <CardDescription className="font-medium">
              Influencers with the highest ROI this month.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="py-4 px-8 text-xs font-bold uppercase tracking-wider text-slate-400">Influencer</TableHead>
                  <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-400">Revenue</TableHead>
                  <TableHead className="text-right px-8 text-xs font-bold uppercase tracking-wider text-slate-400">ROAS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {influencers.map((item) => (
                  <TableRow key={item.handle} className="border-slate-100 group hover:bg-slate-50/50 transition-colors">
                    <TableCell className="py-4 px-8">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 group-hover:text-primary transition-colors">{item.name}</span>
                        <span className="text-[10px] font-bold text-slate-400 tracking-tight">{item.handle}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-slate-700">{item.revenue}</TableCell>
                    <TableCell className="text-right px-8">
                      <Badge variant="outline" className={`rounded-full px-2.5 py-0.5 font-bold ${
                        parseFloat(item.roas) > 4 ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-blue-600 border-blue-100"
                      }`}>
                        {item.roas}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-6 text-center">
              <Button variant="ghost" className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">
                View All Influencers
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
