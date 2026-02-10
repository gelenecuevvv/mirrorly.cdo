import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardHome from './pages/DashboardHome';
import UsersPage from './pages/UsersPage';
import BookingsPage from './pages/BookingsPage';
import PaymentsPage from './pages/PaymentsPage';
import EventPhotosPage from './pages/EventPhotosPage';
import ReportsPage from './pages/ReportsPage';
import AccountPage from './pages/AccountPage';

interface AdminDashboardProps {
  currentUser: any;
  onLogout: () => void;
}

export default function AdminDashboard({ currentUser, onLogout }: AdminDashboardProps) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome onNavigate={setCurrentPage} />;
      case 'users':
        return <UsersPage />;
      case 'bookings':
        return <BookingsPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'event-photos':
        return <EventPhotosPage />;
      case 'reports':
        return <ReportsPage />;
      case 'account':
        return <AccountPage currentUser={currentUser} />;
      default:
        return <DashboardHome onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          setIsMobileMenuOpen(false); // Close mobile menu when navigating
        }}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={() => setIsMobileMenuOpen(false)}
      />
      
      <div className={`transition-all duration-300 lg:ml-64 ${isSidebarCollapsed ? 'lg:ml-20' : ''}`}>
        <Header 
          currentUser={currentUser} 
          onLogout={onLogout}
          onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
        />
        
        <main className="p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}