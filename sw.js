/* Man vs. Math service worker v9: pass same-origin requests through to the network.
   Chrome needs a fetch handler to treat the page as installable. We do not
   cache, and we never intercept cross-origin requests (Firebase, gstatic, fonts),
   so a classroom proxy or slow CDN cannot stall this worker. */
self.addEventListener("install", () => {
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (url.protocol !== "http:" && url.protocol !== "https:") return;
  event.respondWith(fetch(event.request));
});
