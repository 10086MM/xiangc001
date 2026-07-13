/**
 * 旅游导览页面逻辑
 */
document.addEventListener('DOMContentLoaded', () => {
  renderRoutes();
  renderSpots(document.getElementById('all-spots'));
});

function renderRoutes() {
  const tabsContainer = document.getElementById('route-tabs');
  const detailsContainer = document.getElementById('route-details');
  if (!tabsContainer || !detailsContainer || !window.HUAIROU_DATA) return;

  const routes = HUAIROU_DATA.routes;

  tabsContainer.innerHTML = routes.map((route, i) =>
    `<button class="route-tab ${i === 0 ? 'active' : ''}" data-route="${route.id}">${route.name}</button>`
  ).join('');

  detailsContainer.innerHTML = routes.map((route, i) => `
    <div class="route-detail ${i === 0 ? 'active' : ''}" data-route="${route.id}">
      <div style="margin-bottom:24px;">
        <p style="color:var(--color-text-muted); margin-bottom:8px;">${route.description}</p>
        <span style="font-size:0.9rem; color:var(--color-primary);">⏱ ${route.duration} · 📏 ${route.distance}</span>
      </div>
      <div class="route-layout">
        <div class="route-map">
          <svg class="map-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#f0ebe3" rx="4"/>
            <path d="M10,80 Q30,60 50,70 T90,40" fill="none" stroke="${route.color}" stroke-width="1.5" stroke-dasharray="4,2" opacity="0.5"/>
            <text x="50" y="95" text-anchor="middle" font-size="5" fill="#6b6b6b">怀柔区示意图</text>
            ${route.stops.map((stop, j) => `
              <g class="map-point ${j === 0 ? 'active' : ''}" data-stop="${j}">
                <circle cx="${stop.x}" cy="${stop.y}" r="6" fill="${route.color}" opacity="0.8"/>
                <text x="${stop.x}" y="${stop.y - 8}" text-anchor="middle" font-size="3">${stop.name}</text>
              </g>
            `).join('')}
          </svg>
        </div>
        <div class="route-stops">
          ${route.stops.map((stop, j) => `
            <div class="stop-card ${j === 0 ? 'active' : ''}" data-stop="${j}">
              <div class="stop-number">${j + 1}</div>
              <div class="stop-info">
                <h4>${stop.name}</h4>
                <p>${stop.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');

  tabsContainer.addEventListener('click', e => {
    const tab = e.target.closest('.route-tab');
    if (!tab) return;
    const routeId = tab.dataset.route;

    tabsContainer.querySelectorAll('.route-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    detailsContainer.querySelectorAll('.route-detail').forEach(d => {
      d.classList.toggle('active', d.dataset.route === routeId);
    });
  });

  detailsContainer.addEventListener('click', e => {
    const stopCard = e.target.closest('.stop-card');
    const mapPoint = e.target.closest('.map-point');
    const detail = e.target.closest('.route-detail');
    if (!detail) return;

    const stopIndex = stopCard?.dataset.stop ?? mapPoint?.dataset.stop;
    if (stopIndex === undefined) return;

    detail.querySelectorAll('.stop-card').forEach((c, i) => {
      c.classList.toggle('active', i == stopIndex);
    });
    detail.querySelectorAll('.map-point').forEach((p, i) => {
      p.classList.toggle('active', i == stopIndex);
    });
  });
}
