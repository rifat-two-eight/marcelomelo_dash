"use client";

import { User } from 'lucide-react';
import { useState } from 'react';

export default function AdminProfilePage() {
  const [name, setName] = useState('Admin User');
  const [email, setEmail] = useState('admin@platform.com');
  const [role, setRole] = useState('Super Administrator');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your profile information and security</p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Info & Security */}
        <div className="lg:col-span-2 space-y-6">
          {/* Information */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Information</h2>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-10 h-10 text-blue-500" />
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                />
              </div>
              <button className="mt-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Security</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                />
              </div>
              <button className="mt-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Account Details */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Account Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Account Status</p>
                <p className="text-sm font-medium text-emerald-600">Active</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Member Since</p>
                <p className="text-sm text-gray-700">January 2024</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Last Login</p>
                <p className="text-sm text-gray-700">June 3, 2026 at 10:30 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
