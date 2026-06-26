'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Save, FileCheck } from 'lucide-react';

export default function TermsAndConditionsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [title, setTitle] = useState('Terms & Conditions');
  const [content, setContent] = useState('');

  // Fetch existing terms
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/settings/legal/terms_and_conditions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = response.data?.data;
        if (data) {
          if (data.title) setTitle(data.title);
          if (data.content) setContent(data.content);
        }
      } catch (error) {
        console.error("Error fetching Terms & Conditions", error);
        // It might be 404 if not created yet, which is fine
      } finally {
        setLoading(false);
      }
    };
    
    fetchTerms();
  }, []);

  const handleSave = async (publish: boolean) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        title,
        content,
        publish
      };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/settings/legal/terms_and_conditions`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data?.message || `Terms & Conditions ${publish ? 'published' : 'draft saved'} successfully`);
    } catch (error: any) {
      console.error("Error saving terms", error);
      toast.error(error.response?.data?.message || 'Failed to save Terms & Conditions');
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
        <h1 className="text-2xl font-bold text-gray-800">Terms & Conditions</h1>
        <p className="text-gray-500 text-sm mt-1">Manage the terms and conditions for your platform.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            placeholder="e.g. Terms & Conditions"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Document Content</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-y font-mono"
            placeholder="Welcome to our platform. By using our services, you agree..."
          />
          <p className="text-xs text-gray-500 mt-2">You can write your terms and conditions here. This will be displayed to the users on the app.</p>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-70"
          >
            <FileCheck className="w-4 h-4" />
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
