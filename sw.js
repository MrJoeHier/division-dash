/* Man vs. Math service worker: pass every request through to the network.
   Chrome needs a fetch handler to treat the page as installable. We do not
   cache, so you always get the current game, Firebase, video, and audio. */
self.addEventListener("install", () => {
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (url.protocol !== "http:" && url.protocol !== "https:") return;
  event.respondWith(fetch(event.request));
});
