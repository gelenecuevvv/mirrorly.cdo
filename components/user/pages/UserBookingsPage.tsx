import React, { useState } from 'react';
import { Calendar, Plus, Eye, Edit, X, MapPin, Clock, User as UserIcon, ArrowLeft, Upload, Check as CheckIcon, FileText, Image } from 'lucide-react';
import CreateBookingFlow from './CreateBookingFlow';

// The original project referenced a Figma-only asset import. For local dev builds,
// we use a normal static file served from `/public`.
const layoutsImage = '/layouts-placeholder.svg';

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
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  layout?: string;
  paymentType?: string;
  paymentMethod?: string;
  proofUrl?: string;
  proofFileName?: string;
  amountPaid?: number;
  remainingBalance?: number;
  paymentStatus?: 'pending' | 'verified' | 'rejected';
  paymentUploadedAt?: string;
  paymentVerifiedAt?: string;
  paymentNotes?: string;
}

interface UserBookingsPageProps {
  currentUser: any;
}

const mockBookings: Booking[] = [
  {
    id: 1,
    eventName: 'Sarah & Mike Wedding',
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
];

export default function UserBookingsPage({ currentUser }: UserBookingsPageProps) {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'view' | 'edit'>('list');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleCreateComplete = (newBooking: any, payment: any) => {
    // In production, this would save to backend
    const bookingWithId = {
      ...newBooking,
      id: bookings.length + 1,
      paymentMethod: payment.paymentMethod,
      proofUrl: payment.proofFile ? URL.createObjectURL(payment.proofFile) : undefined,
      proofFileName: payment.proofFileName,
      paymentStatus: 'pending' as const,
      paymentUploadedAt: payment.uploadedAt,
    };
    setBookings([...bookings, bookingWithId]);
    setViewMode('list');
    
    console.log('Booking created:', bookingWithId);
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setViewMode('view');
  };

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setViewMode('edit');
  };

  const handleCancelBooking = (bookingId: number) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      ));
    }
  };

  const handleUpdateBooking = (updatedBooking: Booking) => {
    setBookings(bookings.map(b => b.id === updatedBooking.id ? updatedBooking : b));
    setViewMode('list');
  };

  // Show create booking flow
  if (viewMode === 'create') {
    return (
      <CreateBookingFlow
        currentUser={currentUser}
        onComplete={handleCreateComplete}
        onCancel={() => setViewMode('list')}
      />
    );
  }

  // Show view booking details
  if (viewMode === 'view' && selectedBooking) {
    return (
      <ViewBookingPage
        booking={selectedBooking}
        onBack={() => setViewMode('list')}
      />
    );
  }

  // Show edit booking
  if (viewMode === 'edit' && selectedBooking) {
    return (
      <EditBookingPage
        booking={selectedBooking}
        onSave={handleUpdateBooking}
        onCancel={() => setViewMode('list')}
      />
    );
  }

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

  // Show bookings list (default)
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-white mb-1">My Bookings</h1>
          <p className="text-sm text-gray-400">Manage your photobooth reservations</p>
        </div>
        <button
          onClick={() => setViewMode('create')}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          New Booking
        </button>
      </div>

      {/* Bookings List */}
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking) => (
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
                  </div>
                  <p className="text-sm text-gray-400">{booking.eventType} • {booking.packageType}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(booking.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{booking.eventTime} • {booking.hours} hours</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{booking.venue}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <p className="text-lg font-light text-white">₱{booking.price.toLocaleString()}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewBooking(booking)}
                    className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleEditBooking(booking)}
                        className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="px-4 py-2 bg-red-600/10 border border-red-600/20 text-red-400 rounded-lg hover:bg-red-600/20 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">No bookings yet</p>
          <button
            onClick={() => setViewMode('create')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Create Your First Booking
          </button>
        </div>
      )}
    </div>
  );
}

// View Booking Page (Full Page)
interface ViewBookingPageProps {
  booking: Booking;
  onBack: () => void;
}

