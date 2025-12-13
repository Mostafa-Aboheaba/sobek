# إعداد Web3Forms - حل أفضل وأكثر موثوقية

## ✅ Web3Forms أفضل من FormSubmit

**لماذا Web3Forms:**
- ✅ لا يحتاج تأكيد إيميل
- ✅ يعمل مباشرة
- ✅ أكثر موثوقية
- ✅ مجاني (250 submissions/month)
- ✅ إيميلات فورية

## الخطوة 1: الحصول على Access Key

1. **اذهب إلى:** https://web3forms.com
2. **اضغط:** "Get Your Access Key"
3. **أدخل إيميل:** `info@sobek-egy.com` (أو أي إيميل)
4. **انسخ:** Access Key (مثل: `abc123-def456-ghi789`)

## الخطوة 2: إضافة Access Key

في `.env.local`:

```env
NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
NEXT_PUBLIC_ADMIN_EMAIL=info@sobek-egy.com
```

## الخطوة 3: Build و Deploy

```bash
npm run build:cpanel
cd out
zip -r ../sobek-site.zip .
cd ..
```

ارفع `sobek-site.zip` إلى cPanel.

## كيف يعمل

1. **يحاول Web3Forms أولاً** (إذا كان Access Key موجود)
2. **إذا فشل** → يستخدم FormSubmit كـ backup
3. **الإيميلات ترسل فوراً** ✅

## المميزات

- ✅ لا تأكيد إيميل مطلوب
- ✅ يعمل مباشرة
- ✅ إيميلات فورية
- ✅ مجاني (250/month)

## التكلفة

**Free Tier:**
- 250 submissions/month ✅

**Paid ($5/month):**
- Unlimited submissions

## جاهز!

الكود محدث. فقط:
1. احصل على Access Key من Web3Forms
2. أضفه في `.env.local`
3. Build و Deploy
4. الفورم يعمل! 🎉
