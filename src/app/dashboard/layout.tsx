import { Metadata } from 'next';
import Sidebar from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'لوحة التحكم | نظام إدارة المستودعات',
  description: 'لوحة التحكم الرئيسية لنظام إدارة المستودعات',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      {children}
    </Sidebar>
  );
}
