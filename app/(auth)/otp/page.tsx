'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.every(digit => digit)) {
      router.push('/set-new-password');
    }
  };

  const handleResend = () => {
    alert('OTP resent!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <button
          onClick={() => router.push('/forgot-password')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#030213] mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#030213] mb-2">Verify OTP</h1>
          <p className="text-gray-600">We've sent a 4-digit code to your email</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                style={{ color: '#030213', backgroundColor: 'white' }}
                className="w-16 h-16 text-center text-2xl font-bold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#030213]/20 focus:border-[#030213] transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={!otp.every(digit => digit)}
            className="w-full py-3 bg-[#030213] text-white font-semibold rounded-xl hover:bg-[#1a1929] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verify
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Didn't receive the code?{' '}
            <button
              onClick={handleResend}
              className="text-[#030213] font-semibold hover:underline"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
