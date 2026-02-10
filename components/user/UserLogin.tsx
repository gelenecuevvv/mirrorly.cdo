import React, { useState } from 'react';
import { Camera, LogIn, UserPlus } from 'lucide-react';

interface UserLoginProps {
  onLogin: (user: any) => void;
  onSwitchToRegister: () => void;
}

export default function UserLogin({ onLogin, onSwitchToRegister }: UserLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock authentication - replace with real API call
    setTimeout(() => {
      if (email === 'user@test.com' && password === 'password') {
        onLogin({
          id: 1,
          name: 'John Doe',
          email: 'user@test.com',
          phone: '+63 912 345 6789',
          role: 'user',
        });
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl mb-4">
            <Camera className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-2xl font-light text-white mb-2">Mirror Booth</h1>
          <p className="text-sm text-gray-400">Sign in to manage your bookings</p>
        </div>

        {/* Login Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
          <h2 className="text-xl font-light text-white mb-6">Welcome Back</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-600/10 border border-red-600/20 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-800">
            <p className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-white hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 p-3 bg-zinc-800/50 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Demo Credentials:</p>
            <p className="text-xs text-gray-500">Email: user@test.com</p>
            <p className="text-xs text-gray-500">Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
}
