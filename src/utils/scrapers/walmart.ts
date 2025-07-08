import { BaseScraper } from '@/utils/scraper';
import { ProductResult } from '@/types/product';

export class WalmartScraper extends BaseScraper {
  constructor() {
    super({
      name: 'Walmart',
      baseUrl: 'https://www.walmart.com',
      searchUrl: 'https://www.walmart.com/search?q={query}&affinityOverride=default',
      selectors: {
        productContainer: '[data-item-id], .search-result-gridview-item, .product-tile',
        productName: '.product-title-link, .product-title, .product-name',
        price: '.price-main, .price-characteristic, .price-current',
        link: '.product-title-link, .product-title a, .product-name a',
        image: '.product-image-photo, .product-image img, .tile-image',
        rating: '.stars-container, .rating-stars, .product-rating',
        availability: '.product-available-store, .availability-message, .fulfillment-messaging',
      },
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': 'https://www.walmart.com/',
      },
    });
  }

  async fetchProducts(query: string): Promise<ProductResult[]> {
    return this.scrape(query);
  }
} 