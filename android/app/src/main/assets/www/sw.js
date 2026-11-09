// Progressive Web App Service Worker for imi Studio
const CACHE_NAME = 'imi-pwa-cache-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-192-maskable.png',
  '/icon-512.png',
  '/icon-512-maskable.png',
  '/robots.txt',
  '/sitemap.xml'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Cache prefill notice:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // 1. Pass through non-GET, API, Firestore, WebSocket, and all Media (video/audio/range) requests
  if (
    event.request.method !== 'GET' ||
    url.includes('/api/') ||
    url.includes('/sample_videos/') ||
    url.endsWith('.mp4') ||
    url.endsWith('.webm') ||
    url.endsWith('.mov') ||
    url.endsWith('.m3u8') ||
    url.includes('firestore.googleapis.com') ||
    url.includes('firebaseio.com') ||
    url.includes('images.unsplash.com') ||
    event.request.destination === 'video' ||
    event.request.destination === 'audio' ||
    event.request.headers.has('range')
  ) {
    return;
  }

  // 2. For navigation / standard assets, fetch with cache fallback
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((res) => {
        return res || (event.request.mode === 'navigate' ? caches.match('/index.html') : undefined);
      });
    })
  );
});

// Handle Background Push Notifications (for APK / PWA background wakeup)
self.addEventListener('push', (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const isCall = data.type === 'call' || data.tag === 'incoming-call';

    const title = data.title || (isCall ? '📞 مكالمة واردة' : '💬 رسالة جديدة');
    const options = {
      body: data.body || (isCall ? 'مكالمة واردة... انقر للرد' : 'لديك رسالة جديدة'),
      icon: data.icon || '/icon-192.png',
      badge: '/icon-192.png',
      tag: data.tag || (isCall ? 'incoming-call' : 'msg'),
      renotify: true,
      requireInteraction: isCall, // keep on screen for incoming calls
      vibrate: isCall ? [1000, 500, 1000, 500, 1000] : [200, 100, 200],
      data: data
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } catch (err) {
    console.warn('Push notification handling notice:', err);
  }
});

// Handle notification click to bring app to foreground
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        let client = clientList[0];
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i];
            break;
          }
        }
        return client.focus();
      }
      return self.clients.openWindow('/');
    })
  );
});
