import axios from 'axios';
import * as cheerio from 'cheerio';

// Country-specific brand domains
const BRAND_DOMAINS: Record<string, string | Record<string, string>> = {
  apple: {
    US: 'https://www.apple.com',
    IN: 'https://www.apple.com/in',
    UK: 'https://www.apple.com/uk',
    CA: 'https://www.apple.com/ca',
    AU: 'https://www.apple.com/au',
    SG: 'https://www.apple.com/sg',
    JP: 'https://www.apple.com/jp',
    DE: 'https://www.apple.com/de',
    FR: 'https://www.apple.com/fr',
    IT: 'https://www.apple.com/it',
    ES: 'https://www.apple.com/es',
    // Add more as needed
  },
  samsung: {
    US: 'https://www.samsung.com/us',
    IN: 'https://www.samsung.com/in',
    UK: 'https://www.samsung.com/uk',
    CA: 'https://www.samsung.com/ca',
    AU: 'https://www.samsung.com/au',
    SG: 'https://www.samsung.com/sg',
    JP: 'https://www.samsung.com/jp',
    DE: 'https://www.samsung.com/de',
    FR: 'https://www.samsung.com/fr',
    IT: 'https://www.samsung.com/it',
    ES: 'https://www.samsung.com/es',
  },
  boat: {
    IN: 'https://www.boat-lifestyle.com',
    // Default to IN
  },
  flipkart: {
    IN: 'https://www.flipkart.com',
  },
  amazon: {
    US: 'https://www.amazon.com',
    IN: 'https://www.amazon.in',
    UK: 'https://www.amazon.co.uk',
    CA: 'https://www.amazon.ca',
    AU: 'https://www.amazon.com.au',
    SG: 'https://www.amazon.sg',
    JP: 'https://www.amazon.co.jp',
    DE: 'https://www.amazon.de',
    FR: 'https://www.amazon.fr',
    IT: 'https://www.amazon.it',
    ES: 'https://www.amazon.es',
    MX: 'https://www.amazon.com.mx',
    BR: 'https://www.amazon.com.br',
    AE: 'https://www.amazon.ae',
    SA: 'https://www.amazon.sa',
  },
  // Add more brands and countries as needed
};

function getBrandDomain(brand: string, country?: string): string | null {
  const entry = BRAND_DOMAINS[brand];
  if (!entry) return null;
  if (typeof entry === 'string') return entry;
  if (country && entry[country]) return entry[country];
  // Fallback to US or first available
  return entry['US'] || Object.values(entry)[0] || null;
}

async function tryGoogle(query: string, country?: string) {
  try {
    const tld = country && country !== 'US' ? country.toLowerCase() : 'com';
    const googleUrl = `https://www.google.${tld}/search?q=${encodeURIComponent(query + ' official site ' + (country || ''))}`;
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Referer': 'https://www.google.com/',
    };
    const resp = await axios.get(googleUrl, { headers });
    const html = resp.data;
    const $ = cheerio.load(html);
    // Try to find the first organic result (skip ads, featured snippets)
    let foundUrl = '';
    let foundTitle = '';
    // Google desktop: .g .yuRUbf > a
    const allResults = $('.g .yuRUbf > a').toArray();
    // Prefer result with country TLD
    let bestResult: any = null;
    for (const el of allResults) {
      const href = $(el).attr('href') || '';
      if (country && href.match(new RegExp(`\\.${country.toLowerCase()}[\\/\?]`))) {
        bestResult = el;
        break;
      }
    }
    if (!bestResult && allResults.length) bestResult = allResults[0];
    if (bestResult) {
      foundUrl = $(bestResult).attr('href') || '';
      foundTitle = $(bestResult).find('h3').text().trim();
    }
    if (foundUrl && !foundUrl.includes('google.com') && !foundUrl.includes('/search?')) {
      return { url: foundUrl, title: foundTitle };
    }
    return null;
  } catch (err) {
    console.warn('Google official site finder error:', err);
    return null;
  }
}

async function tryBing(query: string, country?: string) {
  try {
    const bingUrl = `https://www.bing.com/search?q=${encodeURIComponent(query + ' official site ' + (country || ''))}`;
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Referer': 'https://www.bing.com/',
    };
    const resp = await axios.get(bingUrl, { headers });
    const html = resp.data;
    const $ = cheerio.load(html);
    // Bing: .b_algo h2 a
    const allResults = $('.b_algo h2 a').toArray();
    let bestResult: any = null;
    for (const el of allResults) {
      const href = $(el).attr('href') || '';
      if (country && href.match(new RegExp(`\\.${country.toLowerCase()}[\\/\?]`))) {
        bestResult = el;
        break;
      }
    }
    if (!bestResult && allResults.length) bestResult = allResults[0];
    if (bestResult) {
      const foundUrl = $(bestResult).attr('href') || '';
      const foundTitle = $(bestResult).text().trim();
      if (foundUrl && !foundUrl.includes('bing.com')) {
        return { url: foundUrl, title: foundTitle };
      }
    }
    return null;
  } catch (err) {
    console.warn('Bing official site finder error:', err);
    return null;
  }
}

