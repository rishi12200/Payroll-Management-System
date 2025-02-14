"use client";

import { AppSidebar } from '@/components/app-sidebar';
import Navbar from '@/components/Navbar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useState } from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen"> {/* Main container now flex column */}
      <div className="flex flex-grow"> {/* Container for Sidebar and Content */}
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <div className="flex items-center gap-2 ">

              <div className="flex-grow flex flex-col"> {/* Content area, flex column */}
                <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={isSidebarOpen} />
                <main className="flex-grow p-8 overflow-y-auto">
                  {children}
                </main>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider >
      </div>
    </div>
  );
};

export default MainLayout;