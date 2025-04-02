'use client';

import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaBarcode } from 'react-icons/fa';

// نموذج بيانات المنتج
interface Product {
  id: number;
  productId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  cost: number;
  supplier: string;
  imageUrl: string;
  status: string;
  createdAt: string;
}

// بيانات وهمية للمنتجات للعرض التوضيحي
const initialProducts: Product[] = [
  { id: 1, productId: 'P001', name: 'لابتوب HP ProBook', description: 'لابتوب HP ProBook Core i7، ذاكرة 16 جيجابايت، تخزين SSD 512 جيجابايت', category: 'إلكترونيات', price: 3500, cost: 2800, supplier: 'شركة الإلكترونيات المتقدمة', imageUrl: '/images/laptop.jpg', status: 'متاح', createdAt: '2025-03-15' },
  { id: 2, productId: 'P002', name: 'هاتف سامسونج جالاكسي S22', description: 'هاتف سامسونج جالاكسي S22، ذاكرة 8 جيجابايت، تخزين 256 جيجابايت', category: 'إلكترونيات', price: 2800, cost: 2200, supplier: 'شركة الإلكترونيات المتقدمة', imageUrl: '/images/phone.jpg', status: 'متاح', createdAt: '2025-03-18' },
  { id: 3, productId: 'P003', name: 'طابعة HP LaserJet', description: 'طابعة HP LaserJet ليزر أسود وأبيض', category: 'إلكترونيات', price: 1200, cost: 900, supplier: 'شركة الإلكترونيات المتقدمة', imageUrl: '/images/printer.jpg', status: 'متاح', createdAt: '2025-03-20' },
  { id: 4, productId: 'P004', name: 'كرسي مكتبي', description: 'كرسي مكتبي مريح مع دعم للظهر', category: 'أثاث', price: 500, cost: 350, supplier: 'شركة الأثاث الحديث', imageUrl: '/images/chair.jpg', status: 'متاح', createdAt: '2025-03-22' },
  { id: 5, productId: 'P005', name: 'مكتب خشبي', description: 'مكتب خشبي فاخر للمكاتب', category: 'أثاث', price: 1500, cost: 1100, supplier: 'شركة الأثاث الحديث', imageUrl: '/images/desk.jpg', status: 'متاح', createdAt: '2025-03-25' },
  { id: 6, productId: 'P006', name: 'ماوس لاسلكي', description: 'ماوس لاسلكي لوجيتك', category: 'إلكترونيات', price: 120, cost: 80, supplier: 'شركة الإلكترونيات المتقدمة', imageUrl: '/images/mouse.jpg', status: 'متاح', createdAt: '2025-03-27' },
  { id: 7, productId: 'P007', name: 'لوحة مفاتيح', description: 'لوحة مفاتيح ميكانيكية للألعاب', category: 'إلكترونيات', price: 250, cost: 180, supplier: 'شركة الإلكترونيات المتقدمة', imageUrl: '/images/keyboard.jpg', status: 'متاح', createdAt: '2025-03-28' },
  { id: 8, productId: 'P008', name: 'شاشة عرض 24 بوصة', description: 'شاشة عرض LED بدقة Full HD', category: 'إلكترونيات', price: 800, cost: 600, supplier: 'شركة الإلكترونيات المتقدمة', imageUrl: '/images/monitor.jpg', status: 'غير متاح', createdAt: '2025-03-30' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    productId: '',
    name: '',
    description: '',
    category: '',
    price: 0,
    cost: 0,
    supplier: '',
    imageUrl: '',
    status: 'متاح',
  });

  // البحث في المنتجات
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // فتح نافذة إضافة منتج جديد
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setFormData({
      productId: '',
      name: '',
      description: '',
      category: '',
      price: 0,
      cost: 0,
      supplier: '',
      imageUrl: '',
      status: 'متاح',
    });
    setShowModal(true);
  };

  // فتح نافذة تعديل منتج
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setFormData({
      productId: product.productId,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      cost: product.cost,
      supplier: product.supplier,
      imageUrl: product.imageUrl,
      status: product.status,
    });
    setShowModal(true);
  };

  // حذف منتج
  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا المنتج؟')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  // تغيير بيانات النموذج
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'cost' ? parseFloat(value) || 0 : value
    }));
  };

  // حفظ بيانات المنتج (إضافة أو تعديل)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const today = new Date().toISOString().split('T')[0];
    
    if (currentProduct) {
      // تعديل منتج موجود
      setProducts(products.map(product => 
        product.id === currentProduct.id 
          ? { ...product, ...formData } 
          : product
      ));
    } else {
      // إضافة منتج جديد
      const newProduct: Product = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        ...formData,
        createdAt: today
      };
      setProducts([...products, newProduct]);
    }
    
    setShowModal(false);
  };

  // حساب هامش الربح
  const calculateProfit = (price: number, cost: number) => {
    return price - cost;
  };

  // حساب نسبة الربح
  const calculateProfitMargin = (price: number, cost: number) => {
    if (price === 0) return 0;
    return ((price - cost) / price) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">إدارة المنتجات</h1>
        <button 
          onClick={handleAddProduct}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlus className="ml-2" />
          إضافة منتج جديد
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
            placeholder="البحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            dir="rtl"
          />
        </div>
      </div>

      {/* جدول المنتجات */}
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
                  سعر البيع
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التكلفة
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  هامش الربح
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المورد
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
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 flex items-center">
                      <FaBarcode className="ml-2" />
                      {product.productId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {product.price.toFixed(2)} ر.س
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.cost.toFixed(2)} ر.س
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div>
                        <span className="font-medium text-green-600">
                          {calculateProfit(product.price, product.cost).toFixed(2)} ر.س
                        </span>
                        <span className="text-xs text-gray-500 block">
                          ({calculateProfitMargin(product.price, product.cost).toFixed(1)}%)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${product.status === 'متاح' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2 space-x-reverse">
                        <button 
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-600 hover:text-blue-900"
                          title="تعديل"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
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

      {/* نافذة إضافة/تعديل منتج */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">
              {currentProduct ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد'}
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  اسم المنتج
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  dir="rtl"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  وصف المنتج
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows={3}
                  dir="rtl"
                ></textarea>
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  سعر البيع
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  dir="rtl"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cost">
                  التكلفة
                </label>
                <input
                  type="number"
                  id="cost"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  dir="rtl"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supplier">
                  المورد
                </label>
                <input
                  type="text"
                  id="supplier"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  dir="rtl"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
                  رابط الصورة
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  dir="rtl"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                  الحالة
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  dir="rtl"
                >
                  <option value="متاح">متاح</option>
                  <option value="غير متاح">غير متاح</option>
                </select>
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
                  {currentProduct ? 'تحديث' : 'إضافة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
