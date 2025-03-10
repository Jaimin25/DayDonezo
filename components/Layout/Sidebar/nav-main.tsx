'use client';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

import {
  BookText,
  // ChartNoAxesCombined,
  ChartPie,
  LayoutDashboard,
  Settings2,
} from 'lucide-react';

const items = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Analytics',
      url: '/analytics',
      icon: ChartPie,
    },
    {
      title: 'Journal',
      url: '/journal',
      icon: BookText,
    },
    // {
    //   title: 'Leaderboard',
    //   url: '/leaderboard',
    //   icon: ChartNoAxesCombined,
    // },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings2,
    },
  ],
};

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.navMain.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link href={item.url}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
