"use client";

import { User, Camera } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [lastLogin, setLastLogin] = useState('');

  // Security state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = response.data?.data;
        if (data) {
          setFirstName(data.firstName || data.fullName?.split(' ')[0] || '');
          setLastName(data.lastName || data.fullName?.split(' ').slice(1).join(' ') || '');
          setEmail(data.email || '');
          setRole(data.role || '');
          setUsername(data.username || '');
          setStatus(data.status || 'inactive');
          setCreatedAt(data.createdAt || '');
          setLastLogin(data.lastLogin || '');
          if (data.profileImage) {
             setImagePreview(data.profileImage);
          }
        }
      } catch (error) {
        console.error("Error fetching admin profile", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    setSavingProfile(true);
    try {
      const token = localStorage.getItem('token');
      
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      
      if (imageFile) {
        formData.append('profileImage', imageFile);
      }
      
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/update`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      const updatedData = response.data?.data;
      if (updatedData) {
        setFirstName(updatedData.firstName || firstName);
        setLastName(updatedData.lastName || lastName);
        if (updatedData.profileImage) {
          setImagePreview(updatedData.profileImage);
        }
      }

      toast.success(response.data?.message || 'Profile updated successfully');
    } catch (error: any) {
      console.error("Error updating profile", error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please fill in both current and new passwords");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setSavingPassword(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        oldPassword: currentPassword,
        newPassword,
        confirmPassword
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/change-password`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success(response.data?.message || 'Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error("Error changing password", error);
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your profile information and security</p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Info & Security */}
        <div className="lg:col-span-2 space-y-6">
          {/* Information */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Information</h2>
            <div className="flex items-center gap-4 mb-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center relative cursor-pointer overflow-hidden group border border-gray-200 hover:border-gray-300 transition-all"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-blue-500" />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="text-sm text-gray-500">
                <p className="font-medium text-gray-800">Profile Image</p>
                <p className="text-xs">Click the avatar to upload a new image.</p>
              </div>
            </div>

            {loading ? (
              <div className="py-4 text-center text-gray-500 text-sm">Loading profile data...</div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Username</label>
                  <input
                    type="text"
                    value={username}
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm opacity-70 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm opacity-70 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Role</label>
                  <input
                    type="text"
                    value={role}
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm capitalize opacity-70 cursor-not-allowed"
                  />
                </div>
                <button
                  onClick={handleUpdateProfile}
                  disabled={savingProfile}
                  className="mt-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors disabled:opacity-70 flex items-center justify-center min-w-[120px]"
                >
                  {savingProfile ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Security</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-sm"
                />
              </div>
              <button
                onClick={handleChangePassword}
                disabled={savingPassword}
                className="mt-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors disabled:opacity-70 flex items-center justify-center min-w-[140px]"
              >
                {savingPassword ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Update Password'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Account Details */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Account Details</h2>

            {loading ? (
              <div className="py-4 text-gray-500 text-sm">Loading details...</div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Account Status</p>
                  <p className={`text-sm font-medium capitalize ${status === 'active' ? 'text-emerald-600' : 'text-gray-600'}`}>
                    {status}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Member Since</p>
                  <p className="text-sm text-gray-700">
                    {createdAt ? new Date(createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' }) : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last Login</p>
                  <p className="text-sm text-gray-700">
                    {lastLogin ? new Date(lastLogin).toLocaleString() : 'N/A'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
