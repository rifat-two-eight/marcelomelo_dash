"use client";

import { Plus, Search, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';

const plans = [
  {
    name: 'Basic Plan',
    price: '$9.99',
    duration: 'Monthly',
    subscribers: 1234,
    status: 'Active',
  },
  {
    name: 'Pro Plan',
    price: '$19.99',
    duration: 'Monthly',
    subscribers: 892,
    status: 'Active',
  },
  {
    name: 'Premium Plan',
    price: '$49.99',
    duration: 'Monthly',
    subscribers: 456,
    status: 'Active',
  },
  {
    name: 'Enterprise Plan',
    price: '$99.99',
    duration: 'Monthly',
    subscribers: 123,
    status: 'Active',
  },
  {
    name: 'Annual Basic',
    price: '$99.99',
    duration: 'Yearly',
    subscribers: 567,
    status: 'Inactive',
  },
];

export default function SubscriptionsPage() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Subscription Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage subscription plans and pricing</p>
        </div>
        <button
          onClick={() => router.push('/subscriptions/create')}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Plan
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Subscription Plans</h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-xs font-semibold text-gray-600">Plan Name</th>
                <th className="pb-3 text-xs font-semibold text-gray-600">Price</th>
                <th className="pb-3 text-xs font-semibold text-gray-600">Duration</th>
                <th className="pb-3 text-xs font-semibold text-gray-600">Subscribers</th>
                <th className="pb-3 text-xs font-semibold text-gray-600">Status</th>
                <th className="pb-3 text-xs font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {plans.map((plan, index) => (
                <tr key={index} className="py-3">
                  <td className="py-4 text-sm font-medium text-gray-800">{plan.name}</td>
                  <td className="py-4 text-sm text-gray-600">{plan.price}</td>
                  <td className="py-4 text-sm text-gray-600">{plan.duration}</td>
                  <td className="py-4 text-sm text-gray-600">{plan.subscribers}</td>
                  <td className="py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        plan.status === 'Active'
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {plan.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
