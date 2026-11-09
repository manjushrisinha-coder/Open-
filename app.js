const apps = [
  { name: 'Firefox', developer: 'Mozilla', category: 'Web & Internet', description: 'A fast, private, and customizable web browser built by a non-profit-backed community.', license: 'MPL-2.0', platforms: 'Windows · macOS · Linux · Android · iOS', icon: '🦊', color: 'peach', source: 'https://github.com/mozilla/firefox', tags: 'browser privacy web internet' },
  { name: 'VLC media player', developer: 'VideoLAN', category: 'Music & Video', description: 'A free, open-source media player that plays almost any audio or video format.', license: 'GPL-2.0-or-later', platforms: 'Windows · macOS · Linux · Android · iOS', icon: '▶', color: 'gold', source: 'https://code.videolan.org/videolan/vlc', tags: 'video music media player' },
  { name: 'Blender', developer: 'Blender Foundation', category: 'Create & Design', description: 'A complete 3D creation suite for modeling, animation, rendering, and more.', license: 'GPL-3.0-or-later', platforms: 'Windows · macOS · Linux', icon: '◉', color: 'blue', source: 'https://projects.blender.org/blender/blender', tags: '3d animation design create art' },
  { name: 'GIMP', developer: 'The GIMP Team', category: 'Create & Design', description: 'A powerful, extensible image editor for photo retouching, composition, and illustration.', license: 'GPL-3.0-or-later', platforms: 'Windows · macOS · Linux', icon: '✳', color: 'violet', source: 'https://gitlab.gnome.org/GNOME/gimp', tags: 'image photo editor design art' },
  { name: 'Krita', developer: 'Krita Foundation', category: 'Create & Design', description: 'A professional digital painting application made by artists, for artists.', license: 'GPL-3.0-or-later', platforms: 'Windows · macOS · Linux · Android', icon: '✿', color: 'mint', source: 'https://invent.kde.org/graphics/krita', tags: 'painting drawing illustration art' },
  { name: 'Signal', developer: 'Signal Foundation', category: 'Communication', description: 'Private messaging and calls with end-to-end encryption and no ads or trackers.', license: 'AGPL-3.0', platforms: 'Android · iOS · Windows · macOS · Linux', icon: '◌', color: 'blue', source: 'https://github.com/signalapp/Signal-Android', tags: 'chat messaging privacy secure communication' },
  { name: 'KeePassXC', developer: 'KeePassXC Team', category: 'Security & Privacy', description: 'A community-driven password manager that stores your sensitive information securely.', license: 'GPL-2.0-or-later', platforms: 'Windows · macOS · Linux', icon: '⌑', color: 'mint', source: 'https://github.com/keepassxreboot/keepassxc', tags: 'password manager security privacy' },
  { name: 'Audacity', developer: 'Audacity Team', category: 'Music & Video', description: 'Record, edit, and mix audio with this easy-to-use, multi-track audio editor.', license: 'GPL-3.0-or-later', platforms: 'Windows · macOS · Linux', icon: '〰', color: 'violet', source: 'https://github.com/audacity/audacity', tags: 'audio music sound recording editor' },
  { name: 'Thunderbird', developer: 'Mozilla', category: 'Web & Internet', description: 'A free email and calendar app that puts you in control of your communications.', license: 'MPL-2.0', platforms: 'Windows · macOS · Linux · Android', icon: '✉', color: 'blue', source: 'https://github.com/mozilla/releases-comm-central', tags: 'email calendar internet communication' },
  { name: 'Joplin', developer: 'Joplin Contributors', category: 'Productivity', description: 'A note-taking and to-do app with notebooks, markdown, and optional end-to-end encryption.', license: 'MIT', platforms: 'Windows · macOS · Linux · Android · iOS', icon: '▤', color: 'mint', source: 'https://github.com/laurent22/joplin', tags: 'notes tasks productivity markdown' },
  { name: 'Nextcloud', developer: 'Nextcloud GmbH', category: 'Productivity', description: 'A self-hosted productivity platform for file sync, sharing, and collaboration.', license: 'AGPL-3.0', platforms: 'Web · Windows · macOS · Linux · Android · iOS', icon: '☁', color: 'peach', source: 'https://github.com/nextcloud/server', tags: 'cloud files collaboration productivity' },
  { name: 'Godot Engine', developer: 'Godot Contributors', category: 'Create & Design', description: 'A feature-packed, cross-platform game engine for creating 2D and 3D games.', license: 'MIT', platforms: 'Windows · macOS · Linux · Android · iOS · Web', icon: '◇', color: 'blue', source: 'https://github.com/godotengine/godot', tags: 'game engine development create design' }
];

