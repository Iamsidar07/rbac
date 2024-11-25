"use client";
import { Users, Shield, ShieldAlertIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Roles",
    url: "/dashboard/roles",
    icon: Shield,
  },
  {
    title: "Permissions",
    url: "/dashboard/permissions",
    icon: ShieldAlertIcon,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between font-bold px-2">
          <span className={!open ? "hidden" : ""}>VRV</span>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary opacity-80">User Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-stretch gap-1.5">
          <Avatar>
            <AvatarImage src="/" alt="profile" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
          <div className={cn("flex flex-col", { hidden: !open })}>
            <p className="font-medium">Manoj Kumar</p>
            <p className="text-sm opacity-90">Editor</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
