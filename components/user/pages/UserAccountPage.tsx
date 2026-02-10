import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Save, X } from 'lucide-react';

interface UserAccountPageProps {
  currentUser: any;
}

export default function UserAccountPage({ currentUser }: UserAccountPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
  });

  const handleSave = () => {
    // In production, this would call an API to update user info
    console.log('Saving user data:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-white mb-1">Account Settings</h1>
          <p className="text-sm text-gray-400">Manage your account information</p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-black" />
          </div>
          <div>
            <h2 className="text-lg font-light text-white">{currentUser?.name}</h2>
            <p className="text-sm text-gray-400">{currentUser?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="w-full bg-black border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className="w-full bg-black border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full bg-black border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-light text-white mb-4">Security</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-black border border-zinc-700 rounded-lg">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-white">Password</p>
                <p className="text-xs text-gray-400">Last changed 30 days ago</p>
              </div>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-light text-white mb-4">Account Information</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-zinc-800">
            <span className="text-sm text-gray-400">Account Type</span>
            <span className="text-sm text-white">Customer</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-zinc-800">
            <span className="text-sm text-gray-400">Member Since</span>
            <span className="text-sm text-white">February 2026</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-400">User ID</span>
            <span className="text-sm text-white font-mono">#{currentUser?.id}</span>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
}

// Change Password Modal
interface ChangePasswordModalProps {
  onClose: () => void;
}

function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // In production, this would call an API to change password
    console.log('Changing password');
    setSuccess(true);
    
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-light text-white">Change Password</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-green-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Save className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-white mb-2">Password Changed Successfully</p>
            <p className="text-sm text-gray-400">Your password has been updated</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-600/10 border border-red-600/20 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-400 mb-2">Current Password</label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">New Password</label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                placeholder="••••••••"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                placeholder="••••••••"
                required
              />
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
                className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-200"
              >
                Change Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
