"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Calendar, DollarSign, Target } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import { mockData } from "@/lib/mock-data";

const campaigns = mockData.campaigns;

const statusStyles: Record<string, string> = {
  RUNNING: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  APPROVED: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  DRAFT: "bg-slate-100 text-slate-700 hover:bg-slate-100",
  COMPLETED: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  PENDING_APPROVAL: "bg-amber-100 text-amber-700 hover:bg-amber-100",
};

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Campaigns</h2>
          <p className="text-slate-500 font-medium mt-1">
            Manage and track your influencer marketing initiatives.
          </p>
        </div>
        <Button className="h-11 rounded-xl px-6 bg-primary hover:bg-indigo-700 font-bold text-sm shadow-lg shadow-primary/20 transition-all gap-2">
          <Plus className="h-4 w-4" />
          Create New Campaign
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by campaign name or ID..."
            className="h-12 pl-10 pr-4 rounded-2xl border-slate-200 bg-white shadow-sm focus:ring-primary/20 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-12 rounded-2xl px-6 border-slate-200 bg-white font-bold text-sm shadow-sm hover:bg-slate-50 transition-all gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          Advanced Filters
        </Button>
      </div>

      <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="py-5 px-8 text-xs font-bold uppercase tracking-wider text-slate-400">Campaign Details</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-400">Status</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-400">Budget</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-400">Performance</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-slate-400 text-right px-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id} className="border-slate-100 group hover:bg-slate-50/50 transition-colors">
                  <TableCell className="py-6 px-8">
                    <div className="flex flex-col">
                      <Link href={`/campaigns/${campaign.id}`} className="font-bold text-slate-900 group-hover:text-primary transition-all">
                        {campaign.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                          {new Date(campaign.startDate).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })} - {new Date(campaign.endDate).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider border-none ${statusStyles[campaign.status]}`}>
                      {campaign.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{campaign.budget}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Allocated</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between w-24">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">ROI</span>
                        <span className="text-xs font-bold text-indigo-600">{campaign.roi}</span>
                      </div>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full" 
                          style={{ width: `${Math.min(parseFloat(campaign.roi) * 20, 100)}%` }} 
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={(props) => (
                          <Button
                            {...props}
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all"
                          >
                            <MoreHorizontal className="h-5 w-5 text-slate-400" />
                          </Button>
                        )}
                      />
                      <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 border-slate-100 shadow-xl">
                        <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 py-1.5">Management</DropdownMenuLabel>
                        <DropdownMenuItem asChild className="rounded-lg font-bold text-sm">
                          <Link href={`/campaigns/${campaign.id}`}>View Performance</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg font-bold text-sm text-slate-600">Edit Settings</DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1 bg-slate-100" />
                        <DropdownMenuItem className="rounded-lg font-bold text-sm text-rose-600 focus:bg-rose-50 focus:text-rose-600">Archive Campaign</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="p-8 bg-slate-50/30 text-center border-t border-slate-100">
            <Button variant="ghost" className="text-slate-500 font-bold text-xs hover:bg-white hover:shadow-sm rounded-xl">
              Show All Campaigns
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
