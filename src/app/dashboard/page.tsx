'use client';

import { FaUsers, FaBoxes, FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import Link from 'next/link';

export default function Dashboard() {
  // بيانات إحصائية للعرض (بيانات وهمية للعرض التوضيحي)
  const stats = [
    { title: 'المستخدمين', value: '24', icon: <FaUsers size={24} />, path: '/dashboard/users', color: 'bg-blue-500' },
    { title: 'المخزون', value: '156', icon: <FaBoxes size={24} />, path: '/dashboard/inventory', color: 'bg-green-500' },
    { title: 'المنتجات', value: '45', icon: <FaShoppingCart size={24} />, path: '/dashboard/products', color: 'bg-purple-500' },
    { title: 'الطلبات', value: '13', icon: <FaClipboardList size={24} />, path: '/dashboard/orders', color: 'bg-orange-500' },
  ];

  // بيانات آخر الطلبات (بيانات وهمية للعرض التوضيحي)
  const recentOrders = [
    { id: 'ORD-001', customer: 'أحمد محمد', date: '2025-04-01', status: 'مكتمل', amount: '1,250 ر.س' },
    { id: 'ORD-002', customer: 'سارة أحمد', date: '2025-04-01', status: 'قيد التنفيذ', amount: '850 ر.س' },
    { id: 'ORD-003', customer: 'محمد علي', date: '2025-03-31', status: 'مكتمل', amount: '2,100 ر.س' },
    { id: 'ORD-004', customer: 'فاطمة خالد', date: '2025-03-30', status: 'ملغي', amount: '750 ر.س' },
    { id: 'ORD-005', customer: 'عبدالله سعيد', date: '2025-03-30', status: 'مكتمل', amount: '1,500 ر.س' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">مرحباً بك في نظام إدارة المستودعات</h1>
        <p className="text-gray-600">نظرة عامة على أداء النظام والإحصائيات الرئيسية</p>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link href={stat.path} key={index}>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-full`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* آخر الطلبات */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">آخر الطلبات</h2>
          <Link href="/dashboard/orders" className="text-blue-600 hover:text-blue-800">
            عرض الكل
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  رقم الطلب
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العميل
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المبلغ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'مكتمل' ? 'bg-green-100 text-green-800' : 
                        order.status === 'قيد التنفيذ' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* معلومات النظام */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">معلومات النظام</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-600 mb-1">إصدار النظام</p>
            <p className="font-medium">1.0.0</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-600 mb-1">آخر تحديث</p>
            <p className="font-medium">2 أبريل 2025</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-600 mb-1">حالة النظام</p>
            <p className="font-medium text-green-600">نشط</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-600 mb-1">عدد المستخدمين النشطين</p>
            <p className="font-medium">8</p>
          </div>
        </div>
      </div>
    </div>
  );
}
