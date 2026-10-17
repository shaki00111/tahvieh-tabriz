/**
 * وب‌سایت تخصصی تهویه تبریز
 * منطق برنامه، مدیریت کاتالوگ، جستجو، فیلتر و اتصال امن API
 * Pure Vanilla JavaScript - No heavy dependencies
 */

(function () {
  'use strict';

  // State Management
  const state = {
    contact: {
      phone: '',
      telegram: 'https://t.me/shaki0030',
      instagram: 'https://www.instagram.com/thvia_tabriz/',
      city: 'تبریز',
      hours: '۹ صبح الی ۱۲ شب (با هماهنگی)',
      delivery: 'هماهنگی جهت تحویل حضوری و ارسال به سراسر کشور'
    },
    activeCategory: 'all',
    searchQuery: '',
    selectedProduct: null
  };

  // Products Database
  const products = [
    {
      id: 'diffuser-linear-slot',
      title: 'دریچه خطی اسلوت دکوراتیو',
      subtitle: 'Linear Slot Diffuser (1 to 4 Slots)',
      category: 'diffusers',
      categoryName: 'دریچه تنظیم هوا',
      image: 'assets/images/products/grille-slot.webp',
      specs: [
        'متریال: پروفیل آلومینیوم ۶۰۶۳ اکسترود شده',
        'تعداد شیار: از ۱ تا ۴ اسلوت با قابلیت هوادهی خطی',
        'پوشش: رنگ پودری الکترواستاتیک کوره‌ای ضد خش',
        'کاربرد: سقف‌های کاذب دکوراتیو، سالن‌های کنفرانس و لابی'
      ],
      description: 'دریچه خطی اسلوت از زیباترین و مدرن‌ترین دریچه‌های توزیع هواست که با پره‌های قابل تنظیم داخلی امکان پرتاب هوا در زوایای مختلف را فراهم می‌آورد.'
    },
    {
      id: 'diffuser-ceiling-4way',
      title: 'دریچه سقفی چهارطرفه کلاف پهن',
      subtitle: '4-Way Square Ceiling Diffuser',
      category: 'diffusers',
      categoryName: 'دریچه تنظیم هوا',
      image: 'assets/images/products/grille-ceiling-4way.webp',
      specs: [
        'متریال: ورق و پروفیل آلومینیوم مرغوب',
        'الگوی پاشش: هوادهی ۳۶۰ درجه‌ای یکنواخت ۴ جهته',
        'ابعاد: استاندارد تایل ۶۰×۶۰ و ابعاد ساخت سفارشی',
        'قابلیت‌ها: امکان نصب دمپر پشت دریچه‌ای پروانه‌ای'
      ],
      description: 'مناسب برای سیستم‌های سرمایش و گرمایش با هوادهی کاملاً متوازن بدون ایجاد کوران هوا بر روی حاضرین در فضا.'
    },
    {
      id: 'diffuser-wall-adjustable',
      title: 'دریچه دیواری یک و دوطرفه متحرک',
      subtitle: 'Adjustable Double-Deflection Wall Grille',
      category: 'diffusers',
      categoryName: 'دریچه تنظیم هوا',
      image: 'assets/images/products/grille-wall.webp',
      specs: [
        'متریال: پره‌های آلومینیومی ایرفویل مقاوم',
        'تنظیم جریان: قابلیت تنظیم زاویه عمودی و افقی پره‌ها',
        'هوابندی: درزگیری دقیق بدون نشت صدا و لرزش',
        'کاربرد: انشعابات دیواری هواساز، داکت و فن‌کوئل'
      ],
      description: 'کنترل دقیق پرتاب باد به نقاط مورد نظر محیط با تیغه‌های آلومینیومی با طراحی آیرودینامیک با حداقل افت فشار دینامیکی.'
    },
    {
      id: 'diffuser-eggcrate',
      title: 'دریچه مشبک لانه زنبوری (تخم‌مرغی)',
      subtitle: 'Aluminum Egg Crate Return Grille',
      category: 'diffusers',
      categoryName: 'دریچه تنظیم هوا',
      image: 'assets/images/products/grille-eggcrate.webp',
      specs: [
        'متریال: شبکه آلومینیومی سلولی ۱/۲ اینچ با فریم مستحکم',
        'سطح آزاد هوادهی: بالاترین دبی (بیش از ۹۰٪ سطح آزاد)',
        'صدا و افت فشار: عملکرد کاملاً بی‌صدا و افت استاتیک ناچیز',
        'کاربرد: مکش برگشت هوا، هوای تازه و تخلیه گازها'
      ],
      description: 'بهترین انتخاب برای دریچه‌های برگشت و اگزاست به منظور جلوگیری از فشار آمدن به فن و سیستم هوارسان.'
    },
    {
      id: 'fan-centrifugal-1hp',
      title: 'هواکش سانتریفیوژ حلزونی صنعتی ۱ اسب',
      subtitle: '1 HP Industrial Forward/Backward Centrifugal Fan',
      category: 'fans',
      categoryName: 'هواکش و سانتریفیوژ',
      image: 'assets/images/products/fan-centrifugal-1hp.webp',
      specs: [
        'قدرت موتور: ۱ اسب بخار (تک‌فاز / سه‌فاز موتوژن تبریز)',
        'نوع پروانه: پروانه فلزی بالانس شده دینامیکی و استاتیکی',
        'ساختار هوزینگ: حلزونی ضخیم با جوش کامل هوابند',
        'کاربرد: تخلیه هوای هود آشپزخانه صنعتی، کارگاه و رستوران'
      ],
      description: 'سانتریفیوژ حلزونی پرقدرت با فشار استاتیکی مناسب برای غلبه بر اصطکاک کانال‌های طویل و فیلترهای چربی‌گیر.'
    },
    {
      id: 'fan-centrifugal-half-hp',
      title: 'فن سانتریفیوژ مکنده نیم‌اسب بخار',
      subtitle: '0.5 HP Single Inlet Centrifugal Exhaust Blower',
      category: 'fans',
      categoryName: 'هواکش و سانتریفیوژ',
      image: 'assets/images/products/fan-centrifugal-half-hp.webp',
      specs: [
        'قدرت موتور: ۰.۵ اسب بخار با راندمان مصرف انرژی A',
        'سطح صدا: کارکرد نرم و بدون لرزش (Silent Operation)',
        'اتصال دهانه: فلنج‌دار مناسب اتصال مستقیم به کانال',
        'کاربرد: موتورخانه‌ها، فست‌فودها، آزمایشگاه‌ها و سرویس‌ها'
      ],
      description: 'هواکش سانتریفیوژ بهینه برای دبی متوسط هوا با قابلیت نصب در فضاهای محدود و شاسی با لاستیک‌های لرزه‌گیر.'
    },
    {
      id: 'fan-utility-heavy',
      title: 'فن یوتیلیتی فشار قوی صنعتی',
      subtitle: 'Heavy-Duty Industrial Utility Blower',
      category: 'fans',
      categoryName: 'هواکش و سانتریفیوژ',
      image: 'assets/images/products/fan-utility-heavy.webp',
      specs: [
        'شاسی و بدنه: ورق فولادی سنگین با رنگ مقاوم صنعتی',
        'سیستم انتقال قدرت: فولی و تسمه یا کوپله مستقیم صنعتی',
        'پروانه: بکوارد خم به عقب ضد رسوب و مقاوم به سایش',
        'کاربرد: خطوط تولید سنگین، بگ فیلترها و سیستم‌های مکش غبار'
      ],
      description: 'طراحی شده برای شرایط کاری مداوم در صنایع و کارخانجات با فشار استاتیکی بالا و طول عمر بسیار بالا.'
    },
    {
      id: 'spiral-duct-round',
      title: 'کانال اسپیرال گرد گالوانیزه استاندارد',
      subtitle: 'Spiral Galvanized Round Air Duct',
      category: 'spiral',
      categoryName: 'کانال و لوله اسپیرال',
      image: 'assets/images/products/spiral-duct-round.webp',
      specs: [
        'متریال: ورق گالوانیزه استاندارد ضد زنگ (Z275)',
        'محدوده قطر: از قطر ۱۰۰ میلی‌متر تا ۱۶۰۰ میلی‌متر',
        'طول شاخه: استاندارد ۳ متری و قابلیت سفارش طول دلخواه',
        'اتصال: درز مارپیچ چهارلایه قفل‌شونده با مقاومت کششی عالی'
      ],
      description: 'کانال اسپیرال به دلیل مقطع گرد، کمترین اصطکاک و افت فشار را در مقایسه با کانال‌های چهارگوش ایجاد کرده و ظاهری مدرن در معماری اکسپوز دارد.'
    },
    {
      id: 'spiral-duct-heavy-pipe',
      title: 'شاخه کانال اسپیرال ضخیم صنعتی',
      subtitle: 'Heavy-Gauge Spiral Ductwork for Industrial HVAC',
      category: 'spiral',
      categoryName: 'کانال و لوله اسپیرال',
      image: 'assets/images/products/spiral-duct-pipe.webp',
      specs: [
        'ضخامت ورق: ۰.۶ تا ۱.۲۵ میلی‌متر با پوشش گالوانیزه گرم',
        'استحکام: تحمل فشارهای منفی مکش و مثبت دمش بدون دفرمه شدن',
        'هوابندی: ۱۰۰٪ هوابند مطابق استانداردهای DW144 / SMACNA',
        'کاربرد: سیستم‌های تهویه مطبوع، تخلیه دود پارکینگ و انتقال مواد'
      ],
      description: 'تولید دقیق ماشینی با قالب‌های پیشرفته فرم‌دهی و درزهای پرس شده مستحکم در کارگاه تهویه تبریز.'
    },
    {
      id: 'fitting-elbow-90',
      title: 'زانو ۹۰ درجه گرد گالوانیزه اسپیرال',
      subtitle: '90-Degree Round Galvanized Duct Elbow',
      category: 'fittings',
      categoryName: 'اتصالات کانال و دمپر',
      image: 'assets/images/products/fittings-elbow.webp',
      specs: [
        'شعاع انحنا: مطابق استاندارد آیرودینامیک (R = 1.5 D)',
        'نحوه اتصال: فیتینگ نری/مادگی با لبه کونیک جهت نصب سریع',
        'درزها: درز جوش پیوسته و هوابندی کامل بدون نیاز به بتونه اضافی',
        'زوایا: ۹۰ درجه و ۴۵ درجه در تمامی قطرهای استاندارد'
      ],
      description: 'هدایت بهینه مسیر هوا با کمترین افت سرعت و جلوگیری از افت فشار در زوایای تند کانال‌کشی.'
    },
    {
      id: 'fitting-reducer',
      title: 'تبدیل گرد به گرد متقارن و یک‌طرفه',
      subtitle: 'Concentric & Eccentric Duct Reducer',
      category: 'fittings',
      categoryName: 'اتصالات کانال و دمپر',
      image: 'assets/images/products/fittings-reducer.webp',
      specs: [
        'فرم هندسی: مخروطی شیب‌دار جهت عبور نرم و بدون شوک هوا',
        'متریال: ورق گالوانیزه درجه یک بدون اعوجاج',
        'انواع: تبدیل هم‌مرکز (Concentric) و یک‌طرفه فلت (Eccentric)',
        'کاربرد: تغییر مقطع خطوط اصلی به فرعی در طول مسیر کانال'
      ],
      description: 'ساخت دقیق انواع تبدیل گرد به گرد و تبدیل چهارگوش به گرد طبق اندازه و نقشه پروژه تاسیساتی.'
    },
    {
      id: 'fitting-tee-branch',
      title: 'سه‌راهی شلواری و انشعاب ۴۵ و ۹۰ درجه',
      subtitle: 'Galvanized Duct Tee & 45-Degree Y-Branch',
      category: 'fittings',
      categoryName: 'اتصالات کانال و دمپر',
      image: 'assets/images/products/fittings-tee.webp',
      specs: [
        'طراحی: شلواری هیدرولیکی برای تقسیم بدون گردابه جریان باد',
        'زوایای انشعاب: ۴۵ درجه و ۹۰ درجه متقارن و نامتقارن',
        'دهانه‌ها: لبه‌های گرد شده برای مونتاژ راحت به کانال اسپیرال',
        'کاربرد: شبکه انشعابات فرعی هوای تازه و کانال‌های برگشت'
      ],
      description: 'اتصالات پیش‌ساخته مهندسی با تلرانس ابعادی استاندارد و کاهش زمان و هزینه نصب در پروژه.'
    },
    {
      id: 'fitting-volume-damper',
      title: 'دمپر بین کانالی تنظیم دبی هوا دستی',
      subtitle: 'Manual Round Duct Volume Control Damper',
      category: 'fittings',
      categoryName: 'اتصالات کانال و دمپر',
      image: 'assets/images/products/fittings-damper.webp',
      specs: [
        'بدنه و پره: دیسک گالوانیزه با شفت مرکزی آبکاری شده فلزی',
        'اهرم تنظیم: دستگیره فلزی مدرج با پیچ قفل‌کننده موقعیت',
        'نصب: داخل کانال با حداقل فضای اشغال‌شده',
        'کاربرد: بالانس جریان هوا در انشعاب‌های مختلف طبقات و اتاق‌ها'
      ],
      description: 'امکان تنظیم دقیق میزان هوادهی هر بخش به صورت دستی و قفل کردن پره در زاویه مدنظر.'
    },
    {
      id: 'flex-insulated-duct',
      title: 'لوله فلکسیبل عایق‌دار الاستومری',
      subtitle: 'Elastomeric Insulated Flexible Duct',
      category: 'flexible',
      categoryName: 'لوله فلکسی خرطومی',
      image: 'assets/images/products/flex-insulated.webp',
      specs: [
        'لایه عایق: فوم الاستومری سلول‌بسته نسوز و ضد رطوبت',
        'روکش: فویل آلومینیوم چندلایه تقویت شده با مفتول فنری پرکربن',
        'طول شاخه: بسته‌های ۶ متری و ۱۰ متری فشرده',
        'مزیت: مقاومت کامل در برابر کندانس و تعریق آب در تابستان'
      ],
      description: 'بهترین انتخاب برای اتصال باکس فن‌کوئل و داکت اسپلیت به دریچه‌های هوا به منظور حذف کامل اتلاف حرارتی و نویز.'
    },
    {
      id: 'flex-aluminum-duct',
      title: 'لوله فلکسیبل آلومینیومی بدون عایق',
      subtitle: 'Uninsulated Aluminum Flexible Air Duct',
      category: 'flexible',
      categoryName: 'لوله فلکسی خرطومی',
      image: 'assets/images/products/flex-aluminum.webp',
      specs: [
        'متریال: فویل آلومینیومی نسوز با فنر تقویت‌کننده داخلی',
        'انعطاف‌پذیری: چرخش و خم‌پذیری بالا در مسیرهای پیچیده و تنگ',
        'مقاومت دمایی: از ۳۰- تا ۱۵۰+ درجه سانتی‌گراد',
        'کاربرد: لوله تخلیه هود آشپزخانه، پکیج، اگزاست فن و سرویس‌ها'
      ],
      description: 'لوله خرطومی اقتصادی، بسیار سبک و بادوام برای مصارف تخلیه هوا و فضاهایی که نیازی به عایق حرارتی ندارند.'
    },
    {
      id: 'insulation-roll-nbr',
      title: 'عایق الاستومری رولی ساده و چسب‌دار',
      subtitle: 'Closed-Cell NBR Rubber Insulation Roll',
      category: 'insulation',
      categoryName: 'عایق الاستومری',
      image: 'assets/images/products/insulation-roll.webp',
      specs: [
        'جنس: فوم سلول‌بسته الاستومری نیتریل (NBR/EPDM)',
        'انواع: ساده، پشت چسب‌دار مسلح نخ‌دار و با روکش آلومینیوم مسلح',
        'ضخامت: از ۶ تا ۲۵ میلی‌متر مطابق استاندارد عایق‌کاری',
        'مقاومت: ضد نفوذ رطوبت، مقاوم در برابر قارچ، کپک و آتش‌سوزی'
      ],
      description: 'عایق‌کاری سطوح خارجی کانال‌های تهویه مطبوع، مانع افت برودت و حرارت و جلوگیری از استهلاک ورق فلزی کانال.'
    },
    {
      id: 'insulation-pipe-tube',
      title: 'عایق الاستومری لوله‌ای سیاه تاسیساتی',
      subtitle: 'Elastomeric Pipe Foam Insulation Tube',
      category: 'insulation',
      categoryName: 'عایق الاستومری',
      image: 'assets/images/products/insulation-pipe.webp',
      specs: [
        'قطر داخلی: مناسب لوله‌های مسی از ۱/۴ اینچ تا ۳ اینچ',
        'ضریب انتقال حرارت: فوق‌العاده پایین (کمتر از ۰.۰۳۴)',
        'شاخه: ۲ متری با انعطاف بالا جهت کشیدن روی لوله',
        'کاربرد: خطوط لوله‌کشی مسی کولر گازی، داکت اسپلیت، چیلر و موتورخانه'
      ],
      description: 'جلوگیری از خنک شدن بیهوده گاز مبرد و ممانعت ۱۰۰ درصدی از چکیدن آب میعان شده روی سقف کاذب.'
    },
    {
      id: 'fancoil-access-louver',
      title: 'دریچه بازدید زیر فن‌کوئل خطی شیاردار',
      subtitle: 'Louvered Hinged Fan Coil Access Panel',
      category: 'fancoil',
      categoryName: 'زیر فن‌کوئل و متعلقات',
      image: 'assets/images/products/fancoil-access-louver.webp',
      specs: [
        'فریم و درب: پروفیل آلومینیومی تقویت شده با گوشه‌های فارسی‌بر',
        'مکانیزم بازشو: لولایی مخفی با قفل زاماک فشاری (کلیکی / چفتی)',
        'شیارها: شیارهای پانچ شده استاندارد جهت مکش هوای بازگشتی',
        'پوشش: رنگ پودری کوره‌ای سفید/کرم با ماندگاری طولانی'
      ],
      description: 'دسترسی سریع، ایمن و آسان کارشناس و سرویس‌کار به قطعات داخلی فن‌کوئل و فیلتر بدون آسیب به سقف کاذب.'
    },
    {
      id: 'fancoil-access-filter',
      title: 'دریچه زیر فن‌کوئل مشبک با توری فیلتردار',
      subtitle: 'Egg-Crate Filtered Fan Coil Access Door',
      category: 'fancoil',
      categoryName: 'زیر فن‌کوئل و متعلقات',
      image: 'assets/images/products/fancoil-access-filter.webp',
      specs: [
        'هسته مرکزی: شبکه لانه زنبوری آلومینیومی با جریان هوای روان',
        'فیلتر: توری آلومینیومی چندلایه قابل شستشو و تعویض آسان',
        'عملکرد صوتی: ممانعت کامل از ایجاد صدای مکش زوزه دستگاه',
        'کاربرد: داکت اسپلیت‌ها و فن‌کوئل‌های با ظرفیت هوادهی بالا'
      ],
      description: 'تامین هوای برگشت پرحجم با فیلتراسیون ذرات معلق، همراه با دسترسی کامل به موتور و مدارات دستگاه.'
    }
  ];

  // DOM Elements
  const elements = {
    productsGrid: document.getElementById('products-grid'),
    productCount: document.getElementById('product-count'),
    searchInput: document.getElementById('search-input'),
    clearSearchBtn: document.getElementById('clear-search-btn'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    menuToggle: document.getElementById('menu-toggle'),
    mobileNav: document.getElementById('mobile-nav'),
    mobileNavLinks: document.querySelectorAll('.mobile-nav-link'),
    mainHeader: document.getElementById('main-header'),
    backToTopBtn: document.getElementById('back-to-top'),
    toastNotice: document.getElementById('toast-notice'),
    toastText: document.getElementById('toast-text'),
    
    // Modals
    inquiryModal: document.getElementById('inquiry-modal'),
    quickviewModal: document.getElementById('quickview-modal'),
    modalCloseBtns: document.querySelectorAll('.modal-close-btn'),
    
    // Inquiry Form
    inquiryProductName: document.getElementById('inquiry-product-name'),
    inquiryDetails: document.getElementById('inquiry-details'),
    sendTelegramBtn: document.getElementById('send-telegram-btn'),
    callInquiryBtn: document.getElementById('call-inquiry-btn'),
    
    // Quickview fields
    quickviewTitle: document.getElementById('quickview-title'),
    quickviewSubtitle: document.getElementById('quickview-subtitle'),
    quickviewImage: document.getElementById('quickview-image'),
    quickviewCategory: document.getElementById('quickview-category'),
    quickviewDesc: document.getElementById('quickview-desc'),
    quickviewSpecs: document.getElementById('quickview-specs'),
    quickviewInquireBtn: document.getElementById('quickview-inquire-btn')
  };

  /**
   * Safe Fetch of Contact Data from Cloudflare Pages Function
   * Read from serverless API without committing hardcoded secrets
   */
  async function fetchContactData() {
    try {
      const response = await fetch('/api/contact');
      if (response.ok) {
        const data = await response.json();
        if (data && data.phone) {
          state.contact.phone = data.phone;
        }
        if (data && data.telegram) {
          state.contact.telegram = data.telegram;
        }
        if (data && data.instagram) {
          state.contact.instagram = data.instagram;
        }
        applyContactDetails();
      } else {
        applyContactFallback();
      }
    } catch (err) {
      applyContactFallback();
    }
  }

  function applyContactDetails() {
    const phone = state.contact.phone;
    
    // Update all elements with data-contact-phone
    const phoneTargets = document.querySelectorAll('[data-contact-phone]');
    phoneTargets.forEach(el => {
      if (phone) {
        el.textContent = phone;
        if (el.tagName === 'A') {
          el.href = `tel:${phone}`;
        }
      }
    });

    // Update all call action triggers
    const callButtons = document.querySelectorAll('[data-action="call"]');
    callButtons.forEach(btn => {
      if (phone) {
        if (btn.tagName === 'A') {
          btn.href = `tel:${phone}`;
        } else {
          btn.onclick = () => {
            window.location.href = `tel:${phone}`;
          };
        }
      } else {
        setupFallbackCallTrigger(btn);
      }
    });

    // Update Telegram Links
    const telegramLinks = document.querySelectorAll('[data-contact-telegram]');
    telegramLinks.forEach(el => {
      el.href = state.contact.telegram;
    });

    // Update Instagram Links
    const instaLinks = document.querySelectorAll('[data-contact-instagram]');
    instaLinks.forEach(el => {
      el.href = state.contact.instagram;
    });
  }

  function applyContactFallback() {
    const callButtons = document.querySelectorAll('[data-action="call"]');
    callButtons.forEach(btn => {
      setupFallbackCallTrigger(btn);
    });
  }

  function setupFallbackCallTrigger(btn) {
    btn.onclick = (e) => {
      if (!state.contact.phone) {
        e.preventDefault();
        openInquiryModal(null, 'تماس با کارشناس تهویه تبریز');
      }
    };
  }

  /**
   * Render Product Catalog
   */
  function renderProducts() {
    const query = state.searchQuery.trim().toLowerCase();
    const category = state.activeCategory;

    const filtered = products.filter(product => {
      const matchCategory = category === 'all' || product.category === category;
      const matchSearch = !query ||
        product.title.toLowerCase().includes(query) ||
        product.subtitle.toLowerCase().includes(query) ||
        product.categoryName.toLowerCase().includes(query) ||
        product.specs.some(s => s.toLowerCase().includes(query));

      return matchCategory && matchSearch;
    });

    // Update Count Display
    if (elements.productCount) {
      elements.productCount.textContent = `${filtered.length} محصول`;
    }

    if (filtered.length === 0) {
      elements.productsGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
          <h3>هیچ محصولی مطابق با جست‌وجوی شما یافت نشد!</h3>
          <p>می‌توانید عنوان دیگری را جستجو کنید یا فیلتر دسته‌بندی را تغییر دهید. همچنین می‌توانید برای سفارش ساخت سفارشی مستقیماً با ما در ارتباط باشید.</p>
          <button class="btn btn-secondary btn-sm" id="reset-filter-btn">
            مشاهده تمام محصولات
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.activeCategory = 'all';
          state.searchQuery = '';
          if (elements.searchInput) elements.searchInput.value = '';
          updateFilterButtonsUI();
          renderProducts();
        });
      }
      return;
    }

    elements.productsGrid.innerHTML = filtered.map(product => `
      <article class="product-card" data-id="${product.id}" data-category="${product.category}">
        <div class="product-image-wrap">
          <span class="product-category-badge">${product.categoryName}</span>
          <img src="${product.image}" alt="${product.title}" loading="lazy" onerror="this.src='assets/images/logo.svg'">
        </div>
        <div class="product-body">
          <h3 class="product-title">${product.title}</h3>
          <div class="product-subtitle">${product.subtitle}</div>
          
          <ul class="product-specs">
            ${product.specs.slice(0, 3).map(spec => `
              <li class="product-spec-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${spec}</span>
              </li>
            `).join('')}
          </ul>

          <div class="product-price-box">
            <span class="price-label">وضعیت قیمت:</span>
            <span class="price-value">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              استعلام قیمت روز
            </span>
          </div>

          <div class="product-actions">
            <button class="btn btn-telegram btn-sm product-telegram-btn" data-product-id="${product.id}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 2L11 13"></path>
                <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
              </svg>
              استعلام قیمت
            </button>
            <button class="btn btn-secondary btn-sm product-detail-btn" data-product-id="${product.id}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              مشخصات فنی
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Attach Event Listeners to rendered cards
    attachCardListeners();
  }

  function attachCardListeners() {
    // Inquire Button (Opens Inquire Modal with Pre-filled product)
    document.querySelectorAll('.product-telegram-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pid = e.currentTarget.getAttribute('data-product-id');
        const prod = products.find(p => p.id === pid);
        if (prod) {
          openInquiryModal(prod);
        }
      });
    });

    // Detail Button (Opens Quickview Modal)
    document.querySelectorAll('.product-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pid = e.currentTarget.getAttribute('data-product-id');
        const prod = products.find(p => p.id === pid);
        if (prod) {
          openQuickviewModal(prod);
        }
      });
    });
  }

  function updateFilterButtonsUI() {
    elements.filterButtons.forEach(btn => {
      const cat = btn.getAttribute('data-category');
      if (cat === state.activeCategory) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  /**
   * Filter & Search Handlers
   */
  function setupFilterAndSearch() {
    // Category Tabs
    elements.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeCategory = btn.getAttribute('data-category');
        updateFilterButtonsUI();
        renderProducts();
      });
    });

    // Direct Category Cards Click (from Category Showcase)
    document.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.getAttribute('data-category');
        if (cat) {
          state.activeCategory = cat;
          updateFilterButtonsUI();
          renderProducts();
          const target = document.getElementById('catalog');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // Live Instant Search
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (elements.clearSearchBtn) {
          elements.clearSearchBtn.style.display = state.searchQuery ? 'flex' : 'none';
        }
        renderProducts();
      });
    }

    if (elements.clearSearchBtn) {
      elements.clearSearchBtn.addEventListener('click', () => {
        state.searchQuery = '';
        if (elements.searchInput) {
          elements.searchInput.value = '';
          elements.searchInput.focus();
        }
        elements.clearSearchBtn.style.display = 'none';
        renderProducts();
      });
    }
  }

  /**
   * Modals Management
   */
  function openInquiryModal(product = null, customTitle = '') {
    state.selectedProduct = product;
    if (product) {
      elements.inquiryProductName.value = product.title;
      elements.inquiryDetails.placeholder = `لطفاً ابعاد، متراژ یا تعداد مورد نظر برای «${product.title}» را مرقوم فرمایید...`;
    } else {
      elements.inquiryProductName.value = customTitle || 'استعلام عمومی تجهیزات و کانال‌سازی';
      elements.inquiryDetails.placeholder = 'لطفاً لیست تجهیزات، متراژ یا نقشه پروژه را بیان کنید...';
    }

    elements.inquiryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openQuickviewModal(product) {
    state.selectedProduct = product;
    elements.quickviewTitle.textContent = product.title;
    elements.quickviewSubtitle.textContent = product.subtitle;
    elements.quickviewImage.src = product.image;
    elements.quickviewImage.alt = product.title;
    elements.quickviewCategory.textContent = product.categoryName;
    elements.quickviewDesc.textContent = product.description;

    elements.quickviewSpecs.innerHTML = product.specs.map(s => {
      const parts = s.split(':');
      const label = parts[0] ? parts[0].trim() : 'مشخصه';
      const val = parts.slice(1).join(':').trim();
      return `
        <tr>
          <td>${label}</td>
          <td>${val || label}</td>
        </tr>
      `;
    }).join('');

    elements.quickviewInquireBtn.onclick = () => {
      closeAllModals();
      openInquiryModal(product);
    };

    elements.quickviewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAllModals() {
    elements.inquiryModal.classList.remove('active');
    elements.quickviewModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function setupModals() {
    elements.modalCloseBtns.forEach(btn => {
      btn.addEventListener('click', closeAllModals);
    });

    [elements.inquiryModal, elements.quickviewModal].forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeAllModals();
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllModals();
      }
    });

    // Send Telegram Button in Modal
    if (elements.sendTelegramBtn) {
      elements.sendTelegramBtn.addEventListener('click', () => {
        const prodName = elements.inquiryProductName.value.trim() || 'تجهیزات تهویه و کانال‌سازی';
        const details = elements.inquiryDetails.value.trim();
        
        let msg = `سلام وقت بخیر.\nدرخواست استعلام قیمت از وب‌سایت تهویه تبریز:\nمحصول: ${prodName}`;
        if (details) {
          msg += `\nتوضیحات / متراژ: ${details}`;
        }
        msg += `\nشهر مقصد: `;

        // Direct Telegram Deep Link
        const baseTelegram = state.contact.telegram || 'https://t.me/shaki0030';
        // Open Telegram
        window.open(baseTelegram, '_blank');
        showToast('در حال انتقال به تلگرام جهت استعلام قیمت...');
        closeAllModals();
      });
    }

    // Call from Modal
    if (elements.callInquiryBtn) {
      elements.callInquiryBtn.addEventListener('click', () => {
        if (state.contact.phone) {
          window.location.href = `tel:${state.contact.phone}`;
        } else {
          showToast('شماره تماس در متغیر محیطی تنظیم می‌شود.');
        }
      });
    }
  }

  /**
   * UI Navigation & Header Logic
   */
  function setupNavigation() {
    // Header Scroll Effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        elements.mainHeader.classList.add('scrolled');
      } else {
        elements.mainHeader.classList.remove('scrolled');
      }

      // Back to Top Button
      if (window.scrollY > 350) {
        elements.backToTopBtn.classList.add('visible');
      } else {
        elements.backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    // Back to top click
    elements.backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Mobile Hamburger Menu
    elements.menuToggle.addEventListener('click', () => {
      elements.menuToggle.classList.toggle('active');
      elements.mobileNav.classList.toggle('open');
    });

    elements.mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        elements.menuToggle.classList.remove('active');
        elements.mobileNav.classList.remove('open');
      });
    });

    // General Inquiry triggers
    document.querySelectorAll('[data-action="inquiry"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openInquiryModal();
      });
    });
  }

  /**
   * Toast Notice
   */
  let toastTimer = null;
  function showToast(message) {
    if (!elements.toastNotice || !elements.toastText) return;
    elements.toastText.textContent = message;
    elements.toastNotice.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      elements.toastNotice.classList.remove('show');
    }, 3800);
  }

  /**
   * Initialization
   */
  function init() {
    renderProducts();
    setupFilterAndSearch();
    setupModals();
    setupNavigation();
    fetchContactData();
  }

  // DOM Content Loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
