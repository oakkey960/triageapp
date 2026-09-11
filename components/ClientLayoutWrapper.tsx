'use client';
import { usePathname } from 'next/navigation';
import BottomNav from './BottomNav';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Pages that should show the BottomNav
  const showNavPages = ['/', '/history', '/health', '/settings'];
  const shouldShowNav = showNavPages.includes(pathname || '');

  return (
    <>
      <div className={"flex-1 flex flex-col " + (shouldShowNav ? 'pb-[72px]' : '')}>
        {children}
      </div>
      {shouldShowNav && <BottomNav />}
    </>
  );
}
