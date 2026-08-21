const C = "chmura-21.08-0756";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k !== C) await caches.delete(k);
  await self.clients.claim();
})()));
self.addEventListener("fetch", (e) => {
  if (e.request.mode !== "navigate") return;
  e.respondWith((async () => {
    try {
      const r = await fetch(e.request, { cache: "no-store" });
      (await caches.open(C)).put(e.request, r.clone());
      return r;
    } catch (_e) { return (await caches.match(e.request)) || Response.error(); }
  })());
});
