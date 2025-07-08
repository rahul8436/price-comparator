import axios from 'axios';
import * as cheerio from 'cheerio';
import { ProductResult, ScraperConfig } from '@/types/product';

export class BaseScraper {
  private config: ScraperConfig;

  constructor(config: ScraperConfig) {
    this.config = config;
  }

  async scrape(query: string): Promise<ProductResult[]> {
    const userAgents = [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
    ];

    const searchUrl = this.config.searchUrl.replace(
      '{query}',
      encodeURIComponent(query)
    );

    // Try multiple approaches
    for (let attempt = 1; attempt <= 3; attempt++) {
      for (const userAgent of userAgents) {
        try {
          console.log(
            `Attempting to scrape ${
              this.config.name
            } (attempt ${attempt}, UA: ${userAgent.substring(0, 50)}...)`
          );

          const response = await this.makeRequest(
            searchUrl,
            userAgent,
            attempt
          );

          if (response && response.data) {
            const products = this.parseProducts(response.data);
            if (products.length > 0) {
              console.log(
                `Successfully scraped ${products.length} products from ${this.config.name}`
              );
              return products;
            }
          }
        } catch (error) {
          console.log(
            `Failed attempt ${attempt} for ${
              this.config.name
            } with UA: ${userAgent.substring(0, 30)}...`
          );
          continue;
        }

        // Small delay between attempts
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Longer delay between major attempts
      if (attempt < 3) {
        console.log(
          `Waiting before retry ${attempt + 1} for ${this.config.name}...`
        );
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    console.log(
      `All attempts failed for ${this.config.name}, returning empty results`
    );
    return [];
  }

  private async makeRequest(url: string, userAgent: string, attempt: number) {
    // Add random delay to appear more human-like
    const randomDelay = Math.random() * 2000 + 1000; // 1-3 seconds
    await new Promise((resolve) => setTimeout(resolve, randomDelay));

    const headers = {
      'User-Agent': userAgent,
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Cache-Control': 'max-age=0',
      DNT: '1',
      Referer: 'https://www.google.com/',
      'X-Forwarded-For': this.getRandomIP(),
      'X-Real-IP': this.getRandomIP(),
      ...this.config.headers,
    };

    // Add more sophisticated headers for later attempts
    if (attempt > 1) {
      headers['X-Requested-With'] = 'XMLHttpRequest';
      headers['Sec-Ch-Ua'] =
        '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"';
      headers['Sec-Ch-Ua-Mobile'] = '?0';
      headers['Sec-Ch-Ua-Platform'] = '"macOS"';
      headers['Sec-Ch-Ua-Full-Version'] = '"120.0.6099.109"';
      headers['Sec-Ch-Ua-Platform-Version'] = '"14.1.2"';
    }

    return await axios.get(url, {
      headers,
      timeout: 15000 + attempt * 5000, // Increase timeout for later attempts
      maxRedirects: 5,
      validateStatus: (status) => status < 500, // Accept 4xx status codes for analysis
    });
  }

  protected parseProducts(html: string): ProductResult[] {
    try {
      // Enhanced Bot/CAPTCHA detection (generic for all scrapers)
      const lowerHtml = html.toLowerCase();
      if (
        lowerHtml.includes('captcha') ||
        lowerHtml.includes('robot check') ||
        lowerHtml.includes('to discuss automated access') ||
        lowerHtml.includes('enter the characters you see below') ||
        lowerHtml.includes('are you a human') ||
        lowerHtml.includes('robot or human') ||
        lowerHtml.includes('please verify you are human') ||
        lowerHtml.includes('security check') ||
        lowerHtml.includes('access denied') ||
        lowerHtml.includes('blocked') ||
        lowerHtml.includes('suspicious activity')
      ) {
        console.warn(
          'Bot/CAPTCHA detected in response HTML. Scraper likely blocked.'
        );
        console.warn('Blocked HTML preview:', html.substring(0, 1000));
        return [];
      }

      const $ = cheerio.load(html);
      const products: ProductResult[] = [];

      $(this.config.selectors.productContainer).each((_, element) => {
        const $el = $(element);

        const productName = $el
          .find(this.config.selectors.productName)
          .text()
          .trim();
        const rawPrice = $el.find(this.config.selectors.price).text().trim();
        const link = $el.find(this.config.selectors.link).attr('href') || '';
        const imageUrl = this.config.selectors.image
          ? $el.find(this.config.selectors.image).attr('src') || ''
          : '';
        const rating = this.config.selectors.rating
          ? $el.find(this.config.selectors.rating).text().trim()
          : '';
        const availability = this.config.selectors.availability
          ? $el.find(this.config.selectors.availability).text().trim()
          : '';

        if (productName && rawPrice && link) {
          const cleanedPrice = this.cleanPrice(rawPrice);
          console.log(
            `Price cleaning for ${this.config.name}: "${rawPrice}" -> "${cleanedPrice}"`
          );

          products.push({
            link: link.startsWith('http')
              ? link
              : `${this.config.baseUrl}${link}`,
            price: cleanedPrice,
            currency: this.extractCurrency(rawPrice),
            productName,
            source: this.config.name,
            imageUrl,
            rating,
            availability,
          });
        }
      });

      if (products.length === 0) {
        console.warn(
          `No products found for ${this.config.name}. HTML preview:`
        );
        console.warn(html.substring(0, 1000));
      }

      return products;
    } catch (error) {
      console.error(`Error parsing HTML for ${this.config.name}:`, error);
      return [];
    }
  }

  protected cleanPrice(priceText: string): string {
    // Remove currency symbols and extra whitespace
    let cleaned = priceText.replace(/[₹$£€¥R$A$C$]/g, '').trim();

    // Remove common price text like "MRP", "Price", etc.
    cleaned = cleaned.replace(/\b(MRP|Price|Rs\.?|USD|GBP|EUR)\b/gi, '');

    // Extract the first number pattern (handles formats like "1,499.00", "1499", "1,499")
    const priceMatch = cleaned.match(/(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/);

    if (priceMatch) {
      // Remove commas and return the clean number
      return priceMatch[1].replace(/,/g, '');
    }

    // Fallback: remove all non-digit characters except decimal point
    return cleaned.replace(/[^\d.]/g, '');
  }

  protected extractCurrency(priceText: string, forceCurrency?: string): string {
    if (forceCurrency) return forceCurrency;
    // Prioritize INR, then other currencies, then USD
    if (priceText.includes('₹')) return 'INR';
    if (priceText.includes('£')) return 'GBP';
    if (priceText.includes('€')) return 'EUR';
    if (priceText.includes('¥')) return 'JPY';
    if (priceText.includes('R$')) return 'BRL';
    if (priceText.includes('A$')) return 'AUD';
    if (priceText.includes('C$')) return 'CAD';
    if (priceText.includes('$')) return 'USD';
    return 'USD'; // default
  }

  private getRandomIP(): string {
    // Generate a random US IP address
    const octets = [
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
    ];
    return octets.join('.');
  }
}
