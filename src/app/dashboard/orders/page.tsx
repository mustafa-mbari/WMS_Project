'use client';

import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaEye, FaFileInvoice, FaShippingFast, FaCheck, FaTimes } from 'react-icons/fa';

// نموذج بيانات الطلب
interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  orderDate: string;
  deliveryDate: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  totalAmount: number;
  items: OrderItem[];
}

// نموذج بيانات عنصر الطلب
interface OrderItem {
  id: number;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// بيانات وهمية للطلبات للعرض التوضيحي
const initialOrders: Order[] = [
  {
    id: 1,
    orderNumber: 'ORD-001',
    customerName: 'أحمد محمد',
    customerPhone: '0501234567',
    customerEmail: 'ahmed@example.com',
    orderDate: '2025-04-01',
    deliveryDate: '2025-04-05',
    status: 'مكتمل',
    paymentStatus: 'مدفوع',
    paymentMethod: 'بطاقة ائتمان',
    totalAmount: 4500,
    items: [
      { id: 1, productId: 'P001', productName: 'لابتوب HP ProBook', quantity: 1, unitPrice: 3500, totalPrice: 3500 },
      { id: 2, productId: 'P006', productName: 'ماوس لاسلكي', quantity: 2, unitPrice: 120, totalPrice: 240 },
      { id: 3, productId: 'P007', productName: 'لوحة مفاتيح', quantity: 3, unitPrice: 250, totalPrice: 750 }
    ]
  },
  {
    id: 2,
    orderNumber: 'ORD-002',
    customerName: 'سارة أحمد',
    customerPhone: '0551234567',
    customerEmail: 'sara@example.com',
    orderDate: '2025-04-01',
    deliveryDate: '2025-04-06',
    status: 'قيد التنفيذ',
    paymentStatus: 'مدفوع',
    paymentMethod: 'تحويل بنكي',
    totalAmount: 2800,
    items: [
      { id: 1, productId: 'P002', productName: 'هاتف سامسونج جالاكسي S22', quantity: 1, unitPrice: 2800, totalPrice: 2800 }
    ]
  },
  {
    id: 3,
    orderNumber: 'ORD-003',
    customerName: 'محمد علي',
    customerPhone: '0561234567',
    customerEmail: 'mohamed@example.com',
    orderDate: '2025-03-31',
    deliveryDate: '2025-04-04',
    status: 'مكتمل',
    paymentStatus: 'مدفوع',
    paymentMethod: 'بطاقة ائتمان',
    totalAmount: 2100,
    items: [
      { id: 1, productId: 'P003', productName: 'طابعة HP LaserJet', quantity: 1, unitPrice: 1200, totalPrice: 1200 },
      { id: 2, productId: 'P006', productName: 'ماوس لاسلكي', quantity: 5, unitPrice: 120, totalPrice: 600 },
      { id: 3, productId: 'P007', productName: 'لوحة مفاتيح', quantity: 1, unitPrice: 250, totalPrice: 250 }
    ]
  },
  {
    id: 4,
    orderNumber: 'ORD-004',
    customerName: 'فاطمة خالد',
    customerPhone: '0571234567',
    customerEmail: 'fatima@example.com',
    orderDate: '2025-03-30',
    deliveryDate: '2025-04-03',
    status: 'ملغي',
    paymentStatus: 'مسترجع',
    paymentMethod: 'بطاقة ائتمان',
    totalAmount: 750,
    items: [
      { id: 1, productId: 'P007', productName: 'لوحة مفاتيح', quantity: 3, unitPrice: 250, totalPrice: 750 }
    ]
  },
  {
    id: 5,
    orderNumber: 'ORD-005',
    customerName: 'عبدالله سعيد',
    customerPhone: '0581234567',
    customerEmail: 'abdullah@example.com',
    orderDate: '2025-03-30',
    deliveryDate: '2025-04-03',
    status: 'مكتمل',
    paymentStatus: 'مدفوع',
    paymentMethod: 'نقدي عند الاستلام',
    totalAmount: 1500,
    items: [
      { id: 1, productId: 'P005', productName: 'مكتب خشبي', quantity: 1, unitPrice: 1500, totalPrice: 1500 }
    ]
  },
  {
    id: 6,
    orderNumber: 'ORD-006',
    customerName: 'نورة سعيد',
    customerPhone: '0591234567',
    customerEmail: 'noura@example.com',
    orderDate: '2025-04-02',
    deliveryDate: '2025-04-07',
    status: 'جديد',
    paymentStatus: 'بانتظار الدفع',
    paymentMethod: 'تحويل بنكي',
    totalAmount: 3700,
    items: [
      { id: 1, productId: 'P001', productName: 'لابتوب HP ProBook', quantity: 1, unitPrice: 3500, totalPrice: 3500 },
      { id: 2, productId: 'P006', productName: 'ماوس لاسلكي', quantity: 1, unitPrice: 120, totalPrice: 120 },
      { id: 3, productId: 'P007', productName: 'لوحة مفاتيح', quantity: 1, unitPrice: 250, totalPrice: 250 }
    ]
  }
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [formData, setFormData] = useState({
    orderNumber: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    deliveryDate: '',
    status: 'جديد',
    paymentStatus: 'بانتظار الدفع',
    paymentMethod: 'بطاقة ائتمان',
    items: [] as OrderItem[],
  });
  const [newItem, setNewItem] = useState({
    productId: '',
    productName: '',
    quantity: 1,
    unitPrice: 0,
  });

  // البحث في الطلبات
  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // فتح نافذة إضافة طلب جديد
  const handleAddOrder = () => {
    const today = new Date().toISOString().split('T')[0];
    const orderNumber = `ORD-${String(orders.length + 1).padStart(3, '0')}`;
    
    setCurrentOrder(null);
    setFormData({
      orderNumber,
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      deliveryDate: '',
      status: 'جديد',
      paymentStatus: 'بانتظار الدفع',
      paymentMethod: 'بطاقة ائتمان',
      items: [],
    });
    setShowModal(true);
  };

  // فتح نافذة تعديل طلب
  const handleEditOrder = (order: Order) => {
    setCurrentOrder(order);
    setFormData({
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerEmail: order.customerEmail,
      deliveryDate: order.deliveryDate,
      status: order.status,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      items: [...order.items],
    });
    setShowModal(true);
  };

  // فتح نافذة تفاصيل الطلب
  const handleViewOrderDetails = (order: Order) => {
    setCurrentOrder(order);
    setShowDetailsModal(true);
  };

  // حذف طلب
  const handleDeleteOrder = (orderId: number) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا الطلب؟')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  // تغيير حالة الطلب
  const handleChangeStatus = (orderId: number, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus } 
        : order
    ));
  };

  // تغيير بيانات النموذج
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // تغيير بيانات العنصر الجديد
  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'unitPrice' ? parseFloat(value) || 0 : value
    }));
  };

  // إضافة عنصر جديد للطلب
  const handleAddItem = () => {
    if (!newItem.productId || !newItem.productName || newItem.quantity <= 0 || newItem.unitPrice <= 0) {
      alert('الرجاء إدخال جميع بيانات المنتج بشكل صحيح');
      return;
    }

    const totalPrice = newItem.quantity * newItem.unitPrice;
    
    const newOrderItem: OrderItem = {
      id: formData.items.length > 0 ? Math.max(...formData.items.map(item => item.id)) + 1 : 1,
      productId: newItem.productId,
      productName: newItem.productName,
      quantity: newItem.quantity,
      unitPrice: newItem.unitPrice,
      totalPrice
    };

    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newOrderItem]
    }));

    // إعادة تعيين نموذج العنصر الجديد
    setNewItem({
      productId: '',
      productName: '',
      quantity: 1,
      unitPrice: 0,
    });
  };

  // حذف عنصر من الطلب
  const handleRemoveItem = (itemId: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  // حساب إجمالي الطلب
  const calculateOrderTotal = (items: OrderItem[]) => {
    return items.reduce((total, item) => total + item.totalPrice, 0);
  };

  // حفظ بيانات الطلب (إضافة أو تعديل)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.items.length === 0) {
      alert('الرجاء إضافة منتج واحد على الأقل للطلب');
      return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    const totalAmount = calculateOrderTotal(formData.items);
    
    if (currentOrder) {
      // تعديل طلب موجود
      setOrders(orders.map(order => 
        order.id === currentOrder.id 
          ? { 
              ...order, 
              ...formData,
              totalAmount,
              orderDate: order.orderDate, // الاحتفاظ بتاريخ الطلب الأصلي
            } 
          : order
      ));
    } else {
      // إضافة طلب جديد
      const newOrder: Order = {
        id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
        ...formData,
        orderDate: today,
        totalAmount,
      };
      setOrders([...orders, newOrder]);
    }
    
    setShowModal(false);
  };

  // الحصول على لون حالة الطلب
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'جديد':
        return 'bg-blue-100 text-blue-800';
      case 'قيد التنفيذ':
        return 'bg-yellow-100 text-yellow-800';
      case 'مكتمل':
        return 'bg-green-100 text-green-800';
      case 'ملغي':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // الحصول على لون حالة الدفع
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'مدفوع':
        return 'bg-green-100 text-green-800';
      case 'بانتظار الدفع':
        return 'bg-yellow-100 text-yellow-800';
      case 'مسترجع':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">إدارة الطلبات</h1>
        <button 
          onClick={handleAddOrder}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlus className="ml-2" />
          إضافة طلب جديد
        </button>
      </div>

      {/* شريط البحث */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full p-2 pr-10 text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="البحث عن طلب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            dir="rtl"
          />
        </div>
      </div>

      {/* جدول الطلبات */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
                  تاريخ الطلب
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاريخ التسليم
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  حالة الطلب
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  حالة الدفع
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المبلغ الإجمالي
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-xs text-gray-500">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.orderDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.deliveryDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.totalAmount.toFixed(2)} ر.س
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2 space-x-reverse">
                        <button 
                          onClick={() => handleViewOrderDetails(order)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="عرض التفاصيل"
                        >
                          <FaEye />
                        </button>
                        <button 
                          onClick={() => handleEditOrder(order)}
                          className="text-blue-600 hover:text-blue-900"
                          title="تعديل"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDeleteOrder(order.id)}
                          className="text-red-600 hover:text-red-900"
                          title="حذف"
                        >
                          <FaTrash />
                        </button>
                        {order.status !== 'مكتمل' && order.status !== 'ملغي' && (
                          <div className="flex space-x-1 space-x-reverse mr-2">
                            {order.status === 'جديد' && (
                              <button 
                                onClick={() => handleChangeStatus(order.id, 'قيد التنفيذ')}
                                className="text-yellow-600 hover:text-yellow-900"
                                title="تحديث الحالة إلى قيد التنفيذ"
                              >
                                <FaShippingFast />
                              </button>
                            )}
                            <button 
                              onClick={() => handleChangeStatus(order.id, 'مكتمل')}
                              className="text-green-600 hover:text-green-900"
                              title="تحديث الحالة إلى مكتمل"
                            >
                              <FaCheck />
                            </button>
                            <button 
                              onClick={() => handleChangeStatus(order.id, 'ملغي')}
                              className="text-red-600 hover:text-red-900"
                              title="تحديث الحالة إلى ملغي"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                    لا توجد نتائج مطابقة للبحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* نافذة إضافة/تعديل طلب */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {currentOrder ? 'تعديل بيانات الطلب' : 'إضافة طلب جديد'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderNumber">
                    رقم الطلب
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    readOnly
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerName">
                    اسم العميل
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerPhone">
                    رقم الهاتف
                  </label>
                  <input
                    type="text"
                    id="customerPhone"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerEmail">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="customerEmail"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deliveryDate">
                    تاريخ التسليم
                  </label>
                  <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                    حالة الطلب
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    dir="rtl"
                  >
                    <option value="جديد">جديد</option>
                    <option value="قيد التنفيذ">قيد التنفيذ</option>
                    <option value="مكتمل">مكتمل</option>
                    <option value="ملغي">ملغي</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentStatus">
                    حالة الدفع
                  </label>
                  <select
                    id="paymentStatus"
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    dir="rtl"
                  >
                    <option value="بانتظار الدفع">بانتظار الدفع</option>
                    <option value="مدفوع">مدفوع</option>
                    <option value="مسترجع">مسترجع</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMethod">
                    طريقة الدفع
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    dir="rtl"
                  >
                    <option value="بطاقة ائتمان">بطاقة ائتمان</option>
                    <option value="تحويل بنكي">تحويل بنكي</option>
                    <option value="نقدي عند الاستلام">نقدي عند الاستلام</option>
                  </select>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 mt-8">منتجات الطلب</h3>
              
              {/* جدول المنتجات المضافة */}
              {formData.items.length > 0 && (
                <div className="mb-6 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 mb-4">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          رقم المنتج
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          اسم المنتج
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الكمية
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          سعر الوحدة
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المجموع
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الإجراءات
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {item.productId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.productName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.unitPrice.toFixed(2)} ر.س
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.totalPrice.toFixed(2)} ر.س
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button 
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-bold">
                        <td colSpan={4} className="px-6 py-4 text-left text-sm text-gray-900">
                          المجموع الكلي
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          {calculateOrderTotal(formData.items).toFixed(2)} ر.س
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* نموذج إضافة منتج جديد */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="text-lg font-bold mb-4">إضافة منتج</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productId">
                      رقم المنتج
                    </label>
                    <input
                      type="text"
                      id="productId"
                      name="productId"
                      value={newItem.productId}
                      onChange={handleItemChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                      اسم المنتج
                    </label>
                    <input
                      type="text"
                      id="productName"
                      name="productName"
                      value={newItem.productName}
                      onChange={handleItemChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                      الكمية
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={newItem.quantity}
                      onChange={handleItemChange}
                      min="1"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unitPrice">
                      سعر الوحدة
                    </label>
                    <input
                      type="number"
                      id="unitPrice"
                      name="unitPrice"
                      value={newItem.unitPrice}
                      onChange={handleItemChange}
                      min="0"
                      step="0.01"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      dir="rtl"
                    />
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  >
                    إضافة المنتج
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-8">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {currentOrder ? 'تحديث الطلب' : 'إضافة الطلب'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة تفاصيل الطلب */}
      {showDetailsModal && currentOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">تفاصيل الطلب: {currentOrder.orderNumber}</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <FaFileInvoice className="ml-2" />
                    معلومات الطلب
                  </h3>
                  <div className="space-y-2">
                    <p><span className="font-bold">رقم الطلب:</span> {currentOrder.orderNumber}</p>
                    <p><span className="font-bold">تاريخ الطلب:</span> {currentOrder.orderDate}</p>
                    <p><span className="font-bold">تاريخ التسليم:</span> {currentOrder.deliveryDate}</p>
                    <p>
                      <span className="font-bold">حالة الطلب:</span> 
                      <span className={`mr-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(currentOrder.status)}`}>
                        {currentOrder.status}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">حالة الدفع:</span> 
                      <span className={`mr-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(currentOrder.paymentStatus)}`}>
                        {currentOrder.paymentStatus}
                      </span>
                    </p>
                    <p><span className="font-bold">طريقة الدفع:</span> {currentOrder.paymentMethod}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">معلومات العميل</h3>
                  <div className="space-y-2">
                    <p><span className="font-bold">الاسم:</span> {currentOrder.customerName}</p>
                    <p><span className="font-bold">البريد الإلكتروني:</span> {currentOrder.customerEmail}</p>
                    <p><span className="font-bold">رقم الهاتف:</span> {currentOrder.customerPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-4">منتجات الطلب</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 mb-6">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      رقم المنتج
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      اسم المنتج
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الكمية
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      سعر الوحدة
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المجموع
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentOrder.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {item.productId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.unitPrice.toFixed(2)} ر.س
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.totalPrice.toFixed(2)} ر.س
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-bold">
                    <td colSpan={4} className="px-6 py-4 text-left text-sm text-gray-900">
                      المجموع الكلي
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {currentOrder.totalAmount.toFixed(2)} ر.س
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
