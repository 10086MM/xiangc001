/**
 * 地理科普页面逻辑
 */
document.addEventListener('DOMContentLoaded', () => {
  renderGeoPanels();
  renderTimeline();
  initGeoTabs();
});

function renderGeoPanels() {
  const container = document.getElementById('geo-panels');
  if (!container || !window.HUAIROU_DATA) return;

  const panels = [
    { id: 'overview', data: HUAIROU_DATA.geology.overview },
    { id: 'greatwall', data: HUAIROU_DATA.geology.greatwall },
    { id: 'ecology', data: HUAIROU_DATA.geology.ecology },
    { id: 'scenery', data: HUAIROU_DATA.geology.scenery }
  ];

  container.innerHTML = panels.map((panel, i) => `
    <div class="geo-panel ${i === 0 ? 'active' : ''}" data-panel="${panel.id}">
      <div class="geo-content">
        <div class="geo-image">
          <img src="${panel.data.image}" alt="${panel.data.title}" loading="lazy">
        </div>
        <div class="geo-text">
          <h3>${panel.data.title}</h3>
          <p>${panel.data.content}</p>
          <div class="geo-facts">
            ${panel.data.facts.map(f => `
              <div class="geo-fact">
                <strong>${f.label}</strong>
                <span>${f.value}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function initGeoTabs() {
  const tabs = document.querySelectorAll('.geo-tab');
  const panels = document.querySelectorAll('.geo-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const panelId = tab.dataset.panel;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panels.forEach(p => {
        p.classList.toggle('active', p.dataset.panel === panelId);
      });
    });
  });
}

function renderTimeline() {
  const container = document.getElementById('geo-timeline');
  if (!container) return;

  const events = [
    { era: '元古界 (约18亿年前)', desc: '怀柔地区开始沉积长城系地层，形成了区内最古老的岩石基底。' },
    { era: '燕山期 (约1.8-1.4亿年前)', desc: '强烈的岩浆活动形成了广泛分布的花岗岩体，构成了现今山地的核心骨架。' },
    { era: '新生代 (约6600万年前至今)', desc: '地壳抬升与河流侵蚀共同塑造了现今的山地、丘陵与河谷地貌。' },
    { era: '明代 (公元1368-1644年)', desc: '大规模修筑长城，利用地形修筑防御工事，形成了独特的人文地貌景观。' },
    { era: '现代', desc: '水库建设（如黄花城水库）改变了局部地貌，形成了水长城等独特景观。' }
  ];

  container.innerHTML = events.map(e => `
    <div class="timeline-item fade-in">
      <h4>${e.era}</h4>
      <p>${e.desc}</p>
    </div>
  `).join('');

  if (typeof initScrollAnimations === 'function') initScrollAnimations();
}
