"use client";

import * as React from "react";
import {
  BarChart3,
  Calendar,
  CheckSquare,
  FileText,
  LayoutDashboard,
  Settings,
  UserCircle,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Campaigns",
      url: "/campaigns",
      icon: Calendar,
    },
    {
      title: "Influencers",
      url: "/influencers",
      icon: Users,
    },
    {
      title: "Approvals",
      url: "/approvals",
      icon: CheckSquare,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: FileText,
    },
    {
      title: "ROI Analytics",
      url: "/analytics",
      icon: BarChart3,
    },
  ],
  secondary: [
    {
      title: "User Management",
      url: "/users",
      icon: UserCircle,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-100 bg-white" {...props}>
      <SidebarHeader className="h-20 flex justify-center px-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              size="lg" 
              render={<Link href="/dashboard" className="flex items-center gap-3" />} 
              className="hover:bg-transparent active:bg-transparent"
            >
              <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                <BarChart3 className="size-6" />
              </div>
              <div className="flex flex-col gap-0 leading-none">
                <span className="font-bold text-xl tracking-tight text-slate-900">TrackKOL</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Professional</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <div className="px-4 mb-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Main Menu</p>
        </div>
        <SidebarMenu className="gap-1">
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                render={
                  <Link 
                    href={item.url} 
                    className={`h-11 rounded-xl px-4 transition-all duration-200 ${
                      pathname.startsWith(item.url) 
                        ? "bg-primary/5 text-primary font-bold shadow-sm" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  />
                }
                isActive={pathname.startsWith(item.url)}
                tooltip={item.title}
              >
                <item.icon className={`size-5 ${pathname.startsWith(item.url) ? "text-primary" : "text-slate-400"}`} />
                <span className="text-sm">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="px-4 mt-8 mb-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Settings</p>
        </div>
        <SidebarMenu className="gap-1">
          {data.secondary.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                render={
                  <Link 
                    href={item.url} 
                    className={`h-11 rounded-xl px-4 transition-all duration-200 ${
                      pathname.startsWith(item.url) 
                        ? "bg-primary/5 text-primary font-bold shadow-sm" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  />
                }
                isActive={pathname.startsWith(item.url)}
                tooltip={item.title}
              >
                <item.icon className={`size-5 ${pathname.startsWith(item.url) ? "text-primary" : "text-slate-400"}`} />
                <span className="text-sm">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
