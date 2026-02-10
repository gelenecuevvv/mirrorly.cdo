import React, { useState } from 'react';
import { Users, Search, Eye, Mail, Phone, Calendar, ChevronLeft } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  registeredDate: string;
  totalBookings: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 234-567-8901',
    registeredDate: '2025-11-15',
    totalBookings: 3,
    totalSpent: 2150,
    status: 'active',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 234-567-8902',
    registeredDate: '2025-12-03',
    totalBookings: 2,
    totalSpent: 1300,
    status: 'active',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '+1 234-567-8903',
    registeredDate: '2026-01-10',
    totalBookings: 1,
    totalSpent: 500,
    status: 'active',
  },
  {
    id: 4,
    name: 'David Thompson',
    email: 'david.t@email.com',
    phone: '+1 234-567-8904',
    registeredDate: '2025-10-22',
    totalBookings: 5,
    totalSpent: 3750,
    status: 'active',
  },
  {
    id: 5,
    name: 'Jessica Williams',
    email: 'jessica.w@email.com',
    phone: '+1 234-567-8905',
    registeredDate: '2026-01-05',
    totalBookings: 1,
    totalSpent: 1200,
    status: 'active',
  },
];

const userBookings = [
  {
    id: 1,
    userId: 1,
    eventType: 'Wedding Reception',
    eventDate: '2026-02-15',
    amount: 850,
    status: 'confirmed',
  },
  {
    id: 2,
    userId: 1,
    eventType: 'Anniversary',
    eventDate: '2025-12-20',
    amount: 750,
    status: 'completed',
  },
  {
    id: 3,
    userId: 2,
    eventType: 'Corporate Event',
    eventDate: '2026-02-18',
    amount: 650,
    status: 'pending',
  },
];

export default function UsersPage() {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedUser) {
    return <UserDetails user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-light text-white mb-1">Users</h1>
        <p className="text-sm text-gray-400">Manage customer accounts</p>
      </div>

      {/* Search */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-600 transition-colors"
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-yellow-600/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-medium">
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  user.status === 'active'
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-gray-500/10 text-gray-400'
                }`}
              >
                {user.status}
              </span>
            </div>

            <h3 className="text-white font-light mb-1">{user.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{user.email}</p>

            <div className="space-y-2 mb-4 pb-4 border-b border-zinc-800">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Bookings</span>
                <span className="text-white">{user.totalBookings}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Total Spent</span>
                <span className="text-yellow-600 font-medium">${user.totalSpent}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedUser(user)}
              className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No users found</p>
        </div>
      )}
    </div>
  );
}

interface UserDetailsProps {
  user: User;
  onBack: () => void;
}

function UserDetails({ user, onBack }: UserDetailsProps) {
  const bookings = userBookings.filter((b) => b.userId === user.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-light text-white mb-1">User Details</h1>
          <p className="text-sm text-gray-400">User ID: #{user.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl text-black font-medium">
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-light text-white mb-2">{user.name}</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Registered {user.registeredDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking History */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <h3 className="text-lg font-light text-white">Booking History</h3>
            </div>
            {bookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-zinc-800/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-white">{booking.eventType}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{booking.eventDate}</td>
                        <td className="px-6 py-4 text-sm text-white font-medium">
                          ${booking.amount}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 text-xs rounded-full ${
                              booking.status === 'confirmed'
                                ? 'bg-green-500/10 text-green-400'
                                : booking.status === 'completed'
                                ? 'bg-blue-500/10 text-blue-400'
                                : 'bg-yellow-500/10 text-yellow-400'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="text-gray-400">No booking history</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-light text-white mb-4 pb-4 border-b border-zinc-800">
              Statistics
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Total Bookings</p>
                <p className="text-2xl font-light text-white">{user.totalBookings}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Total Spent</p>
                <p className="text-2xl font-light text-yellow-600">${user.totalSpent}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Account Status</p>
                <span
                  className={`px-3 py-1 inline-flex text-xs rounded-full ${
                    user.status === 'active'
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                  }`}
                >
                  {user.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
