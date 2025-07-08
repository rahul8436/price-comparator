import { ProductResult } from '@/types/product';
import axios from 'axios';
import * as cheerio from 'cheerio';

export class FlipkartScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    try {
      const url = `https://www.flipkart.com/search?q=${encodeURIComponent(
        query
      )}`;
      console.log(`Attempting to scrape Flipkart: ${url}`);

      const { data: html } = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          Connection: 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(html);
      const products: ProductResult[] = [];

      // Try multiple selectors for product containers
      const productSelectors = [
        'div[data-id]',
        '.tUxRFH',
        '[data-tkid]',
        '.s-result-item',
        '.product-item',
      ];

      let productElements = null;
      for (const selector of productSelectors) {
        productElements = $(selector);
        if (productElements.length > 0) {
          console.log(
            `Found ${productElements.length} products using selector: ${selector}`
          );
          break;
        }
      }

      if (!productElements || productElements.length === 0) {
        console.log(
          'No products found with any selector, trying fallback approach'
        );
        // Fallback: look for any div with a link and price-like text
        productElements = $('div').filter((_, el) => {
          const $el = $(el);
          return (
            $el.find('a[href*="/p/"]').length > 0 && /₹\d+/.test($el.text())
          );
        });
      }

      productElements.each((_, el) => {
        try {
          const $el = $(el);

          // Product Name: try multiple selectors
          let productName = '';
          const nameSelectors = [
            '.KzDlHZ',
            'h2 a span',
            '.product-name',
            'a[title]',
            'h3',
            'h4',
          ];

          for (const selector of nameSelectors) {
            productName = $el.find(selector).first().text().trim();
            if (productName) break;
          }

          // Price: try multiple selectors and patterns
          let rawPrice = '';
          const priceSelectors = [
            '.Nx9bqj._4b5DiR',
            '.price',
            '[class*="price"]',
            'span:contains("₹")',
            '.product-price',
          ];

          for (const selector of priceSelectors) {
            rawPrice = $el.find(selector).first().text().trim();
            if (rawPrice && rawPrice.includes('₹')) break;
          }

          // If no price found with selectors, try regex on the element text
          if (!rawPrice || !rawPrice.includes('₹')) {
            const text = $el.text();
            const priceMatch = text.match(/₹[\d,]+/);
            if (priceMatch) {
              rawPrice = priceMatch[0];
            }
          }

          // Clean and validate price
          const cleanedPrice = rawPrice.replace(/[^\d]/g, '');
          const priceNum = Number(cleanedPrice);

          if (!cleanedPrice || isNaN(priceNum) || priceNum < 100) {
            console.log(
              `Skipping product due to invalid price: ${rawPrice} -> ${cleanedPrice}`
            );
            return;
          }

          // Link: try multiple selectors
          let link = '';
          const linkSelectors = [
            'a.CGtC98',
            'a[href*="/p/"]',
            'a[href*="flipkart"]',
            'a',
          ];

          for (const selector of linkSelectors) {
            link = $el.find(selector).first().attr('href') || '';
            if (link && (link.includes('/p/') || link.includes('flipkart')))
              break;
          }

          if (!link) return;

          // Image: try multiple selectors
          let imageUrl = '';
          const imageSelectors = [
            'img.DByuf4',
            'img[src*="rukminim"]',
            'img[src*="flipkart"]',
            'img',
          ];

          for (const selector of imageSelectors) {
            imageUrl = $el.find(selector).first().attr('src') || '';
            if (imageUrl) break;
          }

          // Rating: try multiple selectors
          let rating = '';
          const ratingSelectors = [
            '.XQDdHH',
            '[class*="rating"]',
            '.star-rating',
            'span:contains("★")',
          ];

          for (const selector of ratingSelectors) {
            rating = $el.find(selector).first().text().trim();
            if (rating) break;
          }

          // Availability check
          const unavailable =
            $el.text().toLowerCase().includes('unavailable') ||
            $el.text().toLowerCase().includes('out of stock');

          if (productName && cleanedPrice && link) {
            products.push({
              link: link.startsWith('http')
                ? link
                : `https://www.flipkart.com${link}`,
              price: cleanedPrice,
              currency: 'INR', // Always INR for Flipkart
              productName,
              source: 'Flipkart',
              imageUrl,
              rating: rating || '',
              availability: unavailable ? 'Unavailable' : 'Available',
            });
          }
        } catch (error) {
          console.log(`Error processing product element:`, error);
          return; // Fixed: use return instead of continue
        }
      });

      console.log(`Flipkart scraper found ${products.length} products`);
      return products;
    } catch (error) {
      console.error('Error scraping Flipkart:', error);
      return [];
    }
  }
}
