"use client";

import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateSubscriptionPage() {
  const [status, setStatus] = useState(true);
  const [duration, setDuration] = useState('Monthly');
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => router.push('/subscriptions')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Create Subscription Plan</h1>
        <p className="text-gray-500 text-sm mt-1">Set up a new subscription tier</p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Plan Info */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Plan Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Plan Name</label>
                <input
                  type="text"
                  placeholder="Enter plan name"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Plan Description</label>
                <textarea
                  placeholder="Enter plan description"
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Pricing</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Subscription Price</label>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Duration</label>
                <div className="space-y-2">
                  {['Monthly', 'Quarterly', 'Yearly'].map((d) => (
                    <label key={d} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="duration"
                        checked={duration === d}
                        onChange={() => setDuration(d)}
                        className="w-4 h-4 text-gray-900"
                      />
                      <span className="text-sm text-gray-700">{d}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Features Included</h2>
            <div className="space-y-2">
              {['Access to Trading', 'Access to Groups', 'Unlimited Listings'].map((feat, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={i < 2}
                    className="w-4 h-4 text-gray-900"
                  />
                  <span className="text-sm text-gray-700">{feat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Status</h2>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Active</span>
              <button
                onClick={() => setStatus(!status)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  status ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    status ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2">
            <button className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
              Save Plan
            </button>
            <button className="w-full bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
              Publish Plan
            </button>
            <button
              onClick={() => router.push('/subscriptions')}
              className="w-full text-gray-600 text-xs font-medium py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
