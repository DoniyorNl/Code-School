// Service Worker for PWA
// This enables offline functionality and caching

const CACHE_NAME = 'codeschool-v1'
const OFFLINE_URL = '/offline'

// Assets to cache on install
const PRECACHE_ASSETS = [
	'/',
	'/offline',
	'/logo.svg',
	'/logoPng.png',
	'/hero.png',
	'/favicon.ico',
	'/manifest.json',
]

// Install event - cache essential assets
self.addEventListener('install', event => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(cache => {
				console.log('[SW] Precaching assets')
				return cache.addAll(PRECACHE_ASSETS)
			})
			.then(() => self.skipWaiting()),
	)
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
	event.waitUntil(
		caches
			.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames.map(cacheName => {
						if (cacheName !== CACHE_NAME) {
							console.log('[SW] Deleting old cache:', cacheName)
							return caches.delete(cacheName)
						}
					}),
				)
			})
			.then(() => self.clients.claim()),
	)
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
	// Skip cross-origin requests
	if (!event.request.url.startsWith(self.location.origin)) {
		return
	}

	// Skip non-GET requests
	if (event.request.method !== 'GET') {
		return
	}

	event.respondWith(
		caches
			.match(event.request)
			.then(cachedResponse => {
				// Return cached version if available
				if (cachedResponse) {
					// Update cache in background
					fetch(event.request)
						.then(response => {
							if (response && response.status === 200) {
								caches.open(CACHE_NAME).then(cache => {
									cache.put(event.request, response.clone())
								})
							}
						})
						.catch(() => {
							// Network failed, using cached version
						})

					return cachedResponse
				}

				// Fetch from network
				return fetch(event.request)
					.then(response => {
						// Don't cache if not successful
						if (!response || response.status !== 200 || response.type !== 'basic') {
							return response
						}

						// Clone response for caching
						const responseToCache = response.clone()

						caches.open(CACHE_NAME).then(cache => {
							cache.put(event.request, responseToCache)
						})

						return response
					})
					.catch(error => {
						// Network failed, check if we should show offline page
						if (event.request.mode === 'navigate') {
							return caches.match(OFFLINE_URL)
						}
						throw error
					})
			})
			.catch(() => {
				// If both cache and network fail, show offline page for navigation
				if (event.request.mode === 'navigate') {
					return caches.match(OFFLINE_URL)
				}
			}),
	)
})

// Background sync (optional - for future use)
self.addEventListener('sync', event => {
	if (event.tag === 'sync-data') {
		event.waitUntil(
			// Sync data when connection is restored
			console.log('[SW] Background sync triggered'),
		)
	}
})

// Push notification (optional - for future use)
self.addEventListener('push', event => {
	const data = event.data ? event.data.json() : {}
	const title = data.title || 'CodeSchool'
	const options = {
		body: data.body || 'Yangi yangilik!',
		icon: '/logoPng.png',
		badge: '/logo.svg',
		data: data.url,
	}

	event.waitUntil(self.registration.showNotification(title, options))
})

// Notification click
self.addEventListener('notificationclick', event => {
	event.notification.close()

	if (event.notification.data) {
		event.waitUntil(clients.openWindow(event.notification.data))
	}
})
