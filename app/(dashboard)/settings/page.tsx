'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

export default function GeneralSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    platformName: '',
    supportEmail: '',
    contactPhone: '',
    status: 'active'
  });

  // Fetch existing general settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/settings/general`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = response.data?.data;
        if (data) {
          setFormData({
            platformName: data.platformName || '',
            supportEmail: data.supportEmail || '',
            contactPhone: data.contactPhone || '',
            status: data.status || 'active'
          });
        }
      } catch (error) {
        console.error("Error fetching General Settings", error);
        toast.error("Failed to load General Settings");
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/settings/general`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data?.message || 'General settings updated successfully');
    } catch (error: any) {
      console.error("Error saving general settings", error);
      toast.error(error.response?.data?.message || 'Failed to update General Settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">General Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure global platform details and support contacts.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
            <input 
              type="text"
              value={formData.platformName}
              onChange={(e) => setFormData({...formData, platformName: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="e.g. Bondi Admin Platform"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
            <input 
              type="email"
              value={formData.supportEmail}
              onChange={(e) => setFormData({...formData, supportEmail: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="e.g. support@platform.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
            <input 
              type="text"
              value={formData.contactPhone}
              onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="e.g. +1 (555) 123-4567"
              required
            />
          </div>
          
          <div className="md:col-span-2 flex items-center justify-between border-t border-gray-100 pt-6 mt-2">
            <div>
              <p className="text-sm font-medium text-gray-700">Platform Status</p>
              <p className="text-xs text-gray-500 mt-0.5">Toggle whether the platform is active or under maintenance.</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({...formData, status: formData.status === 'active' ? 'inactive' : 'active'})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-70"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
