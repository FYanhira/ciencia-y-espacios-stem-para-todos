(function () {
  const urlEl = document.getElementById("current-url");
  if (urlEl) urlEl.textContent = window.location.href.replace(/\/$/, "") + "/";

  const installBlock = document.getElementById("install-block");
  const btnInstall = document.getElementById("btn-install");
  let deferredPrompt = null;

  if (window.matchMedia("(display-mode: standalone)").matches) {
    if (installBlock) installBlock.hidden = true;
  } else if (installBlock) {
    installBlock.hidden = false;
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (btnInstall) btnInstall.hidden = false;
  });

  if (btnInstall) {
    btnInstall.addEventListener("click", async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      btnInstall.hidden = true;
    });
  }

  if (location.protocol !== "file:" && "serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(() => {});
  }
})();