function ViewBookingPage({ booking, onBack }: ViewBookingPageProps) {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Bookings
        </button>
        <h1 className="text-2xl font-light text-white mb-1">Booking Details</h1>
        <p className="text-sm text-gray-400">View your booking and payment information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Information */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-zinc-800">
              <h2 className="text-xl font-light text-white">{booking.eventName}</h2>
              <span className={`px-3 py-1.5 text-xs rounded-full border ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-400 mb-1">Event Type</p>
                <p className="text-sm text-white">{booking.eventType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Package</p>
                <p className="text-sm text-white">{booking.packageType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Event Date</p>
                <p className="text-sm text-white">
                  {new Date(booking.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Event Time</p>
                <p className="text-sm text-white">{booking.eventTime}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-400 mb-1">Venue</p>
                <p className="text-sm text-white">{booking.venue}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Duration</p>
                <p className="text-sm text-white">{booking.hours} hours</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Booked On</p>
                <p className="text-sm text-white">{new Date(booking.createdAt).toLocaleDateString()}</p>
              </div>
              {booking.layout && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Preferred Layout</p>
                  <p className="text-sm text-white font-medium">Layout {booking.layout}</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-light text-white mb-6">Payment Information</h3>

            {booking.paymentMethod ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <span className="text-sm text-gray-400">Payment Status</span>
                  <span className={`px-3 py-1 text-xs rounded-full border ${getPaymentStatusColor(booking.paymentStatus)}`}>
                    {booking.paymentStatus?.charAt(0).toUpperCase()}
                    {booking.paymentStatus?.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Payment Type</p>
                    <p className="text-sm text-white">{booking.paymentType || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Payment Method</p>
                    <p className="text-sm text-white">{booking.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Amount Paid</p>
                    <p className="text-lg font-light text-white">₱{booking.amountPaid?.toLocaleString() || '0'}</p>
                  </div>
                  {booking.remainingBalance && booking.remainingBalance > 0 && (
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Remaining Balance</p>
                      <p className="text-lg font-light text-yellow-400">₱{booking.remainingBalance.toLocaleString()}</p>
                    </div>
                  )}
                  {booking.paymentUploadedAt && (
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Uploaded</p>
                      <p className="text-sm text-white">{new Date(booking.paymentUploadedAt).toLocaleDateString()}</p>
                    </div>
                  )}
                  {booking.paymentVerifiedAt && (
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Verified</p>
                      <p className="text-sm text-white">{new Date(booking.paymentVerifiedAt).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>

                {/* Proof of Payment */}
                {booking.proofUrl && (
                  <div className="pt-4 border-t border-zinc-800">
                    <p className="text-sm text-gray-400 mb-3">Proof of Payment</p>
                    <div className="bg-black border border-zinc-700 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{booking.proofFileName}</p>
                        </div>
                      </div>
                    </div>
                    <img
                      src={booking.proofUrl}
                      alt="Payment proof"
                      className="w-full h-auto rounded-lg border border-zinc-700"
                    />
                  </div>
                )}

                {/* Status Messages */}
                {booking.paymentStatus === 'verified' && (
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-400" />
                      <p className="text-sm text-green-400">Payment has been verified</p>
                    </div>
                  </div>
                )}

                {booking.paymentStatus === 'pending' && (
                  <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                    <p className="text-sm text-yellow-400">
                      Your payment is being reviewed. You will be notified once it's verified.
                    </p>
                  </div>
                )}

                {booking.paymentStatus === 'rejected' && booking.paymentNotes && (
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <p className="text-sm text-red-400 mb-1">Payment was rejected</p>
                    <p className="text-xs text-red-400/70">{booking.paymentNotes}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Upload className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">No payment information yet</p>
                <p className="text-sm text-gray-500">Payment proof will appear here once uploaded</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Summary */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-light text-white mb-4">Price Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Package Rate</span>
                <span className="text-white">₱{(booking.price / (booking.hours / 4)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Duration</span>
                <span className="text-white">{booking.hours} hours</span>
              </div>
              <div className="h-px bg-zinc-700" />
              <div className="flex justify-between">
                <span className="text-white font-light">Total</span>
                <span className="text-2xl font-light text-white">₱{booking.price.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-light text-white mb-4">Actions</h3>
            <div className="space-y-2">
              <button
                onClick={onBack}
                className="w-full px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Edit Booking Page (Full Page)
interface EditBookingPageProps {
  booking: Booking;
  onSave: (booking: Booking) => void;
  onCancel: () => void;
}

function EditBookingPage({ booking, onSave, onCancel }: EditBookingPageProps) {
  const [formData, setFormData] = useState({
    eventName: booking.eventName,
    eventType: booking.eventType,
    eventDate: booking.eventDate,
    eventTime: booking.eventTime,
    venue: booking.venue,
    packageType: booking.packageType,
    hours: booking.hours,
    layout: booking.layout || '',
  });
  const [showLayoutsModal, setShowLayoutsModal] = useState(false);

  const packages = {
    'Starter Package': 7499,
    'Standard Package': 8999,
    'Deluxe Package': 11999,
    'Premium Package': 14999,
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const calculatedPrice = packages[formData.packageType as keyof typeof packages] * (formData.hours / 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...booking,
      ...formData,
      price: calculatedPrice,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Cancel
        </button>
        <h1 className="text-2xl font-light text-white mb-1">Edit Booking</h1>
        <p className="text-sm text-gray-400">Update your booking details</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Event Name *</label>
                <input
                  type="text"
                  value={formData.eventName}
                  onChange={(e) => handleChange('eventName', e.target.value)}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Event Type *</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => handleChange('eventType', e.target.value)}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  required
                >
                  <option>Wedding</option>
                  <option>Debut</option>
                  <option>Birthday</option>
                  <option>Corporate Event</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Event Date *</label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleChange('eventDate', e.target.value)}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Event Time *</label>
                <input
                  type="time"
                  value={formData.eventTime}
                  onChange={(e) => handleChange('eventTime', e.target.value)}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Venue *</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => handleChange('venue', e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Package *</label>
                <select
                  value={formData.packageType}
                  onChange={(e) => handleChange('packageType', e.target.value)}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  required
                >
                  <option>Starter Package</option>
                  <option>Standard Package</option>
                  <option>Deluxe Package</option>
                  <option>Premium Package</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Duration (Hours) *</label>
                <input
                  type="number"
                  min="2"
                  max="12"
                  value={formData.hours}
                  onChange={(e) => handleChange('hours', parseInt(e.target.value))}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm text-gray-400">Preferred Layout</label>
                <button
                  type="button"
                  onClick={() => setShowLayoutsModal(true)}
                  className="flex items-center gap-1 text-xs text-white hover:text-gray-300 transition-colors"
                >
                  <Image className="w-4 h-4" />
                  View Layouts
                </button>
              </div>
              <input
                type="text"
                value={formData.layout}
                onChange={(e) => handleChange('layout', e.target.value.toUpperCase())}
                maxLength={1}
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors uppercase"
                placeholder="Enter layout letter (A-R)"
              />
              <p className="text-xs text-gray-500 mt-1">Choose from layouts A through R</p>
            </div>

            <div className="bg-black border border-zinc-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Updated Price:</span>
                <span className="text-2xl font-light text-white">₱{calculatedPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Layouts Modal */}
      {showLayoutsModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowLayoutsModal(false)}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-light text-white">Available Layouts</h2>
              <button
                onClick={() => setShowLayoutsModal(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <img
                src={layoutsImage}
                alt="Photo booth layout options A through R"
                className="w-full h-auto rounded-lg"
              />
              <p className="text-sm text-gray-400 mt-4 text-center">
                Choose from layouts A through R and enter the letter in the form
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}