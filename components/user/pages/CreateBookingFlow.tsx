import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Upload, X, Check, CreditCard, Building2, Smartphone, Image } from 'lucide-react';

// The original project referenced a Figma-only asset import. For local dev builds,
// we use a normal static file served from `/public`.
const layoutsImage = '/layouts-placeholder.svg';

interface CreateBookingFlowProps {
  currentUser: any;
  onComplete: (booking: any, payment: any) => void;
  onCancel: () => void;
}

const packages = {
  'Starter Package': 7499,
  'Standard Package': 8999,
  'Deluxe Package': 11999,
  'Premium Package': 14999,
};

const paymentMethods = [
  { id: 'gcash', name: 'GCash', icon: Smartphone },
  { id: 'bank', name: 'Bank Transfer', icon: Building2 },
  { id: 'credit', name: 'Credit/Debit Card', icon: CreditCard },
];

const paymentTypes = [
  { id: 'partial', label: 'Partial Payment', percentage: 25, description: '25% down payment' },
  { id: 'half', label: 'Half Payment', percentage: 50, description: '50% down payment' },
  { id: 'full', label: 'Full Payment', percentage: 100, description: 'Pay in full' },
];

export default function CreateBookingFlow({ currentUser, onComplete, onCancel }: CreateBookingFlowProps) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    eventName: '',
    eventType: 'Wedding',
    eventDate: '',
    eventTime: '',
    venue: '',
    packageType: 'Standard Package',
    hours: 3,
    layout: '',
  });
  const [paymentData, setPaymentData] = useState({
    paymentType: '',
    paymentMethod: '',
    proofFile: null as File | null,
    proofPreview: null as string | null,
  });
  const [showLayoutsModal, setShowLayoutsModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculatedPrice = packages[bookingData.packageType as keyof typeof packages] * (bookingData.hours / 4);
  const selectedPaymentType = paymentTypes.find(pt => pt.id === paymentData.paymentType);
  const amountToPay = selectedPaymentType ? (calculatedPrice * selectedPaymentType.percentage) / 100 : 0;
  const remainingBalance = calculatedPrice - amountToPay;

  const handleBookingChange = (field: string, value: any) => {
    setBookingData({ ...bookingData, [field]: value });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPaymentData({
        ...paymentData,
        proofFile: file,
        proofPreview: URL.createObjectURL(file),
      });
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
        setPaymentData({
          ...paymentData,
          proofFile: file,
          proofPreview: URL.createObjectURL(file),
        });
      }
    }
  };

  const handleRemoveFile = () => {
    setPaymentData({
      ...paymentData,
      proofFile: null,
      proofPreview: null,
    });
  };

  const handleProceedToPayment = () => {
    setStep(2);
  };

  const handleSubmit = () => {
    const booking = {
      ...bookingData,
      price: calculatedPrice,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    const payment = {
      paymentType: paymentData.paymentType,
      paymentMethod: paymentData.paymentMethod,
      proofFile: paymentData.proofFile,
      proofFileName: paymentData.proofFile?.name,
      amountPaid: amountToPay,
      totalAmount: calculatedPrice,
      remainingBalance: remainingBalance,
      status: 'pending',
      uploadedAt: new Date().toISOString().split('T')[0],
    };

    onComplete(booking, payment);
  };

  const isStep1Valid = () => {
    return (
      bookingData.eventName &&
      bookingData.eventType &&
      bookingData.eventDate &&
      bookingData.eventTime &&
      bookingData.venue &&
      bookingData.packageType &&
      bookingData.hours
    );
  };

  const isStep2Valid = () => {
    return paymentData.paymentType && paymentData.paymentMethod && paymentData.proofFile;
  };

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Bookings
          </button>
          <h1 className="text-3xl font-light text-white mb-2">Create New Booking</h1>
          <p className="text-gray-400">Complete the form to book your photobooth</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  step === 1
                    ? 'bg-white text-black border-white'
                    : step > 1
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-gray-400 border-gray-600'
                }`}
              >
                {step > 1 ? <Check className="w-5 h-5" /> : '1'}
              </div>
              <span className={`text-sm ${step === 1 ? 'text-white' : 'text-gray-400'}`}>
                Booking Details
              </span>
            </div>

            <div className="w-16 h-0.5 bg-gray-600">
              <div
                className={`h-full bg-white transition-all duration-300 ${
                  step > 1 ? 'w-full' : 'w-0'
                }`}
              />
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  step === 2
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-gray-400 border-gray-600'
                }`}
              >
                2
              </div>
              <span className={`text-sm ${step === 2 ? 'text-white' : 'text-gray-400'}`}>
                Payment
              </span>
            </div>
          </div>
        </div>

        {/* Step 1: Booking Details */}
        {step === 1 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
            <h2 className="text-xl font-light text-white mb-6">Event Information</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Event Name *</label>
                  <input
                    type="text"
                    value={bookingData.eventName}
                    onChange={(e) => handleBookingChange('eventName', e.target.value)}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                    placeholder="e.g., Sarah & Mike Wedding"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Event Type *</label>
                  <select
                    value={bookingData.eventType}
                    onChange={(e) => handleBookingChange('eventType', e.target.value)}
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
                    value={bookingData.eventDate}
                    onChange={(e) => handleBookingChange('eventDate', e.target.value)}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Event Time *</label>
                  <input
                    type="time"
                    value={bookingData.eventTime}
                    onChange={(e) => handleBookingChange('eventTime', e.target.value)}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Venue *</label>
                <input
                  type="text"
                  value={bookingData.venue}
                  onChange={(e) => handleBookingChange('venue', e.target.value)}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                  placeholder="e.g., Grand Ballroom, Manila Hotel"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Package *</label>
                  <select
                    value={bookingData.packageType}
                    onChange={(e) => handleBookingChange('packageType', e.target.value)}
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
                    value={bookingData.hours || ''}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      handleBookingChange('hours', isNaN(value) ? 4 : value);
                    }}
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
                  value={bookingData.layout}
                  onChange={(e) => handleBookingChange('layout', e.target.value.toUpperCase())}
                  maxLength={1}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors uppercase"
                  placeholder="Enter layout letter (A-R)"
                />
                <p className="text-xs text-gray-500 mt-1">Choose from layouts A through R</p>
              </div>

              {/* Price Summary */}
              <div className="bg-black border border-zinc-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Base Price ({bookingData.packageType}):</span>
                  <span className="text-white">₱{packages[bookingData.packageType as keyof typeof packages].toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Duration:</span>
                  <span className="text-white">{bookingData.hours} hours</span>
                </div>
                <div className="h-px bg-zinc-700 my-3" />
                <div className="flex items-center justify-between">
                  <span className="text-lg text-white">Total Amount:</span>
                  <span className="text-2xl font-light text-white">₱{calculatedPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-800">
                <button
                  onClick={onCancel}
                  className="px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceedToPayment}
                  disabled={!isStep1Valid()}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Payment
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
            <h2 className="text-xl font-light text-white mb-6">Payment Information</h2>

            <div className="space-y-6">
              {/* Booking Summary */}
              <div className="bg-black border border-zinc-700 rounded-lg p-6">
                <h3 className="text-lg font-light text-white mb-4">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Event:</span>
                    <span className="text-white">{bookingData.eventName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="text-white">
                      {new Date(bookingData.eventDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Package:</span>
                    <span className="text-white">{bookingData.packageType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{bookingData.hours} hours</span>
                  </div>
                  <div className="h-px bg-zinc-700 my-3" />
                  <div className="flex justify-between">
                    <span className="text-white font-light">Total Amount:</span>
                    <span className="text-xl font-light text-white">₱{calculatedPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Type Selection */}
              <div>
                <label className="block text-sm text-gray-400 mb-3">Select Payment Type *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paymentTypes.map((type) => {
                    const isSelected = paymentData.paymentType === type.id;

                    return (
                      <button
                        key={type.id}
                        onClick={() => setPaymentData({ ...paymentData, paymentType: type.id })}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          isSelected
                            ? 'border-white bg-white/5'
                            : 'border-zinc-700 hover:border-white/50'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className={`text-sm ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                            {type.label}
                          </span>
                          <span className={`text-xs ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                            {type.description}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm text-gray-400 mb-3">Select Payment Method *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentData.paymentMethod === method.id;

                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentData({ ...paymentData, paymentMethod: method.id })}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          isSelected
                            ? 'border-white bg-white/5'
                            : 'border-zinc-700 hover:border-white/50'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Icon className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                          <span className={`text-sm ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                            {method.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Instructions */}
              {paymentData.paymentMethod && (
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                  <h4 className="text-sm text-yellow-400 mb-2 font-light">Payment Instructions</h4>
                  {paymentData.paymentMethod === 'gcash' && (
                    <div className="text-xs text-yellow-400/80 space-y-1">
                      <p>• Send payment to GCash: 0917-123-4567</p>
                      <p>• Name: Mirror Booth Services</p>
                      <p>• Take a screenshot of your payment confirmation</p>
                    </div>
                  )}
                  {paymentData.paymentMethod === 'bank' && (
                    <div className="text-xs text-yellow-400/80 space-y-1">
                      <p>• Bank: BDO / BPI / Metrobank</p>
                      <p>• Account Name: Mirror Booth Services Inc.</p>
                      <p>• Account Number: 1234-5678-9012</p>
                      <p>• Upload your deposit slip or online transfer receipt</p>
                    </div>
                  )}
                  {paymentData.paymentMethod === 'credit' && (
                    <div className="text-xs text-yellow-400/80 space-y-1">
                      <p>• Process your payment through your bank's online portal</p>
                      <p>• Upload a screenshot of the successful transaction</p>
                    </div>
                  )}
                </div>
              )}

              {/* Upload Proof of Payment */}
              <div>
                <label className="block text-sm text-gray-400 mb-3">Upload Proof of Payment *</label>
                {!paymentData.proofPreview ? (
                  <div
                    className="border-2 border-dashed border-zinc-700 rounded-lg p-12 text-center hover:border-white transition-colors cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">
                      Drag and drop your payment proof here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500">
                      Supports: JPG, PNG (Screenshots, receipts, deposit slips)
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
                      src={paymentData.proofPreview}
                      alt="Payment proof preview"
                      className="w-full h-auto rounded-lg border-2 border-white"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition-colors shadow-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    {paymentData.proofFile && (
                      <div className="mt-3 p-4 bg-black border border-zinc-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-white truncate">{paymentData.proofFile.name}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {(paymentData.proofFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Check className="w-5 h-5 text-green-400" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Payment Summary */}
              {paymentData.paymentType && (
                <div className="bg-black border border-zinc-700 rounded-lg p-6">
                  <h3 className="text-lg font-light text-white mb-4">Payment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Total Booking Amount:</span>
                      <span className="text-white">₱{calculatedPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Payment Type:</span>
                      <span className="text-white">{selectedPaymentType?.label} ({selectedPaymentType?.percentage}%)</span>
                    </div>
                    <div className="h-px bg-zinc-700 my-3" />
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-white font-light">Amount to Pay Now:</span>
                      <span className="text-2xl font-light text-white">₱{amountToPay.toLocaleString()}</span>
                    </div>
                    {remainingBalance > 0 && (
                      <div className="flex items-center justify-between pt-2 border-t border-zinc-700 mt-3">
                        <span className="text-sm text-gray-400">Remaining Balance:</span>
                        <span className="text-sm text-yellow-400">₱{remainingBalance.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-zinc-800">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isStep2Valid()}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check className="w-5 h-5" />
                  Submit Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

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