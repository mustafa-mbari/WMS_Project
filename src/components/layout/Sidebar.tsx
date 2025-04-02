'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaUsers, 
  FaBoxes, 
  FaShoppingCart, 
  FaClipboardList, 
  FaTachometerAlt, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      path: '/dashboard',
      name: 'لوحة التحكم',
      icon: <FaTachometerAlt className="ml-2" />
    },
    {
      path: '/dashboard/users',
      name: 'المستخدمين',
      icon: <FaUsers className="ml-2" />
    },
    {
      path: '/dashboard/inventory',
      name: 'المخزون',
      icon: <FaBoxes className="ml-2" />
    },
    {
      path: '/dashboard/products',
      name: 'المنتجات',
      icon: <FaShoppingCart className="ml-2" />
    },
    {
      path: '/dashboard/orders',
      name: 'الطلبات',
      icon: <FaClipboardList className="ml-2" />
    }
  ];

  const handleLogout = () => {
    // في بيئة الإنتاج، هنا سيتم تنفيذ عملية تسجيل الخروج
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      {/* الشريط الجانبي للشاشات الكبيرة */}
      <div 
        className={`bg-gray-800 text-white ${
          isCollapsed ? 'w-16' : 'w-64'
        } transition-all duration-300 ease-in-out hidden md:block`}
      >
        <div className="p-4 flex justify-between items-center">
          {!isCollapsed && (
            <h2 className="text-xl font-bold">نظام إدارة المستودعات</h2>
          )}
          <button 
            onClick={toggleSidebar} 
            className="p-1 rounded-full hover:bg-gray-700 focus:outline-none"
          >
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>
        
        <nav className="mt-5">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path} className="mb-2">
                <Link 
                  href={item.path}
                  className={`flex items-center py-2 px-4 ${
                    pathname === item.path 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  } rounded mx-2`}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
            <li className="mt-8">
              <button 
                onClick={handleLogout}
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 rounded mx-2 w-full"
              >
                <FaSignOutAlt className="ml-2" />
                {!isCollapsed && <span>تسجيل الخروج</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* زر القائمة للشاشات الصغيرة */}
      <div className="md:hidden fixed top-0 right-0 p-4 z-20">
        <button 
          onClick={toggleMobileMenu} 
          className="p-2 rounded-md bg-gray-800 text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* القائمة المنسدلة للشاشات الصغيرة */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 text-white z-10 md:hidden">
          <div className="p-4 mt-16">
            <nav>
              <ul>
                {menuItems.map((item) => (
                  <li key={item.path} className="mb-4">
                    <Link 
                      href={item.path}
                      className={`flex items-center py-2 px-4 ${
                        pathname === item.path 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-300 hover:bg-gray-700'
                      } rounded`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
                <li className="mt-8">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 rounded w-full"
                  >
                    <FaSignOutAlt className="ml-2" />
                    <span>تسجيل الخروج</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* المحتوى الرئيسي */}
      <div className="flex-1 overflow-auto">
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
