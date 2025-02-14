"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeToggler from '@/components/ThemeToggler';
import { ArrowLeftFromLine, ArrowRightFromLineIcon, Bell, Cog, Maximize2, Minimize, Square, SquareStack } from 'lucide-react';
import { useSidebar } from './ui/sidebar';


interface NavbarProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const itemClass = "p-1 rounded-md bg-secondary text-primary-foreground p-2 bg-slate-700 hover:bg-slate-600  cursor-pointer hover:text-secondary-foreground dark:text-secondary-foreground";

const Navbar: React.FC<NavbarProps> = () => {
  // State to track fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullscreen(!isFullscreen); // Toggle fullscreen state
  };

  const { toggleSidebar } = useSidebar();
  const { state } = useSidebar();
  return (
    <div className="bg-primary dark:bg-sidebar text-secondary dark:text-secondary-foreground py-2 px-5 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {/* Sidebar trigger */}
        {state === "collapsed" ?
          <Link href="#">
            <ArrowRightFromLineIcon size={30} onClick={toggleSidebar} className={itemClass} />
          </Link>
          : <Link href="#">
            <ArrowLeftFromLine size={30} onClick={toggleSidebar} className={itemClass} />
          </Link>
        }

        <Link href="#">
          <SquareStack size={28} className={itemClass} />
        </Link>

        <Link href="#">
          <Cog size={28} className={itemClass} />
        </Link>
      </div>

      <div className="flex items-center gap-4">

        {!isFullscreen ? (
          <Maximize2 onClick={toggleFullscreen} size={28} className={itemClass} />
        ) : (
          <Minimize onClick={toggleFullscreen} size={28} className={itemClass} />
        )}


        {/*Notification*/}
        <Link href="#">
          <Bell className={itemClass} size={28} />
        </Link >


        <ThemeToggler />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="text-black">BT</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/auth">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
