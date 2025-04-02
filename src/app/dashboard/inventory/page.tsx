'use client';

import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaBoxOpen, FaArrowUp, FaArrowDown } from 'react-icons/fa';

// نموذج بيانات المخزون
interface InventoryItem {
  id: number;
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  lastUpdated: string;
  status: string;
}

// بيانات وهمية للمخزون للعرض التوضيحي
const initialInventory: InventoryItem[] = [
  { id: 1, productId: 'P001', productName: 'لابتوب HP ProBook', category: 'إلكترونيات', quantity: 25, unit: 'قطعة', location: 'المستودع A - رف 1', lastUpdated: '2025-04-01', status: 'متوفر' },
  { id: 2, productId: 'P002', productName: 'هاتف سامسونج جالاكسي S22', category: 'إلكترونيات', quantity: 40, unit: 'قطعة', location: 'المستودع A - رف 2', lastUpdated: '2025-04-01', status: 'متوفر' },
  { id: 3, productId: 'P003', productName: 'طابعة HP LaserJet', category: 'إلكترونيات', quantity: 15, unit: 'قطعة', location: 'المستودع B - رف 1', lastUpdated: '2025-03-30', status: 'متوفر' },
  { id: 4, productId: 'P004', productName: 'كرسي مكتبي', category: 'أثاث', quantity: 30, unit: 'قطعة', location: 'المستودع C - رف 3', lastUpdated: '2025-03-29', status: 'متوفر' },
  { id: 5, productId: 'P005', productName: 'مكتب خشبي', category: 'أثاث', quantity: 10, unit: 'قطعة', location: 'المستودع C - رف 2', lastUpdated: '2025-03-28', status: 'منخفض' },
  { id: 6, productId: 'P006', productName: 'ماوس لاسلكي', category: 'إلكترونيات', quantity: 50, unit: 'قطعة', location: 'المستودع A - رف 4', lastUpdated: '2025-03-27', status: 'متوفر' },
  { id: 7, productId: 'P007', productName: 'لوحة مفاتيح', category: 'إلكترونيات', quantity: 45, unit: 'قطعة', location: 'المستودع A - رف 4', lastUpdated: '2025-03-26', status: 'متوفر' },
  { id: 8, productId: 'P008', productName: 'شاشة عرض 24 بوصة', category: 'إلكترونيات', quantity: 5, unit: 'قطعة', location: 'المستودع B - رف 3', lastUpdated: '2025-03-25', status: 'منخفض' },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    category: '',
    quantity: 0,
    unit: 'قطعة',
    location: '',
    status: 'متوفر',
  });
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustData, setAdjustData] = useState({
    quantity: 0,
    reason: '',
    type: 'إضافة',
  });

  // البحث في المخزون
  const filteredInventory = inventory.filter(item => 
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // فتح نافذة إضافة عنصر جديد
  const handleAddItem = () => {
    setCurrentItem(null);
    setFormData({
      productId: '',
      productName: '',
      category: '',
      quantity: 0,
      unit: 'قطعة',
      location: '',
      status: 'متوفر',
    });
    setShowModal(true);
  };

  // فتح نافذة تعديل عنصر
  const handleEditItem = (item: InventoryItem) => {
    setCurrentItem(item);
    setFormData({
      productId: item.productId,
      productName: item.productName,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      location: item.location,
      status: item.status,
    });
    setShowModal(true);
  };

  // فتح نافذة تعديل الكمية
  const handleAdjustQuantity = (item: InventoryItem) => {
    setCurrentItem(item);
    setAdjustData({
      quantity: 0,
      reason: '',
      type: 'إضافة',
    });
    setShowAdjustModal(true);
  };

  // حذف عنصر
  const handleDeleteItem = (itemId: number) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا العنصر من المخزون؟')) {
      setInventory(inventory.filter(item => item.id !== itemId));
    }
  };

  // تغيير بيانات النموذج
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };

  // تغيير بيانات تعديل الكمية
  const handleAdjustChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAdjustData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };

  // حفظ بيانات العنصر (إضافة أو تعديل)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const today = new Date().toISOString().split('T')[0];
    
    if (currentItem) {
      // تعديل عنصر موجود
      setInventory(inventory.map(item => 
        item.id === currentItem.id 
          ? { 
              ...item, 
              ...formData, 
              lastUpdated: today,
              status: formData.quantity <= 5 ? 'منخفض' : 'متوفر'
            } 
          : item
      ));
    } else {
      // إضافة عنصر جديد
      const newItem: InventoryItem = {
        id: inventory.length > 0 ? Math.max(...inventory.map(i => i.id)) + 1 : 1,
        ...formData,
        lastUpdated: today,
        status: formData.quantity <= 5 ? 'منخفض' : 'متوفر'
      };
      setInventory([...inventory, newItem]);
    }
    
    setShowModal(false);
  };

  // تعديل الكمية
  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentItem) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    setInventory(inventory.map(item => {
      if (item.id === currentItem.id) {
        const newQuantity = adjustData.type === 'إضافة' 
          ? item.quantity + adjustData.quantity 
          : item.quantity - adjustData.quantity;
        
        return {
          ...item,
          quantity: Math.max(0, newQuantity), // لا يمكن أن تكون الكمية سالبة
          lastUpdated: today,
          status: newQuantity <= 5 ? 'منخفض' : 'متوفر'
        };
      }
      return item;
    }));
    
    setShowAdjustModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">إدارة المخزون</h1>
        <button 
          onClick={handleAddItem}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlus className="ml-2" />
          إضافة عنصر جديد
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
            placeholder="البحث في المخزون..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            dir="rtl"
          />
        </div>
      </div>

      {/* جدول المخزون */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  رقم المنتج
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  اسم المنتج
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الفئة
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الكمية
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الوحدة
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الموقع
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  آخر تحديث
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {item.productId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${item.status === 'متوفر' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2 space-x-reverse">
                        <button 
                          onClick={() => handleAdjustQuantity(item)}
                          className="text-green-600 hover:text-green-900"
                          title="تعديل الكمية"
                        >
                          <FaBoxOpen />
                        </button>
                        <button 
                          onClick={() => handleEditItem(item)}
                          className="text-blue-600 hover:text-blue-900"
                          title="تعديل"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-900"
                          title="حذف"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500">
                    لا توجد نتائج مطابقة للبحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* نافذة إضافة/تعديل عنصر */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">
              {currentItem ? 'تعديل بيانات العنصر' : 'إضافة عنصر جديد للمخزون'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productId">
                  رقم المنتج
                </label>
                <input
                  type="text"
                  id="productId"
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  dir="rtl"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                  اسم المنتج
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  dir="rtl"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  الفئة
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  dir="rtl"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                  الكمية
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  dir="rtl"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unit">
                  الوحدة
                </label>
                <select
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  dir="rtl"
                >
                  <option value="قطعة">قطعة</option>
                  <option value="صندوق">صندوق</option>
                  <option value="كرتون">كرتون</option>
                  <option value="كيلوجرام">كيلوجرام</option>
                  <option value="لتر">لتر</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                  الموقع
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  dir="rtl"
                />
              </div>
              <div className="flex items-center justify-between">
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
                  {currentItem ? 'تحديث' : 'إضافة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة تعديل الكمية */}
      {showAdjustModal && currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">
              تعديل كمية المخزون
            </h2>
            <p className="mb-4">
              <span className="font-bold">المنتج: </span>
              {currentItem.productName}
            </p>
            <p className="mb-4">
              <span className="font-bold">الكمية الحالية: </span>
              {currentItem.quantity} {currentItem.unit}
            </p>
            <form onSubmit={handleAdjustSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                  نوع العملية
                </label>
                <div className="flex space-x-4 space-x-reverse">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="add"
                      name="type"
                      value="إضافة"
                      checked={adjustData.type === 'إضافة'}
                      onChange={handleAdjustChange}
                      className="ml-2"
                    />
                    <label htmlFor="add" className="flex items-center">
                      <FaArrowUp className="text-green-600 ml-1" />
                      إضافة
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="subtract"
                      name="type"
                      value="سحب"
                      checked={adjustData.type === 'سحب'}
                      onChange={handleAdjustChange}
                      className="ml-2"
                    />
                    <label htmlFor="subtract" className="flex items-center">
                      <FaArrowDown className="text-red-600 ml-1" />
                      سحب
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                  الكمية
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={adjustData.quantity}
                  onChange={handleAdjustChange}
                  min="1"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  dir="rtl"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
                  سبب التعديل
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={adjustData.reason}
                  onChange={handleAdjustChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows={3}
                  dir="rtl"
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowAdjustModal(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  تأكيد
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
