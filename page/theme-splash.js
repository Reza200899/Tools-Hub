// Theme splash — efek "keluar dari tombol" saat ganti tema.
// Dipakai semua page + index. Panggil: triggerThemeSplash(btn, nextTheme, applyTheme).
(function () {
  function ensureSplash() {
    let s = document.getElementById("theme-splash");
    if (!s) {
      s = document.createElement("div");
      s.id = "theme-splash";
      document.body.appendChild(s);
    }
    return s;
  }

  window.triggerThemeSplash = function (btn, nextTheme, applyTheme) {
    const splash = ensureSplash();
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    splash.style.setProperty("--x", x + "px");
    splash.style.setProperty("--y", y + "px");
    // Warna splash = tema tujuan (biar keliatan "membesar" ke tema baru)
    splash.style.background =
      nextTheme === "dark" ? "#000000" : "#f5f5f7";

    splash.classList.remove("run");
    // force reflow biar animasi restart
    void splash.offsetWidth;
    splash.classList.add("run");

    // Ganti tema saat splash menutupi layar (di tengah animasi)
    setTimeout(() => {
      try { applyTheme(nextTheme); } catch (e) {}
    }, 220);
    // Bersihkan setelah animasi selesai
    setTimeout(() => splash.classList.remove("run"), 650);
  };
})();
