"use client";

import { useState } from 'react';

export default function PrivacyPage() {
  const [content, setContent] = useState(`We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose your information...

1. Information Collection
We collect information you provide directly to us, when you use our services, or through cookies.

2. How We Use Information
We use the information we collect to provide, maintain, and improve our services.

3. Information Sharing
We do not share, sell, or rent your personal information to third parties.

4. Data Security
We implement appropriate security measures to protect your personal information.

5. Your Rights
You have the right to access, update, or delete your information.

6. Cookies
We use cookies to enhance your experience on our website.

7. Changes to This Policy
We may update this privacy policy from time to time.`);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mt-1">Manage user information and data handling guidelines</p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Editor */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Editor</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Page Title</label>
                <input
                  type="text"
                  defaultValue="Privacy Policy"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Last Updated Date</label>
                <input
                  type="text"
                  defaultValue="2025-06-03"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Privacy Policy Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={14}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Preview</h2>
            <div className="border border-gray-200 rounded-xl p-6 max-w-md">
              <h3 className="text-base font-semibold text-gray-800 mb-1">Privacy Policy</h3>
              <p className="text-xs text-gray-500 mb-4">Last updated: 2025-06-03</p>
              <div className="text-xs text-gray-600 whitespace-pre-line">
                {content}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-3">
          <button className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
            Save Changes
          </button>
          <button className="w-full bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
            Publish Changes
          </button>
        </div>
      </div>
    </div>
  );
}
