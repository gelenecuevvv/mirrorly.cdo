import React, { useState, useRef, useEffect } from 'react';
import { Bell, LogOut, User, ChevronDown, Menu } from 'lucide-react';

interface HeaderProps {
  currentUser: any;
  onLogout: () => void;
  onMobileMenuOpen: () => void;
}

export default function Header({ currentUser, onLogout, onMobileMenuOpen }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu - Mobile/Tablet Only */}
        <button
          onClick={onMobileMenuOpen}
          className="p-2 text-gray-400 hover:text-white transition-colors lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <p className="text-sm text-gray-400">Welcome back,</p>
          <h2 className="font-light text-white">{currentUser?.name}</h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-black" />
            </div>
            <span className="text-sm text-white">{currentUser?.name}</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden">
              <div className="p-3 border-b border-zinc-800">
                <p className="text-sm text-white">{currentUser?.name}</p>
                <p className="text-xs text-gray-500">{currentUser?.email}</p>
              </div>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}