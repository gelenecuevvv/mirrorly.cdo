import React, { useState } from 'react';
import { DollarSign, Search, Filter, Check, X, Eye, ChevronLeft, CheckCircle, XCircle, AlertCircle, FileText, Smartphone, Building2, CreditCard } from 'lucide-react';

type PaymentStatus = 'pending' | 'verified' | 'rejected';

interface Payment {
  id: number;
  bookingId: number;
  eventName: string;
  clientName: string;
  eventType: string;
  eventDate: string;
  packageType: string;
  totalAmount: number;
  paymentType: string;
  paymentMethod: string;
  amountPaid: number;
  remainingBalance: number;
  status: PaymentStatus;
  proofUrl?: string;
  proofFileName?: string;
  uploadedAt: string;
  verifiedAt?: string;
  notes?: string;
}

const mockPayments: Payment[] = [
  {
    id: 1,
    bookingId: 1,
    eventName: 'Sarah & Mike Wedding',
    clientName: 'Sarah Johnson',
    eventType: 'Wedding',
    eventDate: '2026-03-15',
    packageType: 'Premium Package',
    totalAmount: 31250,
    paymentType: 'Half Payment',
    paymentMethod: 'GCash',
    amountPaid: 15625,
    remainingBalance: 15625,
    status: 'verified',
    proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
    proofFileName: 'gcash_payment_001.jpg',
    uploadedAt: '2026-02-05',
    verifiedAt: '2026-02-06',
  },
  {
    id: 2,
    bookingId: 2,
    eventName: "Isabella's 18th Birthday",
    clientName: 'Maria Isabella Cruz',
    eventType: 'Debut',
    eventDate: '2026-04-20',
    packageType: 'Standard Package',
    totalAmount: 18000,
    paymentType: 'Partial Payment',
    paymentMethod: 'Bank Transfer',
    amountPaid: 4500,
    remainingBalance: 13500,
    status: 'pending',
    proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
    proofFileName: 'bank_deposit_002.jpg',
    uploadedAt: '2026-02-05',
  },
  {
    id: 3,
    bookingId: 3,
    eventName: 'Corporate Anniversary Celebration',
    clientName: 'Michael Chen',
    eventType: 'Corporate Event',
    eventDate: '2026-03-10',
    packageType: 'Deluxe Package',
    totalAmount: 52500,
    paymentType: 'Full Payment',
    paymentMethod: 'Credit/Debit Card',
    amountPaid: 52500,
    remainingBalance: 0,
    status: 'verified',
    proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
    proofFileName: 'credit_payment_003.jpg',
    uploadedAt: '2026-02-03',
    verifiedAt: '2026-02-04',
  },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'details'>('list');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.eventType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setViewMode('details');
  };

  const handleVerify = (paymentId: number) => {
    if (confirm('Verify this payment?')) {
      setPayments(
        payments.map((p) =>
          p.id === paymentId
            ? { ...p, status: 'verified', verifiedAt: new Date().toISOString().split('T')[0] }
            : p
        )
      );
    }
  };

  const handleReject = (paymentId: number, notes: string) => {
    setPayments(
      payments.map((p) => (p.id === paymentId ? { ...p, status: 'rejected', notes } : p))
    );
  };

  const getStatusColor = (status: string) => {
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

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'gcash':
        return <Smartphone className="w-4 h-4" />;
      case 'bank transfer':
        return <Building2 className="w-4 h-4" />;
      case 'credit/debit card':
        return <CreditCard className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  // Calculate statistics
  const stats = {
    total: filteredPayments.reduce((sum, p) => sum + p.amountPaid, 0),
    pending: filteredPayments.filter((p) => p.status === 'pending').length,
    verified: filteredPayments.filter((p) => p.status === 'verified').length,
    rejected: filteredPayments.filter((p) => p.status === 'rejected').length,
  };

  if (viewMode === 'details' && selectedPayment) {
    return (
      <PaymentDetails
        payment={selectedPayment}
        onBack={() => setViewMode('list')}
        onVerify={handleVerify}
        onReject={handleReject}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-light text-white mb-1">Payments</h1>
        <p className="text-sm text-gray-400">Track and verify all payment transactions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-2">Total Received</p>
          <p className="text-2xl font-light text-white">₱{stats.total.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-2">Pending</p>
          <p className="text-2xl font-light text-yellow-400">{stats.pending}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-2">Verified</p>
          <p className="text-2xl font-light text-green-400">{stats.verified}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-2">Rejected</p>
          <p className="text-2xl font-light text-red-400">{stats.rejected}</p>
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
              placeholder="Search by client or event..."
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
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Event / Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Payment Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-white">{payment.eventName}</p>
                      <p className="text-xs text-gray-400">{payment.clientName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-white">{payment.paymentType}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-white">
                      {getPaymentMethodIcon(payment.paymentMethod)}
                      <span className="text-sm">{payment.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-white">₱{payment.amountPaid.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`text-sm ${payment.remainingBalance === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                      ₱{payment.remainingBalance.toLocaleString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs font-medium rounded-full border ${getStatusColor(payment.status)}`}>
                      {payment.status === 'verified' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                      {payment.status === 'rejected' && <XCircle className="w-3 h-3 inline mr-1" />}
                      {payment.status === 'pending' && <AlertCircle className="w-3 h-3 inline mr-1" />}
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(payment)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {payment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleVerify(payment.id)}
                            className="p-1 text-green-400 hover:text-green-300 transition-colors"
                            title="Verify Payment"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleViewDetails(payment)}
                            className="p-1 text-red-400 hover:text-red-300 transition-colors"
                            title="Reject Payment"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="p-12 text-center">
            <DollarSign className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No payments found</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Payment Details Component
interface PaymentDetailsProps {
  payment: Payment;
  onBack: () => void;
  onVerify: (paymentId: number) => void;
  onReject: (paymentId: number, notes: string) => void;
}

function PaymentDetails({ payment, onBack, onVerify, onReject }: PaymentDetailsProps) {
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectNotes, setRejectNotes] = useState('');

  const handleReject = () => {
    if (rejectNotes.trim()) {
      onReject(payment.id, rejectNotes);
      setShowRejectDialog(false);
      setRejectNotes('');
      onBack();
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
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
            <h1 className="text-2xl font-light text-white mb-1">Payment Details</h1>
            <p className="text-sm text-gray-400">Payment ID: #{payment.id.toString().padStart(4, '0')}</p>
          </div>
        </div>
        <span className={`px-4 py-2 text-sm rounded-full border ${
          payment.status === 'verified' ? 'bg-green-600/10 text-green-400 border-green-600/20' :
          payment.status === 'rejected' ? 'bg-red-600/10 text-red-400 border-red-600/20' :
          'bg-yellow-600/10 text-yellow-400 border-yellow-600/20'
        }`}>
          {payment.status === 'verified' && <CheckCircle className="w-4 h-4 inline mr-1" />}
          {payment.status === 'rejected' && <XCircle className="w-4 h-4 inline mr-1" />}
          {payment.status === 'pending' && <AlertCircle className="w-4 h-4 inline mr-1" />}
          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Information */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-light text-white mb-4 pb-4 border-b border-zinc-800">
              Event Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Event Name</p>
                <p className="text-white">{payment.eventName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Event Type</p>
                <p className="text-white">{payment.eventType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Event Date</p>
                <p className="text-white">{new Date(payment.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Package</p>
                <p className="text-white">{payment.packageType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Client Name</p>
                <p className="text-white">{payment.clientName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Booking ID</p>
                <p className="text-white">#{payment.bookingId.toString().padStart(4, '0')}</p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-light text-white mb-4 pb-4 border-b border-zinc-800">
              Payment Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Payment Type</p>
                <p className="text-white">{payment.paymentType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Payment Method</p>
                <div className="flex items-center gap-2 text-white">
                  {getPaymentMethodIcon(payment.paymentMethod)}
                  <span>{payment.paymentMethod}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Total Amount</p>
                <p className="text-white">₱{payment.totalAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Amount Paid</p>
                <p className="text-white">₱{payment.amountPaid.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Remaining Balance</p>
                <p className={payment.remainingBalance === 0 ? 'text-green-400' : 'text-yellow-400'}>
                  ₱{payment.remainingBalance.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Uploaded At</p>
                <p className="text-white">{new Date(payment.uploadedAt).toLocaleDateString()}</p>
              </div>
              {payment.verifiedAt && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Verified At</p>
                  <p className="text-white">{new Date(payment.verifiedAt).toLocaleDateString()}</p>
                </div>
              )}
            </div>

            {/* Proof of Payment */}
            {payment.proofUrl && (
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <p className="text-sm text-gray-400 mb-3">Proof of Payment</p>
                <div className="bg-black border border-zinc-700 rounded-lg p-4">
                  <img
                    src={payment.proofUrl}
                    alt="Payment Proof"
                    className="w-full h-96 object-contain rounded"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    <FileText className="w-3 h-3 inline mr-1" />
                    {payment.proofFileName}
                  </p>
                </div>
              </div>
            )}

            {/* Notes (if rejected) */}
            {payment.notes && (
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <p className="text-sm text-gray-400 mb-2">Admin Notes</p>
                <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <p className="text-red-400 text-sm">{payment.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          {payment.status === 'pending' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-light text-white mb-4 pb-4 border-b border-zinc-800">
                Payment Verification
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    onVerify(payment.id);
                    onBack();
                  }}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Verify Payment
                </button>
                <button
                  onClick={() => setShowRejectDialog(true)}
                  className="w-full px-4 py-2 bg-red-600/10 border border-red-600/20 text-red-400 rounded-lg hover:bg-red-600/20 transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Payment
                </button>
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-light text-white mb-4 pb-4 border-b border-zinc-800">
              Payment Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Amount</span>
                <span className="text-white">₱{payment.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Payment Type</span>
                <span className="text-white">{payment.paymentType}</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-zinc-800 text-green-400">
                <span>Amount Paid</span>
                <span>₱{payment.amountPaid.toLocaleString()}</span>
              </div>
              {payment.remainingBalance > 0 && (
                <div className="flex justify-between text-sm text-yellow-400">
                  <span>Remaining Balance</span>
                  <span>₱{payment.remainingBalance.toLocaleString()}</span>
                </div>
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
                onClick={handleReject}
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
