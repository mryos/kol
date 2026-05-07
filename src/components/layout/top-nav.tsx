"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

export function TopNav() {
  const pathname = usePathname();
  
  // Simple breadcrumb logic
  const segments = pathname.split("/").filter(Boolean);
  const title = segments.length > 0 
    ? segments[segments.length - 1].charAt(0).toUpperCase() + segments[segments.length - 1].slice(1)
    : "Dashboard";

  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-semibold text-slate-900">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search campaigns..."
            className="w-64 pl-8 h-9 rounded-full bg-slate-100 border-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={(props) => (
              <Button
                {...props}
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-full"
              >
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
              </Button>
            )}
          />
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col gap-1 p-2">
              <div className="flex flex-col gap-1 rounded-md p-2 hover:bg-slate-50 cursor-pointer">
                <p className="text-sm font-medium">Campaign Approved</p>
                <p className="text-xs text-muted-foreground">Ramadan Flash Sale has been approved by Finance.</p>
                <span className="text-[10px] text-muted-foreground">2 mins ago</span>
              </div>
              <div className="flex flex-col gap-1 rounded-md p-2 hover:bg-slate-50 cursor-pointer">
                <p className="text-sm font-medium">New Content Submitted</p>
                <p className="text-xs text-muted-foreground">@sarah.influencer submitted a new video URL.</p>
                <span className="text-[10px] text-muted-foreground">1 hour ago</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-xs text-primary font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
