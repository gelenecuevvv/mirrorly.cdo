import React, { useState } from 'react';
import {
  Calendar,
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  X,
  Check,
  MoreVertical,
  ChevronLeft,
  Grid,
  List,
  MapPin,
  Clock,
  User as UserIcon,
  CreditCard,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
  DollarSign,
  Smartphone,
  Building2,
} from 'lucide-react';

type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
type PaymentStatus = 'pending' | 'verified' | 'rejected';

interface Booking {
  id: number;
  eventName: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  packageType: string;
  hours: number;
  price: number;
  status: BookingStatus;
  createdAt: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  layout?: string;
  
  // Payment Information
  paymentType?: string;
  paymentMethod?: string;
  proofUrl?: string;
  proofFileName?: string;
  amountPaid?: number;
  remainingBalance?: number;
  paymentStatus?: PaymentStatus;
  paymentUploadedAt?: string;
  paymentVerifiedAt?: string;
  paymentNotes?: string;
}

const mockBookings: Booking[] = [
  {
    id: 1,
    eventName: 'Sarah & Mike Wedding',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah.j@email.com',
    clientPhone: '+63 917-123-4567',
    eventType: 'Wedding',
    eventDate: '2026-03-15',
    eventTime: '18:00',
    venue: 'Grand Ballroom, Manila Hotel',
    packageType: 'Premium Package',
    hours: 5,
    price: 31250,
    status: 'confirmed',
    createdAt: '2026-02-01',
    paymentType: 'Half Payment',
    paymentMethod: 'GCash',
    amountPaid: 15625,
    remainingBalance: 15625,
    proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
    proofFileName: 'gcash_payment_001.jpg',
    paymentStatus: 'verified',
    paymentUploadedAt: '2026-02-05',
    paymentVerifiedAt: '2026-02-06',
  },
  {
    id: 2,
    eventName: "Isabella's 18th Birthday",
    clientName: 'Maria Isabella Cruz',
    clientEmail: 'isabella@email.com',
    clientPhone: '+63 917-234-5678',
    eventType: 'Debut',
    eventDate: '2026-04-20',
    eventTime: '19:00',
    venue: 'Marquis Events Place, BGC',
    packageType: 'Standard Package',
    hours: 4,
    price: 18000,
    status: 'pending',
    createdAt: '2026-02-05',
    paymentType: 'Partial Payment',
    paymentMethod: 'Bank Transfer',
    amountPaid: 4500,
    remainingBalance: 13500,
    proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
    proofFileName: 'bank_deposit_002.jpg',
    paymentStatus: 'pending',
    paymentUploadedAt: '2026-02-05',
  },
  {
    id: 3,
    eventName: 'Corporate Anniversary Celebration',
    clientName: 'Michael Chen',
    clientEmail: 'michael.chen@company.com',
    clientPhone: '+63 917-345-6789',
    eventType: 'Corporate Event',
    eventDate: '2026-03-10',
    eventTime: '19:00',
    venue: 'Tech Hub Manila',
    packageType: 'Deluxe Package',
    hours: 6,
    price: 52500,
    status: 'confirmed',
    createdAt: '2026-02-03',
    paymentType: 'Full Payment',
    paymentMethod: 'Credit/Debit Card',
    amountPaid: 52500,
    remainingBalance: 0,
    proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
    proofFileName: 'credit_payment_003.jpg',
    paymentStatus: 'verified',
    paymentUploadedAt: '2026-02-03',
    paymentVerifiedAt: '2026-02-04',
  },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'view'>('list');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setViewMode('view');
  };

  const handleStatusChange = (bookingId: number, newStatus: BookingStatus) => {
    setBookings(
      bookings.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  const handlePaymentVerification = (bookingId: number, status: PaymentStatus, notes?: string) => {
    setBookings(
      bookings.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              paymentStatus: status,
              paymentVerifiedAt: status === 'verified' ? new Date().toISOString().split('T')[0] : b.paymentVerifiedAt,
              paymentNotes: notes || b.paymentNotes,
              status: status === 'verified' ? 'confirmed' : b.status,
            }
          : b
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-600/10 text-green-400 border-green-600/20';
      case 'pending':
        return 'bg-yellow-600/10 text-yellow-400 border-yellow-600/20';
      case 'completed':
        return 'bg-blue-600/10 text-blue-400 border-blue-600/20';
      case 'cancelled':
        return 'bg-red-600/10 text-red-400 border-red-600/20';
      default:
        return 'bg-gray-600/10 text-gray-400 border-gray-600/20';
    }
  };

  const getPaymentStatusColor = (status?: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-600/10 text-green-400 border-green-600/20';
      case 'pending':
        return 'bg-yellow-600/10 text-yellow-400 border-yellow-600/20';
      case 'rejected':
        return 'bg-red-600/10 text-red-400 border-red-600/20';
      default:
        return 'bg-gray-600/10 text-gray-400 border-gray-600/20';
    }
  };

  // Show booking details
  if (viewMode === 'view' && selectedBooking) {
    return (
      <ViewBookingPage
        booking={selectedBooking}
        onBack={() => setViewMode('list')}
        onStatusChange={handleStatusChange}
        onPaymentVerification={handlePaymentVerification}
      />
    );
  }

  // Show bookings list (default)
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-white mb-1">Bookings</h1>
          <p className="text-sm text-gray-400">Manage all event bookings and payments</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by client, event name, venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-white/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-light text-white">{booking.eventName}</h3>
                    <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    {booking.paymentStatus && (
                      <span className={`px-3 py-1 text-xs rounded-full border ${getPaymentStatusColor(booking.paymentStatus)}`}>
                        Payment: {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{booking.clientName} • {booking.eventType}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(booking.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{booking.eventTime} • {booking.hours}hrs</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{booking.venue}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <DollarSign className="w-4 h-4" />
                  <span>₱{booking.amountPaid?.toLocaleString()} / ₱{booking.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <div className="flex flex-col">
                  <p className="text-lg font-light text-white">₱{booking.price.toLocaleString()}</p>
                  {booking.remainingBalance !== undefined && booking.remainingBalance > 0 && (
                    <p className="text-xs text-yellow-400">Balance: ₱{booking.remainingBalance.toLocaleString()}</p>
                  )}
                </div>
                <button
                  onClick={() => handleViewDetails(booking)}
                  className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No bookings found</p>
        </div>
      )}
    </div>
  );
}

// View Booking Details Component
interface ViewBookingPageProps {
  booking: Booking;
  onBack: () => void;
  onStatusChange: (bookingId: number, newStatus: BookingStatus) => void;
  onPaymentVerification: (bookingId: number, status: PaymentStatus, notes?: string) => void;
}

function ViewBookingPage({ booking, onBack, onStatusChange, onPaymentVerification }: ViewBookingPageProps) {
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectNotes, setRejectNotes] = useState('');

  const handleVerifyPayment = () => {
    if (confirm('Verify this payment?')) {
      onPaymentVerification(booking.id, 'verified');
    }
  };

  const handleRejectPayment = () => {
    if (rejectNotes.trim()) {
      onPaymentVerification(booking.id, 'rejected', rejectNotes);
      setShowRejectDialog(false);
      setRejectNotes('');
    }
  };

  const getPaymentMethodIcon = (method?: string) => {
    switch (method?.toLowerCase()) {
      case 'gcash':
        return <Smartphone className="w-5 h-5" />;
      case 'bank transfer':
        return <Building2 className="w-5 h-5" />;
      case 'credit/debit card':
        return <CreditCard className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-light text-white mb-1">Booking Details</h1>
            <p className="text-sm text-gray-400">Booking ID: #{booking.id.toString().padStart(4, '0')}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Information */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-light text-white mb-4 pb-4 border-b border-zinc-800">
              Client Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Client Name</p>
                <p className="text-white">{booking.clientName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Email</p>
                <p className="text-white">{booking.clientEmail}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Phone</p>
                <p className="text-white">{booking.clientPhone}</p>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-light text-white mb-4 pb-4 border-b border-zinc-800">
              Event Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Event Name</p>
                <p className="text-white">{booking.eventName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Event Type</p>
                <p className="text-white">{booking.eventType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Event Date</p>
                <p className="text-white">{new Date(booking.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Event Time</p>
                <p className="text-white">{booking.eventTime}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Venue</p>
                <p className="text-white">{booking.venue}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Duration</p>
                <p className="text-white">{booking.hours} hours</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Package</p>
                <p className="text-white">{booking.packageType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Total Price</p>
                <p className="text-white">₱{booking.price.toLocaleString()}</p>
              </div>
              {booking.layout && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Preferred Layout</p>
                  <p className="text-white font-medium">Layout {booking.layout}</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Information */}
          {booking.paymentType && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-light text-white mb-4 pb-4 border-b border-zinc-800 flex items-center justify-between">
                Payment Information
                {booking.paymentStatus && (
                  <span className={`px-3 py-1 text-xs rounded-full border ${
                    booking.paymentStatus === 'verified' ? 'bg-green-600/10 text-green-400 border-green-600/20' :
                    booking.paymentStatus === 'rejected' ? 'bg-red-600/10 text-red-400 border-red-600/20' :
                    'bg-yellow-600/10 text-yellow-400 border-yellow-600/20'
                  }`}>
                    {booking.paymentStatus === 'verified' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                    {booking.paymentStatus === 'rejected' && <XCircle className="w-3 h-3 inline mr-1" />}
                    {booking.paymentStatus === 'pending' && <AlertCircle className="w-3 h-3 inline mr-1" />}
                    {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                  </span>
                )}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Payment Type</p>
                  <p className="text-white">{booking.paymentType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Payment Method</p>
                  <div className="flex items-center gap-2 text-white">
                    {getPaymentMethodIcon(booking.paymentMethod)}
                    <span>{booking.paymentMethod}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Amount Paid</p>
                  <p className="text-white">₱{booking.amountPaid?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Remaining Balance</p>
                  <p className={`${booking.remainingBalance === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                    ₱{booking.remainingBalance?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Uploaded At</p>
                  <p className="text-white">{booking.paymentUploadedAt ? new Date(booking.paymentUploadedAt).toLocaleDateString() : 'N/A'}</p>
                </div>
                {booking.paymentVerifiedAt && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Verified At</p>
                    <p className="text-white">{new Date(booking.paymentVerifiedAt).toLocaleDateString()}</p>
                  </div>
                )}
              </div>

              {/* Proof of Payment */}
              {booking.proofUrl && (
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <p className="text-sm text-gray-400 mb-3">Proof of Payment</p>
                  <div className="bg-black border border-zinc-700 rounded-lg p-4">
                    <img
                      src={booking.proofUrl}
                      alt="Payment Proof"
                      className="w-full h-64 object-contain rounded"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      <FileText className="w-3 h-3 inline mr-1" />
                      {booking.proofFileName}
                    </p>
                  </div>
                </div>
              )}

              {/* Payment Notes (if rejected) */}
              {booking.paymentNotes && (
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <p className="text-sm text-gray-400 mb-2">Admin Notes</p>
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <p className="text-red-400 text-sm">{booking.paymentNotes}</p>
                  </div>
                </div>
              )}

              {/* Payment Actions */}
              {booking.paymentStatus === 'pending' && (
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <p className="text-sm text-gray-400 mb-3">Payment Verification</p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleVerifyPayment}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Verify Payment
                    </button>
                    <button
                      onClick={() => setShowRejectDialog(true)}
                      className="flex-1 px-4 py-2 bg-red-600/10 border border-red-600/20 text-red-400 rounded-lg hover:bg-red-600/20 transition-colors flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject Payment
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Status */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-light text-white mb-4 pb-4 border-b border-zinc-800">
              Booking Status
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 mb-2">Current Status</p>
                <span className={`px-3 py-1 inline-flex text-xs font-medium rounded-full border ${
                  booking.status === 'confirmed' ? 'bg-green-600/10 text-green-400 border-green-600/20' :
                  booking.status === 'pending' ? 'bg-yellow-600/10 text-yellow-400 border-yellow-600/20' :
                  booking.status === 'completed' ? 'bg-blue-600/10 text-blue-400 border-blue-600/20' :
                  'bg-red-600/10 text-red-400 border-red-600/20'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>

              {booking.status === 'pending' && (
                <button
                  onClick={() => onStatusChange(booking.id, 'confirmed')}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Confirm Booking
                </button>
              )}

              {booking.status === 'confirmed' && (
                <button
                  onClick={() => onStatusChange(booking.id, 'completed')}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Mark as Completed
                </button>
              )}

              {(booking.status === 'pending' || booking.status === 'confirmed') && (
                <button
                  onClick={() => {
                    if (confirm('Cancel this booking?')) {
                      onStatusChange(booking.id, 'cancelled');
                    }
                  }}
                  className="w-full px-4 py-2 bg-red-600/10 border border-red-600/20 text-red-400 rounded-lg hover:bg-red-600/20 transition-colors"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-light text-white mb-4 pb-4 border-b border-zinc-800">
              Booking Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Created</span>
                <span className="text-white">{new Date(booking.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Package</span>
                <span className="text-white">{booking.packageType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Duration</span>
                <span className="text-white">{booking.hours} hours</span>
              </div>
              <div className="flex justify-between font-light pt-3 border-t border-zinc-800">
                <span className="text-white">Total</span>
                <span className="text-white">₱{booking.price.toLocaleString()}</span>
              </div>
              {booking.amountPaid !== undefined && (
                <>
                  <div className="flex justify-between text-sm text-green-400">
                    <span>Paid</span>
                    <span>₱{booking.amountPaid.toLocaleString()}</span>
                  </div>
                  {booking.remainingBalance !== undefined && booking.remainingBalance > 0 && (
                    <div className="flex justify-between text-sm text-yellow-400">
                      <span>Balance</span>
                      <span>₱{booking.remainingBalance.toLocaleString()}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reject Dialog */}
      {showRejectDialog && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-light text-white mb-4">Reject Payment</h3>
            <p className="text-sm text-gray-400 mb-4">
              Please provide a reason for rejecting this payment:
            </p>
            <textarea
              value={rejectNotes}
              onChange={(e) => setRejectNotes(e.target.value)}
              placeholder="e.g., Invalid proof of payment, incorrect amount..."
              className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors min-h-24"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowRejectDialog(false)}
                className="flex-1 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectPayment}
                disabled={!rejectNotes.trim()}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}