import React, { useState, useRef } from 'react';
import { DollarSign, Upload, Check, Clock, X as XIcon, Eye, FileText } from 'lucide-react';

interface Payment {
  id: number;
  bookingId: number;
  bookingName: string;
  amount: number;
  status: 'pending' | 'verified' | 'rejected';
  proofUrl?: string;
  proofFileName?: string;
  uploadedAt?: string;
  verifiedAt?: string;
  notes?: string;
}

interface UserPaymentsPageProps {
  currentUser: any;
}

const mockPayments: Payment[] = [
  {
    id: 1,
    bookingId: 1,
    bookingName: 'Sarah & Mike Wedding',
    amount: 25000,
    status: 'verified',
    proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400',
    proofFileName: 'payment_proof_001.jpg',
    uploadedAt: '2026-02-05',
    verifiedAt: '2026-02-06',
  },
  {
    id: 2,
    bookingId: 2,
    bookingName: "Isabella's 18th Birthday",
    amount: 18000,
    status: 'pending',
  },
];

export default function UserPaymentsPage({ currentUser }: UserPaymentsPageProps) {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const handleViewProof = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowViewModal(true);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <Check className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <XIcon className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const pendingPayments = payments.filter(p => p.status === 'pending' && !p.proofUrl);
  const totalPaid = payments.filter(p => p.status === 'verified').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-white mb-1">Payments</h1>
          <p className="text-sm text-gray-400">Track and manage your booking payments</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Total Paid</p>
            <div className="w-10 h-10 bg-green-600/10 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-light text-white">₱{totalPaid.toLocaleString()}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Pending Verification</p>
            <div className="w-10 h-10 bg-yellow-600/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <p className="text-2xl font-light text-white">₱{totalPending.toLocaleString()}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Payments to Upload</p>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Upload className="w-5 h-5 text-black" />
            </div>
          </div>
          <p className="text-2xl font-light text-white">{pendingPayments.length}</p>
        </div>
      </div>

      {/* Pending Uploads Alert */}
      {pendingPayments.length > 0 && (
        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Upload className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-yellow-400 font-light mb-1">
                You have {pendingPayments.length} payment{pendingPayments.length !== 1 ? 's' : ''} waiting for proof of payment
              </p>
              <p className="text-xs text-yellow-400/70">
                Upload your payment proof to confirm your booking
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Payments List */}
      {payments.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-white/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-light text-white">{payment.bookingName}</h3>
                    <span className={`px-3 py-1 text-xs rounded-full border flex items-center gap-1 ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">Booking ID: #{payment.bookingId}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-light text-white">₱{payment.amount.toLocaleString()}</p>
                </div>
              </div>

              {payment.proofUrl && (
                <div className="bg-black border border-zinc-700 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{payment.proofFileName}</p>
                      <p className="text-xs text-gray-400">Uploaded: {payment.uploadedAt}</p>
                    </div>
                    <button
                      onClick={() => handleViewProof(payment)}
                      className="text-sm text-white hover:underline"
                    >
                      View
                    </button>
                  </div>
                </div>
              )}

              {payment.status === 'verified' && payment.verifiedAt && (
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3 mb-4">
                  <p className="text-xs text-green-400">
                    ✓ Payment verified on {new Date(payment.verifiedAt).toLocaleDateString()}
                  </p>
                </div>
              )}

              {payment.status === 'rejected' && payment.notes && (
                <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-3 mb-4">
                  <p className="text-xs text-red-400 mb-1">Payment rejected</p>
                  <p className="text-xs text-red-400/70">{payment.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-800">
                {!payment.proofUrl && payment.status === 'pending' && (
                  <button
                    onClick={() => {
                      setSelectedPayment(payment);
                      setShowUploadModal(true);
                    }}
                    className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Proof of Payment
                  </button>
                )}
                {payment.proofUrl && payment.status === 'pending' && (
                  <button
                    onClick={() => {
                      setSelectedPayment(payment);
                      setShowUploadModal(true);
                    }}
                    className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Re-upload Proof
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <DollarSign className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No payments yet</p>
        </div>
      )}

      {/* Upload Proof Modal */}
      {showUploadModal && selectedPayment && (
        <UploadProofModal
          payment={selectedPayment}
          onClose={() => setShowUploadModal(false)}
          onUpload={(file) => {
            setPayments(payments.map(p =>
              p.id === selectedPayment.id
                ? {
                    ...p,
                    proofUrl: URL.createObjectURL(file),
                    proofFileName: file.name,
                    uploadedAt: new Date().toISOString().split('T')[0],
                  }
                : p
            ));
            setShowUploadModal(false);
          }}
        />
      )}

      {/* View Proof Modal */}
      {showViewModal && selectedPayment && (
        <ViewProofModal
          payment={selectedPayment}
          onClose={() => setShowViewModal(false)}
        />
      )}
    </div>
  );
}

// Upload Proof Modal
interface UploadProofModalProps {
  payment: Payment;
  onClose: () => void;
  onUpload: (file: File) => void;
}

function UploadProofModal({ payment, onClose, onUpload }: UploadProofModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-lg w-full p-6 my-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-light text-white">Upload Proof of Payment</h2>
            <p className="text-sm text-gray-400 mt-1">{payment.bookingName}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-black border border-zinc-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Amount to Pay:</span>
              <span className="text-xl font-light text-white">₱{payment.amount.toLocaleString()}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Payment Proof Image *</label>
            {!preview ? (
              <div
                className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center hover:border-white transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">
                  Drag and drop your payment proof here, or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  Supports: JPG, PNG (Screenshots, bank receipts, etc.)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={preview}
                  alt="Payment proof preview"
                  className="w-full h-auto rounded-lg border-2 border-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition-colors"
                >
                  <XIcon className="w-4 h-4" />
                </button>
                {selectedFile && (
                  <div className="mt-2 p-3 bg-black rounded-lg">
                    <p className="text-sm text-white truncate">{selectedFile.name}</p>
                    <p className="text-xs text-gray-400">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-3">
            <p className="text-xs text-yellow-400">
              Please ensure your payment proof is clear and shows the transaction details, amount, and date.
            </p>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedFile}
              className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Proof
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// View Proof Modal
interface ViewProofModalProps {
  payment: Payment;
  onClose: () => void;
}

function ViewProofModal({ payment, onClose }: ViewProofModalProps) {
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

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[60] p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors shadow-lg"
        title="Close (Esc)"
      >
        <XIcon className="w-6 h-6" />
      </button>

      <div className="relative max-w-4xl w-full my-8" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-light text-white">{payment.bookingName}</h2>
              <p className="text-sm text-gray-400">Payment Proof</p>
            </div>
            <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(payment.status)}`}>
              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            </span>
          </div>
        </div>

        <img
          src={payment.proofUrl}
          alt="Payment proof"
          className="w-full h-auto rounded-xl border-2 border-white"
        />

        <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Amount</p>
              <p className="text-lg font-light text-white">₱{payment.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Uploaded</p>
              <p className="text-sm text-white">{payment.uploadedAt}</p>
            </div>
            {payment.verifiedAt && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Verified</p>
                <p className="text-sm text-white">{payment.verifiedAt}</p>
              </div>
            )}
          </div>

          {payment.notes && (
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <p className="text-xs text-gray-400 mb-1">Admin Notes</p>
              <p className="text-sm text-white">{payment.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
