(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const cards = $$('.product-card');
  const filters = $$('.filter-chip');
  const search = $('#productSearch');
  const empty = $('#emptyState');
  const count = $('#resultCount');
  const toast = $('#toast');
  let activeFilter = 'all';
  let toastTimer;
  const showToast = message => {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  };
  window.addEventListener('show-toast', event => showToast(event.detail || ''));
  const applyFilter = () => {
    const q = (search.value || '').trim().toLocaleLowerCase('fa');
    let visible = 0;
    cards.forEach(card => {
      const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
      const text = `${card.dataset.search || ''} ${card.textContent || ''}`.toLocaleLowerCase('fa');
      const matchesText = !q || text.includes(q);
      const show = matchesCategory && matchesText;
      card.hidden = !show;
      if (show) visible++;
    });
    count.textContent = String(visible).padStart(2, '0');
    empty.hidden = visible !== 0;
    $('#productGrid').hidden = visible === 0;
    filters.forEach(btn => {
      const selected = btn.dataset.filter === activeFilter;
      btn.classList.toggle('active', selected);
      btn.setAttribute('aria-pressed', String(selected));
    });
  };
  filters.forEach(btn => btn.addEventListener('click', () => {
    activeFilter = btn.dataset.filter;
    applyFilter();
  }));
  search.addEventListener('input', applyFilter);
  $('#resetSearch').addEventListener('click', () => {
    search.value = '';
    activeFilter = 'all';
    applyFilter();
    search.focus();
  });
  $$('.category-tile').forEach(tile => tile.addEventListener('click', () => {
    activeFilter = tile.dataset.category;
    applyFilter();
    $('#products').scrollIntoView({behavior: 'smooth'});
  }));
  $$('.quote-button').forEach(button => button.addEventListener('click', () => {
    const product = button.dataset.product || 'محصول';
    const phone = button.dataset.phone;
    if (phone) {
      const message = `سلام، برای محصول «${product}» استعلام قیمت می‌خواستم. لطفاً راهنمایی کنید.`;
      // Telegram link is public contact channel; number is only obtained from the server at runtime.
      const url = `https://t.me/shaki0030`;
      window.open(url, '_blank', 'noopener,noreferrer');
      showToast(`برای استعلام «${product}» نام محصول و مشخصات را در پیام ارسال کنید.`);
    } else {
      showToast('شماره تماس در تنظیمات هاست ثبت نشده؛ از تلگرام یا اینستاگرام پیام بدهید.');
    }
  }));
  const menuToggle = $('#menuToggle'), mobileNav = $('#mobileNav');
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileNav.classList.toggle('open', open);
  });
  $$('#mobileNav a').forEach(link => link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
  }));
  const progress = $('#progress');
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', updateProgress, {passive:true});
  updateProgress();
  $('#year').textContent = new Date().getFullYear();
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), {threshold: 0.08});
    $$('.reveal').forEach(el => observer.observe(el));
  } else $$('.reveal').forEach(el => el.classList.add('visible'));
  applyFilter();
})();