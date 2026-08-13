export const tabToUrlMap: Record<string, string> = {
  'home': '/',
  'about': '/about',
  'hosting-home': '/hosting',
  'hosting-gallery': '/hosting-gallery',
  'gallery': '/hosting-gallery',
  'hosting-reviews': '/hosting-reviews',
  'speeches-home': '/speeches',
  'speeches-full': '/speeches-examples',
  'speeches': '/speeches-examples',
  'speeches-reviews': '/speeches-reviews',
  'reviews': '/hosting-reviews',
  'contact': '/contact',
};

export const urlToTabMap: Record<string, string> = {
  '/': 'home',
  '/index': 'home',
  '/index.html': 'home',
  '/about': 'about',
  '/about.html': 'about',
  '/hosting': 'hosting-home',
  '/hosting.html': 'hosting-home',
  '/hosting-gallery': 'hosting-gallery',
  '/hosting-gallery.html': 'hosting-gallery',
  '/hosting-reviews': 'hosting-reviews',
  '/hosting-reviews.html': 'hosting-reviews',
  '/speeches': 'speeches-home',
  '/speeches.html': 'speeches-home',
  '/speeches-examples': 'speeches-full',
  '/speeches-examples.html': 'speeches-full',
  '/speeches-reviews': 'speeches-reviews',
  '/speeches-reviews.html': 'speeches-reviews',
  '/contact': 'contact',
  '/contact.html': 'contact',
};

export function getInitialTabFromLocation(): string {
  if (typeof window === 'undefined') return 'home';

  // 1. Check if current history state has a tab stored
  if (window.history.state && typeof window.history.state.tab === 'string') {
    return window.history.state.tab;
  }
  
  // 2. Check current pathname matching against urlToTabMap
  let path = window.location.pathname;
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  
  // Exact match
  if (urlToTabMap[path]) {
    return urlToTabMap[path];
  }

  // Check clean path without .html
  if (path.endsWith('.html')) {
    const cleanPath = path.replace(/\.html$/, '');
    if (urlToTabMap[cleanPath]) {
      return urlToTabMap[cleanPath];
    }
  }

  // Substring match
  for (const [url, tab] of Object.entries(urlToTabMap)) {
    if (url !== '/' && (path.endsWith(url) || path.endsWith(url + '.html'))) {
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
