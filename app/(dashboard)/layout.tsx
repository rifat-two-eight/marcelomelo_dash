'use client';

import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  User,
  ShieldCheck,
  CreditCard,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Groups', href: '/groups' },
  { icon: CreditCard, label: 'Subscriptions', href: '/subscriptions' },
  { icon: FileText, label: 'Terms & Conditions', href: '/terms' },
  { icon: ShieldCheck, label: 'Privacy Policy', href: '/privacy' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const [adminName, setAdminName] = useState('Admin User');
  const [adminInitial, setAdminInitial] = useState('A');
  const [adminImage, setAdminImage] = useState('');

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Dynamic import of axios to avoid changing imports manually at top
        const axios = (await import('axios')).default;

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = response.data?.data;
        if (data && data.fullName) {
          setAdminName(data.fullName);
          setAdminInitial(data.fullName.charAt(0).toUpperCase());
          setAdminImage(data.profileImage || '');
        }
      } catch (error) {
        console.error("Error fetching profile for navbar", error);
      }
    };

    fetchAdminProfile();
  }, [pathname]); // Refresh when pathname changes (e.g., after profile update)

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-6 border-b border-gray-200">
          <Image src="/logo.svg" alt="Logo" width={120} height={120} />
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <button
                key={index}
                onClick={() => router.push(item.href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? 'bg-[#e0f2fe] text-[#0369a1]'
                  : 'text-gray-600 hover:bg-[#f1f5f9] hover:text-[#030213]'
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
          <button
            onClick={() => router.push('/profile')}
            className={`w-full flex items-center justify-start px-4 py-2.5 rounded-lg transition-colors ${pathname === '/profile'
              ? 'bg-[#030213] text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
          >
            <span className="font-medium text-sm">Admin Profile</span>
          </button>

          <div className="h-px bg-gray-200 my-3" />

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-start gap-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top navbar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="hidden lg:block">
              <h2 className="text-lg font-semibold text-[#030213]">Admin Panel</h2>
            </div>

            <button
              onClick={() => router.push('/profile')}
              className="flex items-center gap-3 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-[#030213] capitalize">{adminName}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#030213] flex items-center justify-center text-white font-semibold overflow-hidden shadow-sm">
                {adminImage ? (
                  <img src={adminImage} alt={adminName} className="w-full h-full object-cover" />
                ) : (
                  adminInitial
                )}
              </div>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
