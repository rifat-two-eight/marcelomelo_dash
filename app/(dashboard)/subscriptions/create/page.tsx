"use client";

import { ArrowLeft, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

export default function CreateSubscriptionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Status is handled as isActive
  const [isActive, setIsActive] = useState(true);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    duration: 'monthly',
    durationDays: 30,
    planType: 'free',
    listingLimit: 0,
    listingValidityDays: 30,
  });

  const [features, setFeatures] = useState({
    accessToTrading: false,
    accessToGroups: false,
    unlimitedListings: false,
  });

  const [displayFeatures, setDisplayFeatures] = useState<string[]>(['']);

  const handleDisplayFeatureChange = (index: number, value: string) => {
    const newFeatures = [...displayFeatures];
    newFeatures[index] = value;
    setDisplayFeatures(newFeatures);
  };

  const addDisplayFeature = () => {
    setDisplayFeatures([...displayFeatures, '']);
  };

  const removeDisplayFeature = (index: number) => {
    const newFeatures = displayFeatures.filter((_, i) => i !== index);
    if (newFeatures.length === 0) newFeatures.push(''); // Keep at least one
    setDisplayFeatures(newFeatures);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const validDisplayFeatures = displayFeatures.filter(f => f.trim() !== '');

      const payload = {
        ...formData,
        features,
        displayFeatures: validDisplayFeatures,
        isActive
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/plans`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data?.message || 'Subscription plan created successfully');
      router.push('/subscriptions');
    } catch (error: any) {
      console.error("Error creating plan", error);
      toast.error(error.response?.data?.message || 'Failed to create subscription plan');
    } finally {
      setLoading(false);
    }
  };

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
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Plan Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter plan name"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Plan Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter plan description"
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Limits */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Pricing & Configuration</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Subscription Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Plan Type</label>
                <select 
                  value={formData.planType}
                  onChange={e => setFormData({...formData, planType: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                >
                  <option value="free">Free</option>
                  <option value="per_listing">Per Listing</option>
                  <option value="package">Package</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Duration String</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={e => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g. monthly"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Duration Days</label>
                <input
                  type="number"
                  value={formData.durationDays}
                  onChange={e => setFormData({ ...formData, durationDays: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Listing Limit (-1 for unlimited)</label>
                <input
                  type="number"
                  value={formData.listingLimit}
                  onChange={e => setFormData({ ...formData, listingLimit: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Listing Validity (Days)</label>
                <input
                  type="number"
                  value={formData.listingValidityDays}
                  onChange={e => setFormData({ ...formData, listingValidityDays: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Features Included</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={features.accessToTrading}
                  onChange={() => setFeatures({ ...features, accessToTrading: !features.accessToTrading })}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Access to Trading</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={features.accessToGroups}
                  onChange={() => setFeatures({ ...features, accessToGroups: !features.accessToGroups })}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Access to Groups</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={features.unlimitedListings}
                  onChange={() => setFeatures({ ...features, unlimitedListings: !features.unlimitedListings })}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Unlimited Listings</span>
              </label>
            </div>
          </div>

          {/* Display Features */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-700">Display Features</h2>
              <button 
                onClick={addDisplayFeature}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 bg-blue-50 px-2 py-1 rounded"
              >
                <Plus className="w-3 h-3" /> Add Feature
              </button>
            </div>
            
            <div className="space-y-2">
              {displayFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={feature}
                    onChange={e => handleDisplayFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                  <button
                    onClick={() => removeDisplayFeature(index)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
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
              <span className="text-sm text-gray-700">{isActive ? 'Active' : 'Inactive'}</span>
              <button
                onClick={() => setIsActive(!isActive)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  isActive ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    isActive ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2">
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors flex justify-center items-center h-10 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Save Plan'
              )}
            </button>
            <button className="w-full bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors h-10">
              Publish Plan
            </button>
            <button
              onClick={() => router.push('/subscriptions')}
              className="w-full text-gray-600 text-xs font-medium py-2 mt-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
