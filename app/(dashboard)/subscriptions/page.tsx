'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

export default function SubscriptionsPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription/admin/plans`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPlans(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching plans", error);
        toast.error("Failed to load subscription plans");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

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
                <th className="pb-3 text-xs font-semibold text-gray-600">Plan Type</th>
                <th className="pb-3 text-xs font-semibold text-gray-600">Duration</th>
                <th className="pb-3 text-xs font-semibold text-gray-600">Listing Limit</th>
                <th className="pb-3 text-xs font-semibold text-gray-600">Status</th>
                <th className="pb-3 text-xs font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-gray-500">Loading plans...</td>
                </tr>
              ) : plans.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-gray-500">No plans found.</td>
                </tr>
              ) : (
                plans.map((plan) => (
                  <tr key={plan._id} className="py-3">
                    <td className="py-4 text-sm font-medium text-gray-800 flex items-center gap-2">
                      {plan.name}
                      {plan.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                          {plan.badge}
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-sm text-gray-600">${plan.price}</td>
                    <td className="py-4 text-sm text-gray-600 capitalize">{plan.planType?.replace('_', ' ')}</td>
                    <td className="py-4 text-sm text-gray-600">{plan.durationDays} Days</td>
                    <td className="py-4 text-sm text-gray-600">
                      {plan.listingLimit === -1 ? 'Unlimited' : plan.listingLimit}
                    </td>
                    <td className="py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${plan.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {plan.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
