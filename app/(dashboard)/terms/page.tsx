"use client";

import { useState } from 'react';

export default function TermsPage() {
  const [content, setContent] = useState(`Welcome to our platform. By using our services, you agree to these terms and conditions...

1. Acceptance of Terms
By accessing and using this platform, you accept and agree to be bound by the terms and provisions of this agreement.

2. Use License
Permission is granted to temporarily access the materials on our platform for personal, non-commercial transitory viewing only.

3. User Accounts
You are responsible for maintaining the confidentiality of your account and password.

4. Prohibited Uses
You may not use the platform for any illegal or unauthorized purpose.

5. Disclaimer
The materials on our platform are provided on an 'as is' basis.`);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Terms & Conditions</h1>
        <p className="text-gray-500 text-sm mt-1">Manage platform terms and legal agreements</p>
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
                  defaultValue="Terms & Conditions"
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
                <label className="block text-xs font-medium text-gray-600 mb-1">Terms Content</label>
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
              <h3 className="text-base font-semibold text-gray-800 mb-1">Terms & Conditions</h3>
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
