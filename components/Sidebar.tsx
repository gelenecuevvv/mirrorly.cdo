import React from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  Image,
  BarChart3,
  Settings,
  Camera,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'payments', label: 'Payments', icon: DollarSign },
  { id: 'event-photos', label: 'Event Photos', icon: Image },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'account', label: 'Account', icon: Settings },
];

export default function Sidebar({ 
  currentPage, 
  onNavigate, 
  isCollapsed, 
  onToggleCollapse,
  isMobileMenuOpen,
  onMobileMenuClose 
}: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={onMobileMenuClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-zinc-900 border-r border-zinc-800 z-50 transition-all duration-300
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 w-64`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-zinc-800 relative px-4">
          {/* Mobile Close Button */}
          <button
            onClick={onMobileMenuClose}
            className="absolute left-4 p-2 text-gray-400 hover:text-white transition-colors lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>

          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-white" />
              <span className="text-white font-light">Mirror Booth</span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hidden lg:flex">
              <Camera className="w-5 h-5 text-black" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:bg-zinc-800 hover:text-white'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className={`text-sm font-light ${isCollapsed ? 'hidden' : 'lg:block'} block`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Collapse Toggle - Desktop Only */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex absolute bottom-6 right-0 transform translate-x-1/2 w-6 h-6 bg-white rounded-full items-center justify-center text-black hover:bg-gray-200 transition-colors shadow-lg"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </>
  );
}