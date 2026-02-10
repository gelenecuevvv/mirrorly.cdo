import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Save, Eye, EyeOff } from 'lucide-react';

interface AccountPageProps {
  currentUser: any;
}

export default function AccountPage({ currentUser }: AccountPageProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-light text-white mb-1">Account Settings</h1>
        <p className="text-sm text-gray-400">Manage your account information</p>
      </div>

      {/* Tabs */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="flex border-b border-zinc-800">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 px-6 py-3 text-sm font-light transition-colors ${
              activeTab === 'profile'
                ? 'bg-black text-yellow-600 border-b-2 border-yellow-600'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`flex-1 px-6 py-3 text-sm font-light transition-colors ${
              activeTab === 'password'
                ? 'bg-black text-yellow-600 border-b-2 border-yellow-600'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Change Password
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'profile' ? (
            <ProfileTab currentUser={currentUser} />
          ) : (
            <PasswordTab />
          )}
        </div>
      </div>
    </div>
  );
}

interface ProfileTabProps {
  currentUser: any;
}

function ProfileTab({ currentUser }: ProfileTabProps) {
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '+1 234-567-8900',
    role: currentUser?.role || 'admin',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Mock save - in production, this would call an API
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 bg-gradient-to-br from-yellow-600 to-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-3xl text-black font-medium">
            {formData.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-light text-white mb-1">{formData.name}</h3>
          <p className="text-sm text-gray-400 mb-3">{formData.role}</p>
          <button className="px-4 py-2 bg-zinc-800 text-white text-sm rounded-lg hover:bg-zinc-700 transition-colors">
            Change Photo
          </button>
        </div>
      </div>

      <div className="border-t border-zinc-800 pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-yellow-600 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-yellow-600 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-yellow-600 transition-colors"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Role</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={formData.role}
                  disabled
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end pt-4 border-t border-zinc-800">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black rounded-lg hover:from-yellow-500 hover:to-yellow-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Account Info */}
      <div className="border-t border-zinc-800 pt-6">
        <h3 className="text-lg font-light text-white mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black border border-zinc-800 rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Account Status</p>
            <span className="px-3 py-1 inline-flex text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
              Active
            </span>
          </div>
          <div className="bg-black border border-zinc-800 rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Member Since</p>
            <p className="text-white">January 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PasswordTab() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsSaving(true);

    // Mock save - in production, this would call an API
    setTimeout(() => {
      setIsSaving(false);
      alert('Password changed successfully!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
        <p className="text-sm text-yellow-600">
          <strong>Password Requirements:</strong> At least 8 characters with a mix of uppercase,
          lowercase, numbers, and special characters.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Current Password */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Current Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type={showPasswords.current ? 'text' : 'password'}
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              className="w-full bg-black border border-zinc-700 rounded-lg pl-10 pr-12 py-3 text-white focus:outline-none focus:border-yellow-600 transition-colors"
              required
            />
            <button
              type="button"
              onClick={() =>
                setShowPasswords({ ...showPasswords, current: !showPasswords.current })
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type={showPasswords.new ? 'text' : 'password'}
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              className="w-full bg-black border border-zinc-700 rounded-lg pl-10 pr-12 py-3 text-white focus:outline-none focus:border-yellow-600 transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full bg-black border border-zinc-700 rounded-lg pl-10 pr-12 py-3 text-white focus:outline-none focus:border-yellow-600 transition-colors"
              required
            />
            <button
              type="button"
              onClick={() =>
                setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end pt-4 border-t border-zinc-800">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black rounded-lg hover:from-yellow-500 hover:to-yellow-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lock className="w-5 h-5" />
            {isSaving ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
}
