let isMember = false, billing = 'monthly', selPlan = 'yearly';

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  if (name === 'pricing') renderPlans();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterBy(cat, btn) {
  document.querySelectorAll('.ftag').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCards(cat);
}

function renderCards(filter) {
  const items = filter === 'all' ? CONTENTS : CONTENTS.filter(c => c.cat === filter);
  document.getElementById('cards-grid').innerHTML = items.map(c => `
    <div class="card" onclick="openArticle(${c.id})">
      <div class="card-thumb ${c.thumb}">${c.icon}
        ${(!c.free && !isMember) ? '<div class="lock-pip"><i class="ti ti-lock" aria-hidden="true"></i><span>会员</span></div>' : ''}
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="${c.free || isMember ? 'tag-free' : 'tag-pro'}">${c.free ? '免费' : '会员专属'}</span>
          <span class="cat-label">${c.cat}</span>
        </div>
        <div class="card-title">${c.title}</div>
        <div class="card-desc">${c.desc}</div>
        <div class="card-foot">
          <span class="card-time"><i class="ti ti-clock" aria-hidden="true" style="font-size:13px"></i>${c.time}</span>
          <span class="read-link">阅读 →</span>
        </div>
      </div>
    </div>
  `).join('');
}

function openArticle(id) {
  const c = CONTENTS.find(x => x.id === id);
  const can = c.free || isMember;
  document.getElementById('article-slot').innerHTML = `
    <div class="article-layout">
      <div>
        ${(isMember && !c.free) ? '<div class="member-banner"><i class="ti ti-star" aria-hidden="true"></i><span>你正在以会员身份访问此内容</span></div>' : ''}
        <div class="article-cat">${c.cat}</div>
        <div class="article-title">${c.title}</div>
        <div class="article-byline">
          <span><i class="ti ti-clock" aria-hidden="true" style="font-size:13px;vertical-align:-1px"></i> ${c.time}</span>
          <span><i class="ti ti-calendar" aria-hidden="true" style="font-size:13px;vertical-align:-1px"></i> 2025年5月</span>
        </div>
        <div class="article-body">
          <h2>核心发现</h2>
          ${c.body.preview.map(p => '<p>' + p + '</p>').join('')}
          ${can ? '<hr class="article-hr"><h2>详细分析</h2>' + c.body.full.map(p => '<p>' + p + '</p>').join('') : ''}
        </div>
        ${!can ? `<div class="paywall">
          <div class="paywall-lock"><i class="ti ti-lock-open" aria-hidden="true"></i></div>
          <h3>继续阅读完整内容</h3>
          <p>订阅会员后即可解锁本文全文，以及站内全部 ${CONTENTS.filter(x => !x.free).length}+ 篇付费内容</p>
          <div class="paywall-btns">
            <button class="btn-pill btn-pill-lg" onclick="openModal()">立即订阅 · 从 ¥19/月起</button>
            <button class="btn-ghost-pill" onclick="showPage('pricing')">查看方案</button>
          </div>
        </div>` : ''}
      </div>
      <div class="sidebar">
        <div class="sidebar-card">
          <div class="sc-head">订阅方案</div>
          <div class="sc-plan sel" id="sc-monthly" onclick="scSel('monthly')">
            <div class="sc-plan-name">月度会员</div>
            <div class="sc-plan-price">¥39<span style="font-size:13px;font-weight:400;color:var(--color-fog-mist)">/月</span></div>
          </div>
          <div class="sc-plan" id="sc-yearly" onclick="scSel('yearly')">
            <div class="sc-plan-name">年度会员</div>
            <div class="sc-plan-price">¥19<span style="font-size:13px;font-weight:400;color:var(--color-fog-mist)">/月</span></div>
            <div class="sc-plan-note">按年计费 · 省 ¥240</div>
          </div>
          <div class="sc-hr"></div>
          <ul class="sc-feats">
            <li><i class="ti ti-check" aria-hidden="true"></i>全站付费内容无限访问</li>
            <li><i class="ti ti-check" aria-hidden="true"></i>每周新内容推送</li>
            <li><i class="ti ti-check" aria-hidden="true"></i>数据下载与导出</li>
            <li><i class="ti ti-check" aria-hidden="true"></i>7天无理由退款</li>
          </ul>
          <button class="btn-pill" style="width:100%;padding:10px;font-size:14px;" onclick="openModal()">立即订阅</button>
        </div>
      </div>
    </div>
  `;
  showPage('article');
}

