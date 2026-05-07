"use client";

import {
  TrendingUp,
  TrendingDown,
  Trophy,
  AlertTriangle,
  Target,
  DollarSign,
  PieChart as PieChartIcon,
} from "lucide-react";
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
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

// Mock Data for Analytics
const platformData = [
  { name: "Instagram", revenue: 45000, spend: 12000, conversion: 4.5 },
  { name: "TikTok", revenue: 65000, spend: 15000, conversion: 6.8 },
  { name: "YouTube", revenue: 35000, spend: 8000, conversion: 3.2 },
];

const COLORS = ["#0ea5e9", "#10b981", "#f43f5e"]; // Tailwind primary blue, emerald, rose

const budgetEfficiencyData = [
  { month: "Jan", revenue: 4000, spend: 2400, cpa: 12 },
  { month: "Feb", revenue: 3000, spend: 1398, cpa: 15 },
  { month: "Mar", revenue: 9000, spend: 3800, cpa: 8 },
  { month: "Apr", revenue: 12780, spend: 3908, cpa: 7 },
  { month: "May", revenue: 18900, spend: 4800, cpa: 5 },
  { month: "Jun", revenue: 23900, spend: 3800, cpa: 4 },
];

const influencerLeaderboard = [
  { rank: 1, name: "Aisha Bakrie", platform: "TikTok", revenue: "$28,500", roas: "6.8x", trend: "up" },
  { rank: 2, name: "Sarah Johnson", platform: "Instagram", revenue: "$15,200", roas: "4.2x", trend: "up" },
  { rank: 3, name: "Mark Tuan", platform: "YouTube", revenue: "$12,400", roas: "3.5x", trend: "down" },
  { rank: 4, name: "David Chen", platform: "Instagram", revenue: "$8,500", roas: "2.8x", trend: "up" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Advanced Analytics</h2>
        <p className="text-muted-foreground">
          Deep dive into platform performance, campaign profitability, and influencer ROI.
        </p>
      </div>

      {/* 5. Performance Insights Widgets */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Campaign</CardTitle>
            <Trophy className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Ramadan Flash Sale</div>
            <p className="text-xs text-muted-foreground mt-1 text-emerald-600 font-medium">
              4.5x ROAS • $45k Profit
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Influencer</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">@aisha_cooking</div>
            <p className="text-xs text-muted-foreground mt-1">
              $28.5k Revenue Generated
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Platform</CardTitle>
            <PieChartIcon className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">TikTok</div>
            <p className="text-xs text-muted-foreground mt-1">
              6.8% Avg Conversion Rate
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attention Needed</CardTitle>
            <AlertTriangle className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">8.8 Mega Campaign</div>
            <p className="text-xs text-muted-foreground mt-1 text-rose-500 font-medium">
              0.8x ROAS • Underperforming
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* 2. Platform Comparison */}
        <Card className="col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Platform Revenue Share</CardTitle>
            <CardDescription>Distribution of revenue across platforms</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="revenue"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full mt-4 text-center">
              {platformData.map((p) => (
                <div key={p.name}>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{p.name}</p>
                  <p className="text-sm font-bold mt-1">{p.conversion}% CVR</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 4. Budget Efficiency */}
        <Card className="col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Budget Efficiency & CPA Trend</CardTitle>
            <CardDescription>Tracking Revenue vs Cost Per Acquisition over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={budgetEfficiencyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                  <YAxis yAxisId="right" orientation="right" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Revenue" />
                  <Line yAxisId="right" type="monotone" dataKey="cpa" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} name="Cost Per Acquisition (CPA)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* 1. Influencer Ranking */}
        <Card className="col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Influencer Leaderboard</CardTitle>
            <CardDescription>Top performing influencers by ROAS and Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100">
                  <TableHead className="w-[50px] text-center">Rank</TableHead>
                  <TableHead>Influencer</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">ROAS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {influencerLeaderboard.map((inf) => (
                  <TableRow key={inf.rank} className="border-slate-100">
                    <TableCell className="text-center font-bold text-slate-400">
                      #{inf.rank}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">{inf.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                        {inf.platform}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{inf.revenue}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-bold">{inf.roas}</span>
                        {inf.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-rose-500" />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 3. Campaign Profitability Summary */}
        <Card className="col-span-3 border-none shadow-sm bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="text-white">Overall Profitability</CardTitle>
            <CardDescription className="text-slate-400">Aggregated YTD Performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total Revenue Generated</span>
                <span className="font-bold">$145,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total Marketing Spend</span>
                <span className="font-bold text-rose-400">-$35,000</span>
              </div>
              <div className="h-px bg-slate-800 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-300">Net Profit</span>
                <span className="text-2xl font-bold text-emerald-400">$110,000</span>
              </div>
            </div>
            
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Profit Margin</span>
                <span className="text-sm font-bold text-emerald-400">75.8%</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[75.8%] rounded-full"></div>
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center">
                Excellent performance! You are exceeding the 50% industry benchmark.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
