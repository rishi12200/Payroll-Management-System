"use client";

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };



  return (
    <>
      <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={isSidebarOpen} />
      <div className="flex">
        {/* Sidebar for desktop */}
        <div
          className={`hidden md:block ${isSidebarOpen ? "w-[300px]" : "w-[80px]"
            } transition-all duration-300 h-100vh overflow-hidden`}
        >
          <Sidebar isCollapsed={!isSidebarOpen} />
        </div>

        {/* Sidebar for mobile */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={toggleSidebar}
            ></div>
            <div
              className="absolute left-0 top-0 h-full w-[350px] bg-secondary p-4 shadow-lg "
            >
              <Sidebar isCollapsed={false} />
            </div>
          </div>
        )}
        <div className='p-8 w-full'>{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