async function tryDuckDuckGo(query: string, country?: string) {
  try {
    const ddgUrl = `https://duckduckgo.com/html/?q=${encodeURIComponent(query + ' official site ' + (country || ''))}`;
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Referer': 'https://duckduckgo.com/',
    };
    const resp = await axios.get(ddgUrl, { headers });
    const html = resp.data;
    const $ = cheerio.load(html);
    // DuckDuckGo: .result__a
    const allResults = $('.result__a').toArray();
    let bestResult: any = null;
    for (const el of allResults) {
      const href = $(el).attr('href') || '';
      if (country && href.match(new RegExp(`\\.${country.toLowerCase()}[\\/\?]`))) {
        bestResult = el;
        break;
      }
    }
    if (!bestResult && allResults.length) bestResult = allResults[0];
    if (bestResult) {
      const foundUrl = $(bestResult).attr('href') || '';
      const foundTitle = $(bestResult).text().trim();
      if (foundUrl && !foundUrl.includes('duckduckgo.com')) {
        return { url: foundUrl, title: foundTitle };
      }
    }
    return null;
  } catch (err) {
    console.warn('DuckDuckGo official site finder error:', err);
    return null;
  }
}

function tryBrandHeuristic(query: string, country?: string): { url: string, title: string } | null {
  const lower = query.toLowerCase();
  for (const brand in BRAND_DOMAINS) {
    if (lower.includes(brand)) {
      const url = getBrandDomain(brand, country);
      if (url) {
        return { url, title: `${brand.charAt(0).toUpperCase() + brand.slice(1)} Official Site` };
      }
    }
  }
  return null;
}

// Helper: Try to extract product info from a product page
async function scrapeProductPage(url: string): Promise<{ imageUrl?: string; price?: string; rating?: string }> {
  try {
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 10000,
    });
    const $ = cheerio.load(html);
    // Try common selectors for image, price, rating
    let imageUrl =
      $('meta[property="og:image"]').attr('content') ||
      $('img[alt*="product"], img[alt*="Product"], img').first().attr('src') ||
      '';
    let price =
      $('[itemprop="price"]').attr('content') ||
      $('[class*="price"], .price, .product-price').first().text().replace(/[^\d.,₹$€£]/g, '').trim() ||
      '';
    let rating =
      $('[itemprop="ratingValue"]').attr('content') ||
      $('[class*="rating"], .star-rating').first().text().trim() ||
      '';
    // Clean up image URL if needed
    if (imageUrl && imageUrl.startsWith('//')) imageUrl = 'https:' + imageUrl;
    return { imageUrl, price, rating };
  } catch (err) {
    console.warn('Error scraping product page:', err);
    return {};
  }
}

// Helper: Find the most relevant product page on the official site
async function findProductPageOnOfficialSite(brandUrl: string, query: string, country?: string): Promise<string | null> {
  // Use Google or Bing to search: site:brandUrl query
  const searchQuery = `site:${brandUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')} ${query}`;
  // Try Google first
  let result = await tryGoogle(searchQuery, country);
  if (result && result.url && result.url.includes(brandUrl)) return result.url;
  // Try Bing
  result = await tryBing(searchQuery, country);
  if (result && result.url && result.url.includes(brandUrl)) return result.url;
  // Try DuckDuckGo
  result = await tryDuckDuckGo(searchQuery, country);
  if (result && result.url && result.url.includes(brandUrl)) return result.url;
  return null;
}

export async function getOfficialSiteUrl(query: string, country?: string): Promise<{ url: string, title: string, imageUrl?: string, price?: string, rating?: string } | null> {
  // Try Google
  let result = await tryGoogle(query, country);
  if (!result) result = await tryBing(query, country);
  if (!result) result = await tryDuckDuckGo(query, country);
  // Try brand heuristic
  if (!result) result = tryBrandHeuristic(query, country);
  if (!result) return null;

  let { url, title } = result;
  let imageUrl = '', price = '', rating = '';

  // Try to find a product page on the official site
  const brandMatch = Object.keys(BRAND_DOMAINS).find((b) => query.toLowerCase().includes(b));
  let brandUrl = '';
  if (brandMatch) {
    brandUrl = getBrandDomain(brandMatch, country) || '';
    // If the found url is not a product page, try to find one
    if (brandUrl && url.replace(/\/$/, '') === brandUrl.replace(/\/$/, '')) {
      const productPage = await findProductPageOnOfficialSite(brandUrl, query, country);
      if (productPage) url = productPage;
    }
  }

  // Scrape the product page for image, price, rating
  const scraped = await scrapeProductPage(url);
  imageUrl = scraped.imageUrl || '';
  price = scraped.price || '';
  rating = scraped.rating || '';

  return { url, title, imageUrl, price, rating };
} 