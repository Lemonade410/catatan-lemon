/* Catatan Lemon: simpan file aplikasi di perangkat supaya tetap bisa dibuka tanpa sinyal.
   Hanya file aplikasi & materi edukasi yang disimpan; isian pasien tidak pernah lewat sini. */
const VERSI = 'cl-2026-11-01c';
const INTI = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png',
  './edukasi/', './edukasi/index.html', './edukasi/materi.js', './edukasi/lib/qrcode.js'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSI).then(c => c.addAll(INTI)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSI).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// File sendiri: coba internet dulu (supaya selalu versi terbaru), kalau gagal/lambat pakai simpanan.
// Font Google: pakai simpanan dulu.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) { e.respondWith(internetDulu(req)); return; }
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) e.respondWith(simpananDulu(req));
});
async function internetDulu(req) {
  const c = await caches.open(VERSI);
  try {
    const res = await Promise.race([fetch(req), new Promise((_, no) => setTimeout(() => no(new Error('lambat')), 4000))]);
    if (res && res.ok) c.put(req, res.clone());
    return res;
  } catch (err) {
    const hit = await c.match(req, { ignoreSearch: true });
    if (hit) return hit;
    if (req.mode === 'navigate') return (await c.match('./index.html')) || Response.error();
    return Response.error();
  }
}
async function simpananDulu(req) {
  const c = await caches.open(VERSI);
  const hit = await c.match(req);
  if (hit) return hit;
  try { const res = await fetch(req); if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()); return res; }
  catch (err) { return Response.error(); }
}