function scSel(id) {
  selPlan = id;
  ['monthly','yearly'].forEach(k => document.getElementById('sc-' + k).classList.toggle('sel', k === id));
}

function setBilling(cycle, btn) {
  billing = cycle;
  document.querySelectorAll('.tog').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderPlans();
}

function renderPlans() {
  document.getElementById('plans-row').innerHTML = PLANS.map(p => {
    const amt = p.price[billing];
    const orig = (p.id !== 'team' && billing === 'yearly' && p.origMonthly)
      ? '<div class="plan-orig">' + p.origMonthly + '</div><div class="plan-saving">省 40%</div>' : '';
    return `<div class="plan-card${p.featured ? ' featured' : ''}">
      ${p.featured ? '<div class="plan-badge">最受欢迎</div>' : ''}
      <div class="plan-name">${p.name}</div>
      <div class="plan-price-row"><span class="plan-cur">¥</span><span class="plan-amount">${amt}</span><span class="plan-per">${p.period}</span></div>
      ${orig}
      <div class="plan-hr"></div>
      <ul class="plan-feats">
        ${p.features.map(f => '<li><i class="ti ti-check yes" aria-hidden="true"></i>' + f + '</li>').join('')}
        ${p.locked.map(f => '<li class="dim"><i class="ti ti-minus no" aria-hidden="true"></i>' + f + '</li>').join('')}
      </ul>
      <button class="${p.featured ? 'btn-pill' : 'btn-ghost-pill'}" style="width:100%;padding:10px;font-size:14px;"
        onclick="${p.id === 'team' ? "alert('请发邮件至 team@insight.com')" : "openModal('" + p.id + "')"}">${p.id === 'team' ? '联系我们' : '选择此方案'}</button>
    </div>`;
  }).join('');
}

function openModal(planId) {
  if (planId) selPlan = planId;
  renderModalPlans();
  document.getElementById('modal-overlay').classList.remove('hidden');
  goToStep('step-plan');
}

function renderModalPlans() {
  document.getElementById('modal-plans').innerHTML = [
    { id:'monthly', n:'月度会员', p:'¥39/月', note:'随时取消' },
    { id:'yearly',  n:'年度会员', p:'¥19/月', note:'按年计费 · 省 ¥240，最受欢迎' },
  ].map(o => `<div class="mplan${selPlan === o.id ? ' sel' : ''}" onclick="selPlan='${o.id}';renderModalPlans()">
    <div><div class="mplan-name">${o.n}</div><div class="mplan-note">${o.note}</div></div>
    <div class="mplan-price">${o.p}</div>
  </div>`).join('');
}

function goToPayment() {
  const pm = { monthly:'¥39.00', yearly:'¥228.00' };
  const nm = { monthly:'月度会员', yearly:'年度会员' };
  document.getElementById('pay-summary').innerHTML = `
    <div class="sum-row"><span>订阅方案</span><span>${nm[selPlan]}</span></div>
    <div class="sum-row"><span>计费方式</span><span>${selPlan === 'yearly' ? '按年一次性扣款' : '按月自动续费'}</span></div>
    <div class="sum-row"><span>应付金额</span><span>${pm[selPlan]}</span></div>`;
  goToStep('step-payment');
}

function goToSuccess() {
  const name = document.getElementById('inp-name').value.trim();
  const card = document.getElementById('inp-card').value.replace(/\s/g,'');
  if (!name || card.length < 16) { alert('请填写持卡人姓名和完整卡号'); return; }
  goToStep('step-success');
}

function activateMember() {
  isMember = true;
  document.getElementById('member-chip').classList.add('visible');
  document.getElementById('nav-upgrade').style.display = 'none';
  closeModal(); renderCards('all');
}

function goToStep(id) {
  document.querySelectorAll('.modal-step').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('modal-overlay')) {
    document.getElementById('modal-overlay').classList.add('hidden');
    goToStep('step-plan');
  }
}

function fmtCard(input) {
  const val = input.value.replace(/\D/g,'').substring(0,16);
  input.value = val.replace(/(.{4})/g,'$1 ').trim();
}

function toggleFaq(btn) { btn.parentElement.classList.toggle('open'); }

renderCards('all');