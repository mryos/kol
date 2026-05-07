"use client";

import { useState } from "react";
import { 
  FileDown, 
  Filter, 
  Calendar,
  Download,
  FileSpreadsheet,
  FileText as FileIcon
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ReportsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Reports</h2>
          <p className="text-slate-500 font-medium mt-1">
            Generate and export deep-dive campaign performance analytics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 rounded-xl px-4 border-slate-200 bg-white hover:bg-slate-50 transition-all font-bold text-sm shadow-sm">
            <FileSpreadsheet className="mr-2 h-4 w-4 text-emerald-500" />
            Export Excel
          </Button>
          <Button variant="outline" className="h-11 rounded-xl px-4 border-slate-200 bg-white hover:bg-slate-50 transition-all font-bold text-sm shadow-sm">
            <FileIcon className="mr-2 h-4 w-4 text-rose-500" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Filter className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-lg">Filter Parameters</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Report Type</label>
              <Select defaultValue="campaign">
                <SelectTrigger className="h-11 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-primary/20 transition-all font-medium">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100">
                  <SelectItem value="campaign">Campaign Performance</SelectItem>
                  <SelectItem value="influencer">Influencer ROI</SelectItem>
                  <SelectItem value="finance">Finance & Payments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Date Range</label>
              <Button variant="outline" className="h-11 w-full justify-start text-left font-medium rounded-xl bg-slate-50/50 border-slate-200 hover:bg-slate-100 transition-all">
                <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                <span>Last 30 Days</span>
              </Button>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Campaign</label>
              <Select defaultValue="all">
                <SelectTrigger className="h-11 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-primary/20 transition-all font-medium">
                  <SelectValue placeholder="Select campaign" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100">
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="ramadan">Promo Ramadhan & Lebaran</SelectItem>
                  <SelectItem value="payday">Gajian Sale</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="h-11 w-full gap-2 rounded-xl bg-primary hover:bg-indigo-700 shadow-lg shadow-primary/20 transition-all font-bold">
                <Download className="h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white">
        <CardHeader className="px-8 py-6 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold">Report Preview</CardTitle>
            <CardDescription className="font-medium">Live data snapshot for the selected period.</CardDescription>
          </div>
          <Badge variant="outline" className="rounded-full px-3 py-1 bg-emerald-50 text-emerald-700 border-emerald-100 font-bold">
            Real-time Analysis
          </Badge>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="py-4 px-8 text-slate-900 font-bold">Date</TableHead>
                <TableHead className="text-slate-900 font-bold">Campaign</TableHead>
                <TableHead className="text-slate-900 font-bold">Influencers</TableHead>
                <TableHead className="text-right text-slate-900 font-bold">Spend</TableHead>
                <TableHead className="text-right text-slate-900 font-bold">Revenue</TableHead>
                <TableHead className="text-right px-8 text-slate-900 font-bold">ROAS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: "2026-05-01", campaign: "Promo Ramadhan 2026", influencers: 12, spend: "Rp 4.200.000", revenue: "Rp 18.500.000", roas: "4.4x" },
                { date: "2026-05-02", campaign: "Promo Ramadhan 2026", influencers: 8, spend: "Rp 2.800.000", revenue: "Rp 12.100.000", roas: "4.3x" },
                { date: "2026-05-03", campaign: "Gajian Sale - Mei", influencers: 5, spend: "Rp 1.500.000", revenue: "Rp 4.800.000", roas: "3.2x" },
                { date: "2026-05-04", campaign: "Gajian Sale - Mei", influencers: 7, spend: "Rp 2.100.000", revenue: "Rp 6.900.000", roas: "3.3x" },
              ].map((row, i) => (
                <TableRow key={i} className="border-slate-100 group hover:bg-slate-50/50 transition-colors">
                  <TableCell className="py-5 px-8 text-xs font-bold text-slate-500 font-mono tracking-tight">{row.date}</TableCell>
                  <TableCell className="font-bold text-slate-900">{row.campaign}</TableCell>
                  <TableCell className="font-medium text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {row.influencers} KOLs
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-slate-900">{row.spend}</TableCell>
                  <TableCell className="text-right font-bold text-indigo-600">{row.revenue}</TableCell>
                  <TableCell className="text-right px-8">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-100">
                      {row.roas}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="p-8 bg-slate-50/30 text-center border-t border-slate-100">
            <Button variant="ghost" className="text-slate-500 font-bold text-xs hover:bg-white hover:shadow-sm rounded-xl">
              View All Report Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
