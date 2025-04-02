export const dynamic = 'force-dynamic';

export async function GET() {
  return new Response(JSON.stringify({ message: 'مرحبًا بك في واجهة برمجة التطبيقات لنظام إدارة المستودعات' }), {
    headers: { 'content-type': 'application/json' },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // هذا مجرد محاكاة للتحقق من بيانات المستخدم
    // في بيئة الإنتاج، يجب التحقق من البيانات مقابل قاعدة البيانات
    if (username === 'admin' && password === 'admin123') {
      return new Response(
        JSON.stringify({
          success: true,
          user: {
            id: 1,
            username: 'admin',
            name: 'مدير النظام',
            role: 'admin',
          },
          token: 'token_محاكاة_123456789',
        }),
        {
          headers: { 'content-type': 'application/json' },
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'اسم المستخدم أو كلمة المرور غير صحيحة',
        }),
        {
          headers: { 'content-type': 'application/json' },
          status: 401,
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'حدث خطأ أثناء معالجة الطلب',
      }),
      {
        headers: { 'content-type': 'application/json' },
        status: 500,
      }
    );
  }
}
