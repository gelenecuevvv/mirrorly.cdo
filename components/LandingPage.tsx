import React, { useState, useEffect } from 'react';
import { Camera, ChevronLeft, ChevronRight, Check, ArrowRight, Star } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onAdminLogin: () => void;
}

const carouselImages = [
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
    caption: 'Elegant Wedding Celebrations',
  },
  {
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200',
    caption: 'Unforgettable Debut Moments',
  },
  {
    url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200',
    caption: 'Birthday Party Fun',
  },
  {
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200',
    caption: 'Corporate Events & Celebrations',
  },
  {
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200',
    caption: 'Capture Every Special Moment',
  },
];

const features = [
  '65" Interactive Mirror Touchscreen',
  'Boomerang & GIF features',
  'Instant photo capture & sharing',
  'High-quality photo prints',
  'Free use of props',
  'Customized photo templates',
  'Professional on-site booth attendant',
];

const packages = [
  {
    name: 'Starter',
    price: '₱7,499',
    duration: '3 hours',
    features: ['Digital Only', 'Unlimited Sessions', 'QR Code/Email Delivery', 'Standard Props'],
  },
  {
    name: 'Standard',
    price: '₱8,999',
    duration: '3 hours',
    features: ['Up to 40 Prints', 'Photo Standee', '1 Layout Choice', 'Digital Copies'],
    highlighted: true,
  },
  {
    name: 'Deluxe',
    price: '₱11,999',
    duration: '3 hours',
    features: ['Up to 80 Prints (Strips/4R)', 'Photo Standee', '2 Layout Choices', 'Digital Copies'],
  },
  {
    name: 'Premium',
    price: '₱14,999',
    duration: '3 hours',
    features: ['Up to 100 Prints', 'Photo Standee', '3 Layout Choices', 'Free Souvenir', 'Priority Setup'],
  },
];

export default function LandingPage({ onGetStarted, onAdminLogin }: LandingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Camera className="w-6 h-6 text-white" />
              <span className="text-white font-light">Mirror Booth</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={onAdminLogin}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Admin
              </button>
              <button
                onClick={onGetStarted}
                className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Carousel */}
      <section className="relative h-screen pt-16">
        {/* Carousel */}
        <div className="relative h-full overflow-hidden">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Carousel Controls */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentSlide(index);
                }}
                className={`h-1 rounded-full transition-all ${
                  index === currentSlide ? 'w-8 bg-white' : 'w-4 bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center px-4 max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-light text-white mb-6">
                Capture Your
                <br />
                <span className="font-normal">Special Moments</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
                {carouselImages[currentSlide].caption}
              </p>
              <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                Premium mirror photobooth rentals for weddings, debuts, birthdays, and corporate events.
                Create unforgettable memories with instant prints and digital sharing.
              </p>
              <button
                onClick={onGetStarted}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-lg rounded-lg hover:bg-gray-200 transition-all duration-200 shadow-xl hover:shadow-2xl"
              >
                <span className="font-light">BOOK NOW!</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4">Why Choose Mirror Booth?</h2>
            <p className="text-gray-400">Premium features for your special events</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-black border border-zinc-800 rounded-xl p-6 hover:border-white/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-black" />
                  </div>
                  <p className="text-white font-light">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4">Our Packages</h2>
            <p className="text-gray-400">Choose the perfect package for your event</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-zinc-900 border rounded-xl p-8 ${
                  pkg.highlighted
                    ? 'border-white scale-105'
                    : 'border-zinc-800 hover:border-white/30'
                } transition-all duration-200`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-sm rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-light text-white mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-light text-white mb-2">{pkg.price}</div>
                  <p className="text-sm text-gray-400">{pkg.duration}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onGetStarted}
                  className={`w-full py-3 rounded-lg transition-all duration-200 ${
                    pkg.highlighted
                      ? 'bg-white text-black hover:bg-gray-200'
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                >
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Ready to Book Your Event?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Create an account now and reserve your date today!
          </p>
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-3 px-12 py-5 bg-white text-black text-xl rounded-lg hover:bg-gray-200 transition-all duration-200 shadow-xl hover:shadow-2xl"
          >
            <span className="font-light">BOOK NOW!</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-white" />
              <span className="text-white font-light">Mirror Booth</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2026 Mirror Booth. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}