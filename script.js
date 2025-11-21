// 简洁一页逻辑：装载数据 → 渲染筛选 → 渲染结果 → 支持本地记忆 & URL 同步
(function () {
  const METRIC = {
    currencySymbol(c) {
      const map = { USD: '$', JPY: '¥', THB: '฿', EUR: '€', CNY: '¥' };
      return map[c] || '';
    },
    formatMoney(amount, currency) {
      try {
        return new Intl.NumberFormat('zh-CN', {
          style: 'currency',
          currency,
          maximumFractionDigits: currency === 'JPY' ? 0 : 2
        }).format(amount);
      } catch {
        return `${this.currencySymbol(currency)}${amount}`;
      }
    }
  };

  // DOM
  const els = {
    country: document.getElementById('countrySelect'),
    category: document.getElementById('categorySelect'),
    form: document.getElementById('filterForm'),
    reset: document.getElementById('resetBtn'),
    apply: document.getElementById('applyBtn'),

    threshold: document.getElementById('thresholdBody'),
    prohibited: document.getElementById('prohibitedList'),
    channels: document.getElementById('channelsBody'),
    pitfall: document.getElementById('pitfallBody'),
    resultSection: document.getElementById('resultSection'),

    metaLine: document.getElementById('metaLine'),
    disclaimer: document.getElementById('disclaimer'),
  };

  const NOW_YEAR = new Date().getFullYear();
  document.getElementById('year').textContent = NOW_YEAR;

  // 数据源
  const DATA = window.GSG_DATA;
  if (!DATA || !DATA.countries?.length) {
    console.error('数据未加载：请检查 data.js');
    els.resultSection.setAttribute('aria-busy', 'false');
    els.pitfall.textContent = '数据未加载，请检查 data.js';
    return;
  }

  // URL 参数 & 本地记忆
  const params = new URLSearchParams(location.search);
  const remembered = JSON.parse(localStorage.getItem('GSG_PREF') || '{}');

  // 初始化下拉
  function initSelects() {
    // 国家
    els.country.innerHTML = DATA.countries
      .map(c => `<option value="${c.code}">${c.name}</option>`)
      .join('');

    // 类别（使用全局类别列表，保持一致）
    els.category.innerHTML = DATA.categories
      .map(cat => `<option value="${cat}">${cat}</option>`)
      .join('');

    // 选择优先级：URL > 本地 > 默认
    const initCountry = params.get('country') || remembered.country || DATA.countries[0].code;
    const initCategory = params.get('category') || remembered.category || DATA.categories[0];

    els.country.value = initCountry;
    els.category.value = initCategory;

    // 元信息
    els.metaLine.textContent = `数据版本：${DATA.meta?.updated || '—'} · ${DATA.meta?.disclaimer || '示例数据，仅供参考'}`;
  }

  // 获取当前选择的国家 & 类别数据
  function currentData() {
    const code = els.country.value;
    const cat = els.category.value;
    const country = DATA.countries.find(c => c.code === code);
    return { code, cat, country };
  }

  // 渲染：免税门槛
  function renderThreshold(country) {
    if (!country?.threshold) {
      els.threshold.innerHTML = `<span class="text-slate-400">暂无数据</span>`;
      return;
    }
    const cur = country.currency || country.threshold.currency || 'USD';
    const amount = country.threshold.amount;
    const formatted = METRIC.formatMoney(amount, cur);
    const note = country.threshold.note ? `（${country.threshold.note}）` : '';
    els.threshold.innerHTML = `
      <div class="text-slate-800 font-medium">${country.name} 免税门槛：<span class="font-semibold">${formatted}</span> ${note}</div>
    `;
  }

  // 渲染：禁运/敏感品
  function renderProhibited(country, cat) {
    const general = country?.general?.prohibited || [];
    const catP = country?.categories?.[cat]?.prohibited || [];
    const catS = country?.categories?.[cat]?.sensitive || [];
    const items = [...new Set([...general, ...catP, ...catS])];

    els.prohibited.innerHTML = items.length
      ? items.map(x => `<li>${x}</li>`).join('')
      : `<li class="text-slate-400">暂无条目</li>`;
  }

  // 渲染：渠道（占位）
  function renderChannels(country, cat) {
    const channels = country?.categories?.[cat]?.channels || [];
    els.channels.innerHTML = channels.length
      ? channels.map(c =>
          `<span class="badge"><span class="badge-dot"></span>${c}</span>`
        ).join('')
      : `<span class="text-slate-400">暂无建议渠道</span>`;
  }

  // 渲染：避坑提示
  function renderPitfall(country, cat) {
    const catTip = country?.categories?.[cat]?.pitfall;
    const generalTip = country?.general?.pitfall;
    const msg = catTip || generalTip || '暂无提示';
    els.pitfall.textContent = msg;
  }

  function persistAndSyncURL(code, cat) {
    // 本地记忆
    localStorage.setItem('GSG_PREF', JSON.stringify({ country: code, category: cat }));
    // URL
    const sp = new URLSearchParams(location.search);
    sp.set('country', code);
    sp.set('category', cat);
    const newURL = `${location.pathname}?${sp.toString()}`;
    history.replaceState(null, '', newURL);
  }

  function renderAll() {
    els.resultSection.setAttribute('aria-busy', 'true');
    const { country, code, cat } = currentData();
    if (!country) return;

    renderThreshold(country);
    renderProhibited(country, cat);
    renderChannels(country, cat);
    renderPitfall(country, cat);

    persistAndSyncURL(code, cat);
    els.resultSection.setAttribute('aria-busy', 'false');
  }

  // 表单 & 控制
  els.form.addEventListener('submit', (e) => {
    e.preventDefault();
    renderAll();
  });

  els.reset.addEventListener('click', () => {
    els.country.selectedIndex = 0;
    els.category.selectedIndex = 0;
    renderAll();
  });

  // 初始装载
  initSelects();
  renderAll();

  // 免责声明（可从 data.js 动态覆盖）
  if (DATA?.meta?.disclaimer) {
    document.getElementById('disclaimer').textContent = DATA.meta.disclaimer;
  }
})();
