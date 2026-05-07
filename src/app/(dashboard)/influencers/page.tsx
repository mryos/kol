"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Camera, PlayCircle, UserPlus, Mail, Phone, DollarSign } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { mockData } from "@/lib/mock-data";
import React from "react";

const influencers = mockData.influencers.map((i, idx) => ({
  id: String(idx + 1),
  name: i.name,
  handle: i.handle,
  platform: i.platform,
  followers: i.followers,
  engagement: (Math.random() * 5 + 2).toFixed(1) + "%",
  avgFee: i.revenue,
  tags: ["FMCG", "Lifestyle"],
}));

const platformIcons: Record<string, any> = {
  Instagram: Camera,
  YouTube: PlayCircle,
  TikTok: () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13-.08-.26-.17-.38-.26v5.48c.01 3.82-2.06 7.46-5.51 9.12-3.45 1.66-7.67.98-10.45-1.7-2.78-2.68-3.41-7.01-1.55-10.37 1.86-3.36 5.86-5.02 9.49-4.13.06-1.7.02-3.4.03-5.11-.01-.01-.02-.01-.03-.02zm-1.01 9.07c-2.43-.37-4.83 1.16-5.53 3.48-.7 2.32.18 4.93 2.11 6.13 1.93 1.2 4.62.8 6.12-.94 1.5-1.74 1.52-4.38.05-6.14-.85-.98-2.09-1.49-3.36-1.53h-.01z"/>
    </svg>
  ),
};

export default function InfluencersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Influencers</h2>
          <p className="text-slate-500 font-medium mt-1">
            Browse and manage your verified KOL network.
          </p>
        </div>
        <Button className="h-11 rounded-xl px-6 bg-primary hover:bg-indigo-700 font-bold text-sm shadow-lg shadow-primary/20 transition-all gap-2">
          <UserPlus className="h-4 w-4" />
          Add New KOL
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by name, handle, or category..."
            className="h-12 pl-10 pr-4 rounded-2xl border-slate-200 bg-white shadow-sm focus:ring-primary/20 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="h-12 flex-1 sm:flex-none rounded-2xl px-6 border-slate-200 bg-white font-bold text-sm shadow-sm hover:bg-slate-50 transition-all gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            Category
          </Button>
          <Button variant="outline" className="h-12 flex-1 sm:flex-none rounded-2xl px-6 border-slate-200 bg-white font-bold text-sm shadow-sm hover:bg-slate-50 transition-all">
            Platform
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {influencers.map((influencer) => (
          <Card key={influencer.id} className="border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white group hover:translate-y-[-8px] transition-all duration-300">
            <CardHeader className="pb-4 px-8 pt-8 flex flex-row items-start justify-between space-y-0">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-4 border-white shadow-xl">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${influencer.name}`} />
                    <AvatarFallback className="font-bold">{influencer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-md">
                    <div className="p-1 rounded-full bg-slate-100">
                      {platformIcons[influencer.platform] && React.createElement(platformIcons[influencer.platform], { className: "h-3 w-3 text-slate-600" })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-slate-900 text-lg group-hover:text-primary transition-colors">{influencer.name}</span>
                  <span className="text-xs font-bold text-slate-400 tracking-tight">{influencer.handle}</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={(props) => (
                    <Button
                      {...props}
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-slate-50"
                    >
                      <MoreHorizontal className="h-5 w-5 text-slate-400" />
                    </Button>
                  )}
                />
                <DropdownMenuContent align="end" className="rounded-xl border-slate-100 shadow-xl">
                  <DropdownMenuItem className="font-bold text-sm rounded-lg">View Full Bio</DropdownMenuItem>
                  <DropdownMenuItem className="font-bold text-sm rounded-lg">Campaign History</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <DropdownMenuItem className="font-bold text-sm rounded-lg text-rose-600">Remove from List</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="grid grid-cols-2 gap-6 py-5 border-y border-slate-50 mb-6">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-extrabold tracking-widest mb-1">Followers</p>
                  <p className="text-base font-extrabold text-slate-900">{influencer.followers}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-extrabold tracking-widest mb-1">Engagement</p>
                  <p className="text-base font-extrabold text-emerald-600">{influencer.engagement}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-extrabold tracking-widest mb-1">Avg. Fee</p>
                  <p className="text-sm font-extrabold text-slate-900">{influencer.avgFee}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-extrabold tracking-widest mb-1">Rating</p>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-extrabold text-amber-500">4.8</span>
                    <span className="text-[10px] text-slate-400 font-bold">/5</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {influencer.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-slate-50 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full border-none uppercase tracking-wider">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Button className="flex-1 h-11 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs shadow-none transition-all">
                  <Mail className="mr-2 h-3.5 w-3.5" />
                  Proposal
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl border-slate-100 hover:bg-slate-50 text-slate-400 hover:text-slate-900">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
