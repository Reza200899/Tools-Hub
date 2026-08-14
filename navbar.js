// Shared sidebar — dipakai index.html + semua page/*.html.
// Edit di sini → apply ke semua. Icon ngikutin Tools Hub (sama persis).
(function () {
  // Cegah browser restore posisi scroll lama (bikin page "geser" saat refresh)
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  const mount = document.getElementById("navbar");
  if (!mount) return;

  // Sembunyikan navbar di halaman Tools Hub (index.html)
  if (location.pathname.split("/").pop() === "index.html") {
    mount.remove();
    return;
  }

  // Path relatif ke root (index.html). Dari page/ pakai "../", dari root "".
  const ROOT = location.pathname.includes("/page/") ? "../" : "";
  const current = location.pathname.split("/").pop();

  // Daftar tool — icon = SVG persis dari Tools Hub (viewBox 0 0 48 48).
  const TOOLS = [
    { label: "Data Comparer", href: "page/Data-Comparer.html", c1: "#f87171", icon: '<rect x="9" y="28" width="8" height="14" rx="2" fill="#dc2626"/><rect x="20" y="20" width="8" height="22" rx="2" fill="#f87171"/><rect x="31" y="10" width="8" height="32" rx="2" fill="#fecaca"/>' },
    { label: "Excel Compare", href: "page/Excel-Compare.html", c1: "#34d399", icon: '<rect x="8" y="6" width="32" height="36" rx="4" fill="#d1fae5"/><rect x="12" y="11" width="24" height="3" rx="1" fill="#10b981"/><rect x="12" y="18" width="24" height="3" rx="1" fill="#10b981"/><rect x="12" y="25" width="24" height="3" rx="1" fill="#10b981"/><path fill="#059669" d="M18 38l4 4 8-8-1.6-1.6-6.4 6.4-2.4-2.4z"/>' },
    { label: "Extract Subjects", href: "page/Extract-Subjects.html", c1: "#fb923c", icon: '<path fill="#ea580c" d="M8 14a4 4 0 0 1 4-4h6l3 4h19a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4z"/><rect x="14" y="27" width="20" height="3" rx="1" fill="#fdba74"/><rect x="14" y="34" width="14" height="3" rx="1" fill="#fdba74"/>' },
    { label: "Fix Name", href: "page/Fix-Name.html", c1: "#f472b6", icon: '<rect x="20" y="9" width="8" height="24" rx="2" fill="#f472b6"/><polygon points="20,33 28,33 24,39" fill="#db2777"/>' },
    { label: "Kalender Akademik", href: "page/Kalender-Akademik.html", c1: "#60a5fa", icon: '<rect x="8" y="10" width="32" height="32" rx="4" fill="#dbeafe"/><rect x="8" y="10" width="32" height="10" rx="4" fill="#60a5fa"/><rect x="12" y="6" width="4" height="7" rx="2" fill="#2563eb"/><rect x="32" y="6" width="4" height="7" rx="2" fill="#2563eb"/><rect x="12" y="26" width="6" height="5" rx="1" fill="#2563eb"/><rect x="21" y="26" width="6" height="5" rx="1" fill="#2563eb"/><rect x="30" y="26" width="6" height="5" rx="1" fill="#2563eb"/><rect x="12" y="35" width="6" height="5" rx="1" fill="#3b82f6"/><rect x="21" y="35" width="6" height="5" rx="1" fill="#3b82f6"/><rect x="30" y="35" width="6" height="5" rx="1" fill="#3b82f6"/>' },
    { label: "Query Data Update", href: "page/Query-Data-Update.html", c1: "#818cf8", icon: '<ellipse cx="24" cy="12" rx="14" ry="5" fill="#4f46e5"/><rect x="10" y="12" width="28" height="8" fill="#4f46e5"/><ellipse cx="24" cy="20" rx="14" ry="5" fill="#4f46e5"/><rect x="10" y="20" width="28" height="8" fill="#818cf8"/><ellipse cx="24" cy="28" rx="14" ry="5" fill="#818cf8"/><rect x="10" y="28" width="28" height="8" fill="#a5b4fc"/><ellipse cx="24" cy="36" rx="14" ry="5" fill="#a5b4fc"/>' },
    { label: "School Notes & To Do", href: "page/School-Notes-&-To-Do.html", c1: "#2dd4bf", icon: '<rect x="8" y="8" width="32" height="34" rx="4" fill="#ccfbf1"/><rect x="14" y="4" width="20" height="7" rx="2" fill="#0d9488"/><rect x="12" y="20" width="24" height="3" rx="1" fill="#14b8a6"/><rect x="12" y="27" width="18" height="3" rx="1" fill="#14b8a6"/><path fill="#0d9488" d="M14 38l4 4 8-8-1.6-1.6-6.4 6.4-2.4-2.4z"/>' },
    { label: "Subject Comparer", href: "page/Subject-Comparer.html", c1: "#c084fc", icon: '<path fill="#9333ea" d="M10 12l16-6v28l-16 6z"/><path fill="#c084fc" d="M38 12l-12-4v28l12 4z"/><path fill="#d8b4fe" d="M10 12l10-4v28l-10 4z"/>' },
    { label: "Username Maker", href: "page/Username-Maker.html", c1: "#22d3ee", icon: '<rect x="8" y="6" width="32" height="36" rx="6" fill="#cffafe"/><circle cx="24" cy="20" r="7" fill="#22d3ee"/><path fill="#0891b2" d="M14 40c0-5.5 4.5-10 10-10s10 4.5 10 10"/><rect x="30" y="12" width="3" height="7" rx="1" fill="#67e8f9"/><rect x="30" y="23" width="3" height="4" rx="1" fill="#67e8f9"/>' },
    { label: "Variable Python", href: "page/Variable-Python.html", c1: "#60a5fa", icon: '<rect x="8" y="6" width="32" height="36" rx="4" fill="#dbeafe"/><text x="24" y="22" text-anchor="middle" font-size="11" font-weight="700" fill="#2563eb" font-family="monospace">py</text><rect x="12" y="28" width="10" height="3" rx="1" fill="#3b82f6"/><rect x="12" y="34" width="16" height="3" rx="1" fill="#93c5fd"/><rect x="26" y="28" width="8" height="3" rx="1" fill="#93c5fd"/>' },
    { label: "HTML Report Inspector", href: "page/HTML-Report-Inspector.html", c1: "#f472b6", icon: '<rect x="8" y="6" width="32" height="36" rx="4" fill="#fce7f3"/><text x="24" y="22" text-anchor="middle" font-size="9" font-weight="700" fill="#db2777" font-family="monospace">&lt;/&gt;</text><rect x="12" y="28" width="24" height="3" rx="1" fill="#f472b6"/><rect x="12" y="34" width="16" height="3" rx="1" fill="#f9a8d4"/>' },
    { label: "OCR", href: "page/OCR.html", c1: "#38bdf8", icon: '<rect x="8" y="8" width="32" height="32" rx="4" fill="#e0f2fe"/><circle cx="24" cy="22" r="8" fill="none" stroke="#0284c7" stroke-width="2.5"/><circle cx="24" cy="22" r="3" fill="#0284c7"/><rect x="14" y="6" width="6" height="4" rx="1" fill="#38bdf8"/><rect x="28" y="6" width="6" height="4" rx="1" fill="#38bdf8"/><rect x="10" y="36" width="28" height="3" rx="1.5" fill="#7dd3fc"/>' },
  ];

  function getHidden() {
    try {
      return JSON.parse(localStorage.getItem("tools-hidden") || "[]");
    } catch {
      return [];
    }
  }
  function buildItems() {
    const hidden = getHidden();
    const items = TOOLS
      .slice()
      .sort((a, b) => a.label.localeCompare(b.label, "id"))
      .filter((t) => hidden.indexOf(t.label) === -1)
      .map((t) => {
        const active = current && t.href.split("/").pop() === current ? " active" : "";
        return `<a class="nav-item${active}" href="${ROOT}${t.href}" title="${t.label}" style="--icon-bg:${t.c1}">
          <span class="nav-ico"><svg viewBox="0 0 48 48">${t.icon}</svg></span>
          <span class="label">${t.label}</span>
        </a>`;
      })
      .join("");
    const nav = mount.querySelector(".nav-items");
    if (nav) nav.innerHTML = items;
  }

  mount.className = "navbar";
  mount.innerHTML = `
    <a class="nav-brand" href="${ROOT}index.html" title="Beranda">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
      <span>Beranda</span>
    </a>
    <nav class="nav-items"></nav>
  `;

  // Isi item (sudah difilter hide) + sync saat berubah
  buildItems();
  window.addEventListener("tools-hidden-change", buildItems);
  // Enable transisi setelah render pertama (cegah slide-from-left saat load)
  setTimeout(() => mount.classList.add("loaded"), 50);

  // Burger (muncul < 1048px, toggle sidebar)
  const burger = document.createElement("button");
  burger.className = "nav-burger";
  burger.setAttribute("aria-label", "Buka menu");
  burger.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  document.body.appendChild(burger);
  burger.addEventListener("click", () => mount.classList.toggle("open"));
  let overBurger = false,
    overNav = false,
    closeTimer = null;
  function scheduleClose() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      if (!overBurger && !overNav) mount.classList.remove("open");
    }, 120);
  }
  burger.addEventListener("mouseenter", () => {
    clearTimeout(closeTimer);
    overBurger = true;
    mount.classList.add("open");
  });
  burger.addEventListener("mouseleave", () => {
    overBurger = false;
    scheduleClose();
  });
  mount.addEventListener("mouseenter", () => {
    clearTimeout(closeTimer);
    overNav = true;
  });
  mount.addEventListener("mouseleave", () => {
    overNav = false;
    scheduleClose();
  });
  mount.querySelectorAll(".nav-item").forEach((a) =>
    a.addEventListener("click", () => mount.classList.remove("open"))
  );
})();
