import React, { useState } from 'react';
import { Eye, EyeOff, Camera } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
  onSwitchToUser?: () => void;
}

export default function Login({ onLogin, onSwitchToUser }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock authentication - in production, this would call an API
    if (email === 'admin@photobooth.com' && password === 'admin123') {
      onLogin({
        id: 1,
        email: 'admin@photobooth.com',
        name: 'Admin User',
        role: 'admin'
      });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl mb-4">
            <Camera className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-light text-white mb-2">
            Mirror Photobooth
          </h1>
          <p className="text-gray-400 text-sm">Admin Portal</p>
        </div>

        {/* Login Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-light text-white mb-6">Sign In</h2>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                placeholder="admin@photobooth.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-gray-200 transition-all duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-800">
            <p className="text-xs text-gray-500 text-center">
              Demo credentials: admin@photobooth.com / admin123
            </p>
          </div>
        </div>

        {onSwitchToUser && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Not an admin?{' '}
              <button
                onClick={onSwitchToUser}
                className="text-white hover:underline"
              >
                Sign in as customer
              </button>
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            © 2026 Mirror Photobooth. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}