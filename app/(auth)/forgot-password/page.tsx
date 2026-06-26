'use client';

import { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password`, {
        email
      });

      toast.success(response.data?.message || 'OTP sent to your email.');
      // Redirect to reset password page to enter OTP
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      console.error("Error in forgot password", error);
      toast.error(error.response?.data?.message || 'Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] px-4">
      <div className="mb-8">
        <Image src="/logo.svg" alt="Logo" width={160} height={160} className="w-auto h-auto max-w-[200px]" />
      </div>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#030213] mb-2">Forgot Password</h1>
          <p className="text-gray-600">Enter your email to receive an OTP</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ color: '#030213', backgroundColor: 'white' }}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#030213]/20 focus:border-[#030213] transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#030213] text-white font-semibold rounded-xl hover:bg-[#1a1929] transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Send OTP'
            )}
          </button>
          
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-[#030213] transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </button>
        </form>
      </div>
    </div>
  );
}
