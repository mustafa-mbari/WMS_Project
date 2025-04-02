'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // التحقق من صحة المدخلات
    if (!username || !password) {
      setError('الرجاء إدخال اسم المستخدم وكلمة المرور');
      setLoading(false);
      return;
    }

    try {
      // في بيئة الإنتاج، هنا سيتم إرسال طلب إلى الخادم للتحقق من بيانات المستخدم
      // لأغراض العرض التوضيحي، سنقوم بمحاكاة عملية تسجيل الدخول
      
      // محاكاة تأخير الاتصال بالخادم
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // التحقق من بيانات تسجيل الدخول (للعرض التوضيحي فقط)
      if (username === 'admin' && password === 'admin123') {
        // تخزين حالة تسجيل الدخول في التخزين المحلي
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ username, role: 'admin' }));
        
        // توجيه المستخدم إلى لوحة التحكم
        router.push('/dashboard');
      } else {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">نظام إدارة المستودعات</h1>
          <p className="text-gray-600 mt-2">تسجيل الدخول إلى حسابك</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-right">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 text-right">
              اسم المستخدم
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              dir="rtl"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-right">
              كلمة المرور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              dir="rtl"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="#" className="font-medium text-blue-600 hover:text-blue-500">
                نسيت كلمة المرور؟
              </Link>
            </div>
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-900">
                تذكرني
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ملاحظة: للعرض التوضيحي، استخدم اسم المستخدم: admin وكلمة المرور: admin123
          </p>
        </div>
      </div>
    </div>
  );
}
