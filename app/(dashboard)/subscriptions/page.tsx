'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

export default function SubscriptionsPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Dropdown state
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Edit Modal state
  const [editingPlan, setEditingPlan] = useState<any | null>(null);
  const [editFormData, setEditFormData] = useState({ name: '', price: 0, isActive: true });
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleEditClick = (plan: any) => {
    setEditingPlan(plan);
    setEditFormData({
      name: plan.name,
      price: plan.price,
      isActive: plan.isActive
    });
    setOpenDropdownId(null);
  };

  const handleUpdatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    setIsUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/plans/${editingPlan._id}`,
        editFormData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data?.message || "Plan updated successfully");

      // Update state with the exact data returned by the backend
      const updatedPlan = response.data?.data;

      setPlans(prevPlans => prevPlans.map(p =>
        p._id === editingPlan._id ? (updatedPlan ? { ...p, ...updatedPlan } : { ...p, ...editFormData }) : p
      ));

      setEditingPlan(null);
    } catch (error) {
      console.error("Error updating plan", error);
      toast.error("Failed to update plan");
    } finally {
      setIsUpdating(false);
    }
  };

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
        <div className="overflow-x-auto min-h-[300px]">
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
                    <td className="py-4 relative">
                      <button
                        onClick={() => setOpenDropdownId(openDropdownId === plan._id ? null : plan._id)}
                        className="text-gray-400 hover:text-gray-600 relative z-10 p-1"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {openDropdownId === plan._id && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setOpenDropdownId(null)}
                          />
                          <div
                            className="absolute right-8 top-1/2 -translate-y-1/2 w-36 bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden"
                          >
                            <button
                              onClick={() => router.push(`/subscriptions/${plan._id}`)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors border-b border-gray-100"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => handleEditClick(plan)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            >
                              Edit Plan
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => !isUpdating && setEditingPlan(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 m-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">Edit Plan</h3>
              <button
                onClick={() => setEditingPlan(null)}
                className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
                disabled={isUpdating}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdatePlan} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({ ...editFormData, price: parseFloat(e.target.value) || 0 })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <button
                  type="button"
                  onClick={() => setEditFormData({ ...editFormData, isActive: !editFormData.isActive })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${editFormData.isActive ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${editFormData.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="pt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-70 flex items-center justify-center"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
