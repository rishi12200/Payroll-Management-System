"use client"

import * as React from "react"
import {

  BookOpen,
  BookPlus,
  BookUser,
  Bot,
  ChevronDown,
  CircleHelp,
  FlagTriangleRight,
  LayoutDashboard,
  LogOut,
  Settings2,


} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavHelp } from "@/components/nav-help"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const { toggleSidebar } = useSidebar();

  console.log(state);

  const triggerExpand = () => {
    if (state === "collapsed") {
      toggleSidebar();
    }
  }

  const triggerCollapse = () => {
    if (state === "expanded") {
      toggleSidebar();
    }
  }

  return (
    <Sidebar onMouseEnter={triggerExpand} onMouseLeave={triggerCollapse} collapsible="icon" {...props}>
      <SidebarHeader>
        <ChevronDown className="w-6 h-6" /> {/* Insert logo here*/}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuButton tooltip="Dashboard" className="ml-2 mt-2" asChild>
          <Link href="#">
            <LayoutDashboard />
            <span>Dashboard</span>
          </Link>
        </SidebarMenuButton>
        <NavMain items={data.navMain} />
        <NavHelp settings={data.settings} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar >
  )
}



// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Employee Management",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Employee List",
          url: "#",
        },
        {
          title: "Employee Attendance",
          url: "#",
        },
        {
          title: "Employee Leave",
          url: "#",
        },
      ],
    },
    {
      title: "Payroll Management",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Generate Payroll",
          url: "#",
        },
        {
          title: "Payroll Reports",
          url: "#",
        },
        {
          title: "Overtime & Bonus Management",
          url: "#",
        },
      ],
    },
    {
      title: "Leave Management",
      url: "#",
      icon: BookPlus,
      items: [
        {
          title: "Leave Types",
          url: "#",
        },
        {
          title: "Leave Approval",
          url: "#",
        },
        {
          title: "Leave Calendar",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: FlagTriangleRight,
      items: [
        {
          title: "Employee Reports",
          url: "#",
        },
        {
          title: "Payroll Reports",
          url: "#",
        },
        {
          title: "Tax Reports",
          url: "#",
        },
        {
          title: "Leave Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "System Settings",
          url: "#",
        },
        {
          title: "User Management",
          url: "#",
        },
        {
          title: "Notifications",
          url: "#",
        },
      ],
    },
    {
      title: "Employee Self-Service",
      url: "#",
      icon: BookUser,
      items: [
        {
          title: "View Payslip",
          url: "#",
        },
        {
          title: "View Leave Balance",
          url: "#",
        },
        {
          title: "Apply for Leave",
          url: "#",
        },
        {
          title: "Update Personal Information",
          url: "#",
        },
      ],
    },
    {
      title: "Administration",
      url: "#",
      icon: CircleHelp,
      items: [
        {
          title: "Backup & Restore",
          url: "#",
        },
        {
          title: "Audit Logs",
          url: "#",
        },
        {
          title: "System Health",
          url: "#",
        },
      ],
    },
  ],
  settings: [
    {
      name: "User Guide",
      url: "#",
      icon: BookUser,
    },
    {
      name: "FAQs",
      url: "#",
      icon: Settings2,
    },
    {
      name: "Contact Support",
      url: "#",
      icon: CircleHelp,
    },
    {
      name: "Logout",
      url: "#",
      icon: LogOut,
    }
  ],
}