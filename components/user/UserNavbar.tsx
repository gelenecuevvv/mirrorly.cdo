import React, { useState, useRef, useEffect } from 'react';
import { Camera, Calendar, Image, User, LogOut, Menu, X } from 'lucide-react';

interface UserNavbarProps {
  currentUser: any;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'bookings', label: 'My Bookings', icon: Calendar },
  { id: 'photos', label: 'Event Photos', icon: Image },
];

export default function UserNavbar({ currentUser, currentPage, onNavigate, onLogout }: UserNavbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setShowMobileMenu(false);
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Camera className="w-6 h-6 text-white" />
            <span className="text-white font-light">Mirror Booth</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-black'
                      : 'text-gray-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-light">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {/* Desktop User Menu */}
            <div className="hidden md:block relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-black" />
                </div>
                <span className="text-sm text-white">{currentUser?.name}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="p-4 border-b border-zinc-800">
                    <p className="text-sm text-white font-light">{currentUser?.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{currentUser?.email}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        onNavigate('account');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Account Settings</span>
                    </button>
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-600/10 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-zinc-800">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-black'
                        : 'text-gray-400 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-light">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800 space-y-1">
              <button
                onClick={() => handleNavigate('account')}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="text-sm">Account Settings</span>
              </button>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-600/10 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Logout</span>
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800 px-4">
              <p className="text-sm text-white font-light">{currentUser?.name}</p>
              <p className="text-xs text-gray-400 mt-1">{currentUser?.email}</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}