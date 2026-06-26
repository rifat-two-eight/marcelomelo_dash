'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

export default function SubscriptionPlanDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPlanDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // It's common to fetch the specific plan directly. If the backend doesn't have 
        // a GET /plans/:id, we fetch all and filter, but we'll try direct first.
        // Or we can fetch all admin plans and find it to be safe.
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription/admin/plans`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const allPlans = response.data?.data || [];
        const foundPlan = allPlans.find((p: any) => p._id === id);
        
        if (foundPlan) {
          setPlan(foundPlan);
        } else {
          toast.error('Plan not found');
          router.push('/subscriptions');
        }
      } catch (error) {
        console.error("Error fetching plan details", error);
        toast.error('Failed to load plan details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlanDetails();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!plan) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Plan Details</h1>
          <p className="text-gray-500 text-sm mt-1">Viewing detailed information for {plan.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  plan.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {plan.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {plan.name}
              {plan.badge && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                  {plan.badge}
                </span>
              )}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">{plan.description || 'No description provided.'}</p>
            
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500 font-medium">Price</p>
                <p className="text-xl font-bold text-gray-900">${plan.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Type</p>
                <p className="text-xl font-bold text-gray-900 capitalize">{plan.planType?.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Duration</p>
                <p className="text-xl font-bold text-gray-900">{plan.durationDays} Days</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 border-b pb-3 mb-4">Configuration Limits</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-sm text-gray-500 font-medium mb-1">Listing Limit</p>
                <p className="text-lg font-bold text-gray-900">
                  {plan.listingLimit === -1 ? 'Unlimited' : plan.listingLimit}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-sm text-gray-500 font-medium mb-1">Listing Validity</p>
                <p className="text-lg font-bold text-gray-900">
                  {plan.listingValidityDays} Days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 border-b pb-3 mb-4">Toggle Features</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                {plan.features?.accessToTrading ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-gray-300" />}
                <span className={`text-sm ${plan.features?.accessToTrading ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Access to Trading</span>
              </li>
              <li className="flex items-center gap-3">
                {plan.features?.accessToGroups ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-gray-300" />}
                <span className={`text-sm ${plan.features?.accessToGroups ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Access to Groups</span>
              </li>
              <li className="flex items-center gap-3">
                {plan.features?.unlimitedListings ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-gray-300" />}
                <span className={`text-sm ${plan.features?.unlimitedListings ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Unlimited Listings</span>
              </li>
              <li className="flex items-center gap-3">
                {plan.features?.tradeOffersUnlocked ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-gray-300" />}
                <span className={`text-sm ${plan.features?.tradeOffersUnlocked ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Trade Offers Unlocked</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 border-b pb-3 mb-4">Display Features</h3>
            {plan.displayFeatures && plan.displayFeatures.length > 0 ? (
              <ul className="space-y-2">
                {plan.displayFeatures.map((feat: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-600">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic">No display features listed.</p>
            )}
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm text-center">
             <p className="text-xs text-gray-400 mb-1">Plan ID</p>
             <p className="text-xs font-mono text-gray-600 bg-white border border-gray-200 py-1.5 rounded-lg select-all">{plan._id}</p>
             <p className="text-xs text-gray-400 mt-4 mb-1">Created At</p>
             <p className="text-xs text-gray-600">{new Date(plan.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