const grid = document.querySelector('#app-grid');
const searchInput = document.querySelector('#search');
const categoryFilter = document.querySelector('#category-filter');
const chips = document.querySelector('#category-chips');
const count = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
const dialog = document.querySelector('#app-dialog');
const categories = ['all', ...new Set(apps.map(app => app.category))];
let activeCategory = 'all';

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function renderChips() {
  chips.innerHTML = categories.map(category => `<button class="chip${category === activeCategory ? ' active' : ''}" data-category="${escapeHtml(category)}" aria-pressed="${category === activeCategory}">${category === 'all' ? 'Everything' : escapeHtml(category)}</button>`).join('');
}

function renderApps() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = apps.filter(app => {
    const matchesCategory = activeCategory === 'all' || app.category === activeCategory;
    const haystack = `${app.name} ${app.developer} ${app.category} ${app.description} ${app.tags}`.toLowerCase();
    return matchesCategory && haystack.includes(query);
  });

  count.textContent = `${visible.length} ${visible.length === 1 ? 'app' : 'apps'}`;
  emptyState.hidden = visible.length !== 0;
  grid.innerHTML = visible.map(app => {
    const index = apps.indexOf(app);
    return `<article class="app-card">
      <button class="card-open" data-app="${index}" aria-label="View ${escapeHtml(app.name)} details">
        <div class="card-top"><span class="app-icon ${app.color}">${app.icon}</span><span class="card-arrow" aria-hidden="true">↗</span></div>
        <span class="app-category">${escapeHtml(app.category)}</span>
        <h3>${escapeHtml(app.name)}</h3><p class="app-description">${escapeHtml(app.description)}</p>
        <span class="card-bottom"><span>${escapeHtml(app.developer)}</span><span class="license-tag">${escapeHtml(app.license)}</span></span>
      </button>
    </article>`;
  }).join('');
}

categories.forEach(category => {
  if (category !== 'all') categoryFilter.add(new Option(category, category));
});
renderChips();
renderApps();
document.querySelector('#year').textContent = new Date().getFullYear();

searchInput.addEventListener('input', renderApps);
categoryFilter.addEventListener('change', () => {
  activeCategory = categoryFilter.value;
  renderChips();
  renderApps();
});
chips.addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  categoryFilter.value = activeCategory;
  renderChips();
  renderApps();
});
document.querySelector('#clear-filters').addEventListener('click', () => {
  searchInput.value = '';
  activeCategory = 'all';
  categoryFilter.value = 'all';
  renderChips();
  renderApps();
  searchInput.focus();
});

grid.addEventListener('click', event => {
  const button = event.target.closest('[data-app]');
  if (!button) return;
  const app = apps[Number(button.dataset.app)];
  document.querySelector('#dialog-icon').className = `dialog-icon app-icon ${app.color}`;
  document.querySelector('#dialog-icon').textContent = app.icon;
  document.querySelector('#dialog-category').textContent = app.category;
  document.querySelector('#dialog-title').textContent = app.name;
  document.querySelector('#dialog-developer').textContent = `Made by ${app.developer}`;
  document.querySelector('#dialog-description').textContent = app.description;
  document.querySelector('#dialog-meta').innerHTML = `<span><b>License</b>${escapeHtml(app.license)}</span><span><b>Available on</b>${escapeHtml(app.platforms)}</span>`;
  document.querySelector('#dialog-source').href = app.source;
  dialog.showModal();
});
document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
