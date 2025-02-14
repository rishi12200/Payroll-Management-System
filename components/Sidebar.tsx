/* Waste file */


"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  LayoutDashboard,
  Newspaper,
  Folders,
  CreditCard,
  Settings,
  User,
  ChevronDown,
  ChevronUp,
  HandCoins,
  BookPlus,
  FlagTriangleRight,
  Bolt,
  FolderDot,
  BadgeHelp,

} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import logo from '../img/logo.png';
import Image from 'next/image';

const itemClass = "hover:bg-primary hover:text-primary-foreground rounded-sm p-1 cursor-pointer";

interface DropdownProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: { label: string; href: string }[];
  isOpen: boolean;
  toggleDropdown: () => void;
  isCollapsed: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ title, icon: Icon, items, isOpen, toggleDropdown, isCollapsed }) => {
  return (
    <>
      <CommandItem
        onPointerDown={toggleDropdown}
        className={itemClass}
      >
        <Icon className="m-2 h-4 w-4" />
        {!isCollapsed && <span>{title}</span>} {/* Only show title if not collapsed */}
        {(isOpen ? (
          <ChevronUp className="ml-auto h-4 w-4" />
        ) : (
          <ChevronDown className="ml-auto h-4 w-4" />
        ))}
      </CommandItem>
      {!isCollapsed && isOpen && (
        <div className="pl-8 ">
          {items.map((item, index) => (
            <CommandItem key={index}>

              <Link href={item.href}>{item.label}</Link>

            </CommandItem>
          ))}
        </div>
      )}
    </>
  );
};

const Sidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string | null) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const employeeItems = [
    { label: 'Employee List', href: '#' },
    { label: 'Employee Attendance', href: '#' },
    { label: 'Employee Leave', href: '#' },
  ];

  const payrollItems = [
    { label: 'Generate Payroll', href: '#' },
    { label: 'Payroll Reports', href: '#' },
    { label: 'Overtime & Bonus Management', href: '#' },
  ];

  const leaveItems = [
    { label: 'Leave Types', href: '#' },
    { label: 'Leave Approval', href: '#' },
    { label: 'Leave Calendar', href: '#' },
  ];

  const reportsItems = [
    { label: 'Employee Reports', href: '#' },
    { label: 'Payroll Reports', href: '#' },
    { label: 'Tax Reports', href: '#' },
    { label: 'Leave Reports', href: '#' },
  ];

  const settingsItems = [
    { label: 'System Settings', href: '#' },
    { label: 'User Management', href: '#' },
    { label: 'Notifications', href: '#' },
  ];

  const employeeSelfServiceItems = [
    { label: 'View Payslip', href: '#' },
    { label: 'View Leave Balance', href: '#' },
    { label: 'Apply for Leave', href: '#' },
    { label: 'Update Personal Information', href: '#' },
  ];

  const administrationItems = [
    { label: 'Backup & Restore', href: '#' },
    { label: 'Audit Logs', href: '#' },
    { label: 'System Health', href: '#' },
  ];

  const helpSupportItems = [
    { label: 'User Guide', href: '#' },
    { label: 'FAQs', href: '#' },
    { label: 'Contact Support', href: '#' },
  ];

  return (
    <>
      <div className="bg-secondary rounded-none p-2 pt-2  " >
        <Link href="#">
          <Image src={logo} alt="TraversyPress" width={40} />
        </Link>
      </div>
      <Command className="bg-secondary rounded-none h-full flex flex-col">
        {!isCollapsed && <CommandInput placeholder="Type a command or search..." />}
        <CommandList className="flex-1 overflow-y-auto">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading={!isCollapsed ? "Suggestions" : " "}>
            <CommandItem className={itemClass}>
              <LayoutDashboard className="m-2 h-4 w-4" />
              {!isCollapsed && <Link href="/">Dashboard</Link>} {/* Only show text if not collapsed */}
            </CommandItem>
            <Dropdown
              title="Employee Management"
              icon={Newspaper}
              items={employeeItems}
              isOpen={openDropdown === 'employee'}
              toggleDropdown={() => toggleDropdown('employee')}
              isCollapsed={isCollapsed}
            />
            <Dropdown
              title="Payroll Management"
              icon={HandCoins}
              items={payrollItems}
              isOpen={openDropdown === 'payroll'}
              toggleDropdown={() => toggleDropdown('payroll')}
              isCollapsed={isCollapsed}
            />
            <Dropdown
              title="Leave Management"
              icon={BookPlus}
              items={leaveItems}
              isOpen={openDropdown === 'leave'}
              toggleDropdown={() => toggleDropdown('leave')}
              isCollapsed={isCollapsed}
            />
            <Dropdown
              title="Reports"
              icon={FlagTriangleRight}
              items={reportsItems}
              isOpen={openDropdown === 'reports'}
              toggleDropdown={() => toggleDropdown('reports')}
              isCollapsed={isCollapsed}
            />
            <Dropdown
              title="Settings"
              icon={Bolt}
              items={settingsItems}
              isOpen={openDropdown === 'settings'}
              toggleDropdown={() => toggleDropdown('settings')}
              isCollapsed={isCollapsed}
            />
            <Dropdown
              title="Employee Self-Service"
              icon={Folders}
              items={employeeSelfServiceItems}
              isOpen={openDropdown === 'employeeSelfService'}
              toggleDropdown={() => toggleDropdown('employeeSelfService')}
              isCollapsed={isCollapsed}
            />
            <Dropdown
              title="Administration"
              icon={FolderDot}
              items={administrationItems}
              isOpen={openDropdown === 'administration'}
              toggleDropdown={() => toggleDropdown('administration')}
              isCollapsed={isCollapsed}
            />
            <Dropdown
              title="Help & Support"
              icon={BadgeHelp}
              items={helpSupportItems}
              isOpen={openDropdown === 'helpSupport'}
              toggleDropdown={() => toggleDropdown('helpSupport')}
              isCollapsed={isCollapsed}
            />
          </CommandGroup>
          <CommandSeparator />

          <CommandGroup heading={!isCollapsed ? "Settings" : <p>&nbsp;</p>} >
            <CommandItem className={itemClass}>
              <User className="mr-2 h-4 w-4" />
              {!isCollapsed && <span>Profile</span>}
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem className={itemClass}>
              <CreditCard className="mr-2 h-4 w-4" />
              {!isCollapsed && <span>Billing</span>} {/* Only show text if not collapsed */}
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem className={itemClass}>
              <Settings className="mr-2 h-4 w-4" />
              {!isCollapsed && <span>Settings</span>} {/* Only show text if not collapsed */}
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command >
    </>
  );
};

export default Sidebar;
