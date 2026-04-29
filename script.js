const GITHUB_ID = 'JaeUk0205';

/* ─── Nav scroll ─── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ─── Mobile nav toggle ─── */
document.getElementById('navToggle').addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  const open = links.style.display === 'flex';
  links.style.cssText = open
    ? ''
    : 'display:flex;flex-direction:column;position:absolute;top:60px;left:0;right:0;background:#111;padding:20px 28px;gap:20px;border-bottom:1px solid #1e1e1e;z-index:99';
});

/* ─── Grid canvas ─── */
(function () {
  const canvas = document.getElementById('gridCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, dots = [], rafId;
  const DOT_SPACING = 36;
  const DOT_R = 1;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildDots();
  }

  function buildDots() {
    dots = [];
    const cols = Math.ceil(W / DOT_SPACING) + 1;
    const rows = Math.ceil(H / DOT_SPACING) + 1;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        dots.push({ x: c * DOT_SPACING, y: r * DOT_SPACING, a: Math.random() });
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += .008;
    for (const d of dots) {
      const pulse = .15 + .45 * Math.abs(Math.sin(t + d.x * .04 + d.y * .03));
      ctx.beginPath();
      ctx.arc(d.x, d.y, DOT_R, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,229,160,${pulse})`;
      ctx.fill();
    }
    rafId = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', () => { cancelAnimationFrame(rafId); resize(); draw(); });
})();

/* ─── Fade-in on scroll ─── */
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: .1 }
);
document.querySelectorAll('section').forEach(s => {
  s.classList.add('fade-up');
  observer.observe(s);
});

/* ─── GitHub repos ─── */
function langColor(lang) {
  const map = {
    Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#2b7489',
    C: '#555555', 'C++': '#f34b7d', Go: '#00ADD8', Rust: '#dea584',
    Shell: '#89e051', HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219',
  };
  return map[lang] || '#00e5a0';
}

async function loadRepos() {
  const grid   = document.getElementById('projectsGrid');
  const more   = document.getElementById('projectsMore');
  const subEl  = document.querySelector('.section-sub');

  const githubLinks = [
    document.getElementById('githubProfileLink'),
    document.getElementById('githubAllLink'),
    document.getElementById('githubContactLink'),
  ];
  const githubHandleEl = document.getElementById('githubHandle');

  const profileUrl = `https://github.com/${GITHUB_ID}`;
  githubLinks.forEach(el => { if (el) el.href = profileUrl; });
  if (githubHandleEl) githubHandleEl.textContent = GITHUB_ID;

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_ID}/repos?sort=updated&per_page=30`);
    if (!res.ok) throw new Error(res.status);
    const repos = await res.json();

    const filtered = repos
      .filter(r => !r.fork)
      .sort((a, b) => (b.stargazers_count - a.stargazers_count) || new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 6);

    grid.innerHTML = '';
    subEl.textContent = `${repos.filter(r => !r.fork).length}개의 저장소 중 최근 업데이트 순으로 표시`;

    if (filtered.length === 0) {
      grid.innerHTML = '<a class="project-card no-repos">아직 공개된 저장소가 없습니다.</a>';
      return;
    }

    for (const repo of filtered) {
      const card = document.createElement('a');
      card.className = 'project-card';
      card.href = repo.html_url;
      card.target = '_blank';
      card.rel = 'noopener';

      const color = langColor(repo.language);
      card.innerHTML = `
        <div class="project-header">
          <svg class="project-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
          </svg>
          <span class="project-arrow">↗</span>
        </div>
        <div class="project-name">${repo.name}</div>
        <div class="project-desc">${repo.description || '설명 없음'}</div>
        <div class="project-footer">
          ${repo.language ? `<span class="project-lang"><span class="lang-dot" style="background:${color}"></span>${repo.language}</span>` : ''}
          ${repo.stargazers_count > 0 ? `<span class="project-stars">★ ${repo.stargazers_count}</span>` : ''}
        </div>`;
      grid.appendChild(card);
    }

    more.style.display = 'block';
  } catch (e) {
    grid.innerHTML = '<a class="project-card no-repos">GitHub 저장소를 불러오지 못했습니다.<br><small>나중에 다시 시도해 주세요.</small></a>';
    subEl.textContent = '';
    console.error('GitHub API error:', e);
  }
}

loadRepos();
