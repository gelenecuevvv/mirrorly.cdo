import React, { useState } from 'react';
import UserNavbar from './UserNavbar';
import UserBookingsPage from './pages/UserBookingsPage';
import UserPhotosPage from './pages/UserPhotosPage';
import UserAccountPage from './pages/UserAccountPage';

interface UserDashboardProps {
  currentUser: any;
  onLogout: () => void;
}

export default function UserDashboard({ currentUser, onLogout }: UserDashboardProps) {
  const [currentPage, setCurrentPage] = useState('bookings');

  const renderPage = () => {
    switch (currentPage) {
      case 'bookings':
        return <UserBookingsPage currentUser={currentUser} />;
      case 'photos':
        return <UserPhotosPage currentUser={currentUser} />;
      case 'account':
        return <UserAccountPage currentUser={currentUser} />;
      default:
        return <UserBookingsPage currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <UserNavbar
        currentUser={currentUser}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={onLogout}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
}