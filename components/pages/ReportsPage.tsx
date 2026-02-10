import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, DollarSign, Download, Filter } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const monthlyRevenue = [
  { month: 'Sep', revenue: 12500, bookings: 18 },
  { month: 'Oct', revenue: 15800, bookings: 22 },
  { month: 'Nov', revenue: 18200, bookings: 26 },
  { month: 'Dec', revenue: 22400, bookings: 32 },
  { month: 'Jan', revenue: 28600, bookings: 38 },
  { month: 'Feb', revenue: 32100, bookings: 42 },
];

const bookingsByType = [
  { name: 'Wedding', value: 45, color: '#D4AF37' },
  { name: 'Corporate', value: 25, color: '#F4E5B2' },
  { name: 'Birthday', value: 20, color: '#C9A961' },
  { name: 'Other', value: 10, color: '#B8964F' },
];

const packageDistribution = [
  { name: 'Basic', bookings: 15, revenue: 7500 },
  { name: 'Standard', bookings: 28, revenue: 18200 },
  { name: 'Premium', bookings: 35, revenue: 29750 },
  { name: 'Luxury', bookings: 12, revenue: 16800 },
];

export default function ReportsPage() {
  const [reportType, setReportType] = useState<'bookings' | 'payments'>('bookings');
  const [timeRange, setTimeRange] = useState('6months');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-white mb-1">Reports</h1>
          <p className="text-sm text-gray-400">Analytics and business insights</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black rounded-lg hover:from-yellow-500 hover:to-yellow-400 transition-all duration-200">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as 'bookings' | 'payments')}
              className="bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-600 transition-colors"
            >
              <option value="bookings">Booking Reports</option>
              <option value="payments">Payment Reports</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-600 transition-colors"
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {reportType === 'bookings' ? <BookingReports /> : <PaymentReports />}
    </div>
  );
}

function BookingReports() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Bookings</p>
            <Calendar className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-light text-white mb-1">148</p>
          <p className="text-xs text-green-400">+12.5% from last period</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Confirmed</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-light text-white mb-1">112</p>
          <p className="text-xs text-gray-400">75.7% of total</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Pending</p>
            <Calendar className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-light text-white mb-1">24</p>
          <p className="text-xs text-gray-400">16.2% of total</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Cancelled</p>
            <Calendar className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-light text-white mb-1">12</p>
          <p className="text-xs text-gray-400">8.1% of total</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Bookings Trend */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-light text-white mb-6">Monthly Booking Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="month" stroke="#71717a" />
              <YAxis stroke="#71717a" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #27272a',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#D4AF37"
                strokeWidth={3}
                dot={{ fill: '#D4AF37', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings by Event Type */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-light text-white mb-6">Bookings by Event Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bookingsByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {bookingsByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #27272a',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Package Distribution */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-light text-white mb-6">Package Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={packageDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="name" stroke="#71717a" />
            <YAxis stroke="#71717a" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Bar dataKey="bookings" fill="#D4AF37" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Clients */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h3 className="text-lg font-light text-white">Top Clients</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Client Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Total Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Last Booking
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              <tr className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-white">David Thompson</td>
                <td className="px-6 py-4 text-sm text-gray-300">5</td>
                <td className="px-6 py-4 text-sm text-yellow-600 font-medium">$3,750</td>
                <td className="px-6 py-4 text-sm text-gray-300">2026-02-22</td>
              </tr>
              <tr className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-white">Sarah Johnson</td>
                <td className="px-6 py-4 text-sm text-gray-300">3</td>
                <td className="px-6 py-4 text-sm text-yellow-600 font-medium">$2,150</td>
                <td className="px-6 py-4 text-sm text-gray-300">2026-02-15</td>
              </tr>
              <tr className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-white">Michael Chen</td>
                <td className="px-6 py-4 text-sm text-gray-300">2</td>
                <td className="px-6 py-4 text-sm text-yellow-600 font-medium">$1,300</td>
                <td className="px-6 py-4 text-sm text-gray-300">2026-02-18</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PaymentReports() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Revenue</p>
            <DollarSign className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-light text-white mb-1">$129,600</p>
          <p className="text-xs text-green-400">+23.1% from last period</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Verified</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-light text-white mb-1">$115,200</p>
          <p className="text-xs text-gray-400">88.9% of total</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Pending</p>
            <DollarSign className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-light text-white mb-1">$14,400</p>
          <p className="text-xs text-gray-400">11.1% of total</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Avg. Transaction</p>
            <DollarSign className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-light text-white mb-1">$876</p>
          <p className="text-xs text-gray-400">Per booking</p>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-light text-white mb-6">Monthly Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="month" stroke="#71717a" />
            <YAxis stroke="#71717a" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Bar dataKey="revenue" fill="#D4AF37" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue by Package */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-light text-white mb-6">Revenue by Package</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={packageDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="name" stroke="#71717a" />
            <YAxis stroke="#71717a" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Bar dataKey="revenue" fill="#D4AF37" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Payment Methods */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h3 className="text-lg font-light text-white">Payment Methods Distribution</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Transactions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              <tr className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-white">Bank Transfer</td>
                <td className="px-6 py-4 text-sm text-gray-300">58</td>
                <td className="px-6 py-4 text-sm text-yellow-600 font-medium">$52,300</td>
                <td className="px-6 py-4 text-sm text-gray-300">40.3%</td>
              </tr>
              <tr className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-white">Credit Card</td>
                <td className="px-6 py-4 text-sm text-gray-300">45</td>
                <td className="px-6 py-4 text-sm text-yellow-600 font-medium">$38,700</td>
                <td className="px-6 py-4 text-sm text-gray-300">29.9%</td>
              </tr>
              <tr className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-white">PayPal</td>
                <td className="px-6 py-4 text-sm text-gray-300">28</td>
                <td className="px-6 py-4 text-sm text-yellow-600 font-medium">$24,100</td>
                <td className="px-6 py-4 text-sm text-gray-300">18.6%</td>
              </tr>
              <tr className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 text-sm text-white">Cash</td>
                <td className="px-6 py-4 text-sm text-gray-300">17</td>
                <td className="px-6 py-4 text-sm text-yellow-600 font-medium">$14,500</td>
                <td className="px-6 py-4 text-sm text-gray-300">11.2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
