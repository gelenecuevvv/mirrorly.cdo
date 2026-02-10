import React from 'react';
import { Calendar, Users, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

interface DashboardHomeProps {
  onNavigate: (page: string) => void;
}

const stats = [
  {
    label: 'Total Bookings',
    value: '148',
    change: '+12.5%',
    icon: Calendar,
  },
  {
    label: 'Active Users',
    value: '89',
    change: '+8.2%',
    icon: Users,
  },
  {
    label: 'Total Revenue',
    value: '₱845,280',
    change: '+23.1%',
    icon: DollarSign,
  },
  {
    label: 'Pending Payments',
    value: '12',
    change: '-5.4%',
    icon: TrendingUp,
  },
];

const recentBookings = [
  {
    id: 1,
    client: 'Sarah Johnson',
    event: 'Wedding Reception',
    date: '2026-02-15',
    status: 'confirmed',
    amount: '₱31,250',
  },
  {
    id: 2,
    client: 'Michael Chen',
    event: 'Corporate Event',
    date: '2026-02-18',
    status: 'pending',
    amount: '₱52,500',
  },
  {
    id: 3,
    client: 'Emily Rodriguez',
    event: 'Birthday Party',
    date: '2026-02-20',
    status: 'confirmed',
    amount: '₱18,000',
  },
  {
    id: 4,
    client: 'David Thompson',
    event: 'Anniversary',
    date: '2026-02-22',
    status: 'confirmed',
    amount: '₱25,000',
  },
];

export default function DashboardHome({ onNavigate }: DashboardHomeProps) {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-light text-white mb-1">Dashboard</h1>
        <p className="text-sm text-gray-400">Overview of your photobooth business</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-white/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-black" />
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    stat.change.startsWith('+')
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-light text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="font-light text-white mb-1">Recent Bookings</h2>
            <p className="text-sm text-gray-400">Latest event reservations</p>
          </div>
          <button
            onClick={() => onNavigate('bookings')}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:text-gray-300 transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-white">{booking.client}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-300">{booking.event}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-300">{booking.date}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                        booking.status === 'confirmed'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-white font-medium">{booking.amount}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => onNavigate('bookings')}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-white transition-all duration-200 text-left group"
        >
          <Calendar className="w-8 h-8 text-white mb-3" />
          <h3 className="font-light text-white mb-1">New Booking</h3>
          <p className="text-sm text-gray-400">Create a new event booking</p>
        </button>

        <button
          onClick={() => onNavigate('payments')}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-white transition-all duration-200 text-left group"
        >
          <DollarSign className="w-8 h-8 text-white mb-3" />
          <h3 className="font-light text-white mb-1">Verify Payments</h3>
          <p className="text-sm text-gray-400">Review pending payments</p>
        </button>

        <button
          onClick={() => onNavigate('reports')}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-white transition-all duration-200 text-left group"
        >
          <TrendingUp className="w-8 h-8 text-white mb-3" />
          <h3 className="font-light text-white mb-1">View Reports</h3>
          <p className="text-sm text-gray-400">Analyze business metrics</p>
        </button>
      </div>
    </div>
  );
}