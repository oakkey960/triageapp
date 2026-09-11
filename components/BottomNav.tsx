'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Home, FileText, Shield, Settings } from 'lucide-react';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'หน้าแรก', path: '/', icon: Home },
    { name: 'ประวัติ', path: '/history', icon: FileText },
    { name: 'ข้อมูลสุขภาพ', path: '/health', icon: Shield },
    { name: 'ตั้งค่า', path: '/settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto bg-white border-t border-gray-100 flex justify-around items-center h-[72px] pb-safe z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] w-full max-w-md">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        return (
          <div
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center cursor-pointer transition-colors ${
              isActive ? 'text-[#00897B]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon size={24} fill={isActive && item.name === 'หน้าแรก' ? 'currentColor' : 'none'} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
