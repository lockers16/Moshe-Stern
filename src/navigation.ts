export const tabToUrlMap: Record<string, string> = {
  'home': '/index.html',
  'about': '/about.html',
  'hosting-home': '/hosting.html',
  'hosting-gallery': '/hosting-gallery.html',
  'gallery': '/hosting-gallery.html',
  'hosting-reviews': '/hosting-reviews.html',
  'speeches-home': '/speeches.html',
  'speeches-full': '/speeches-examples.html',
  'speeches': '/speeches-examples.html',
  'speeches-reviews': '/speeches-reviews.html',
  'reviews': '/hosting-reviews.html',
  'contact': '/contact.html',
};

export const urlToTabMap: Record<string, string> = {
  '/': 'home',
  '/index.html': 'home',
  '/about.html': 'about',
  '/hosting.html': 'hosting-home',
  '/hosting-gallery.html': 'hosting-gallery',
  '/hosting-reviews.html': 'hosting-reviews',
  '/speeches.html': 'speeches-home',
  '/speeches-examples.html': 'speeches-full',
  '/speeches-reviews.html': 'speeches-reviews',
  '/contact.html': 'contact',
};

export function getInitialTabFromLocation(): string {
  if (typeof window === 'undefined') return 'home';

  // 1. Check if current history state has a tab stored
  if (window.history.state && typeof window.history.state.tab === 'string') {
    return window.history.state.tab;
  }
  
  // 2. Check current pathname matching against urlToTabMap
  const path = window.location.pathname;
  
  // Exact match
  if (urlToTabMap[path]) {
    return urlToTabMap[path];
  }

  // Substring match (e.g., /hosting.html or /subfolder/hosting.html)
  for (const [url, tab] of Object.entries(urlToTabMap)) {
    if (url !== '/' && path.endsWith(url)) {
      return tab;
    }
  }

  // 3. Fallback: check dataset.page if path is root '/' or unknown
  const rootEl = document.getElementById('root');
  if (rootEl?.dataset?.page) {
    return rootEl.dataset.page;
  }

  return 'home';
}
