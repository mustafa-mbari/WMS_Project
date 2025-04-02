import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تسجيل الدخول | نظام إدارة المستودعات',
  description: 'صفحة تسجيل الدخول لنظام إدارة المستودعات',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl">
      {children}
    </div>
  );
}
