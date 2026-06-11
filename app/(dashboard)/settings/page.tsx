"use client";

import { useState } from 'react';

export default function SettingsPage() {
  const [platformName, setPlatformName] = useState('Admin Platform');
  const [supportEmail, setSupportEmail] = useState('support@platform.com');
  const [contactInfo, setContactInfo] = useState('+1 (555) 123-4567');
  const [platformStatus, setPlatformStatus] = useState('active'); // 'active' | 'maintenance'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage general platform settings and configuration</p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - General Settings */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">General Settings</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Platform Information</label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Platform Name</label>
                    <input
                      type="text"
                      value={platformName}
                      onChange={(e) => setPlatformName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Support Email</label>
                    <input
                      type="email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Contact Information</label>
                    <input
                      type="text"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="block text-xs font-medium text-gray-600 mb-2">Platform Status</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="platformStatus"
                      value="active"
                      checked={platformStatus === 'active'}
                      onChange={() => setPlatformStatus('active')}
                      className="w-4 h-4 text-gray-900"
                    />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="platformStatus"
                      value="maintenance"
                      checked={platformStatus === 'maintenance'}
                      onChange={() => setPlatformStatus('maintenance')}
                      className="w-4 h-4 text-gray-900"
                    />
                    <span className="text-sm text-gray-700">Maintenance Mode</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-3">
          <button className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
            Save Settings
          </button>
          <button className="w-full text-gray-600 text-xs font-medium py-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
