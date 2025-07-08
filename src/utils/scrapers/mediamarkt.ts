import { BaseScraper } from '@/utils/scraper';
import { ProductResult } from '@/types/product';

export class MediaMarktScraper extends BaseScraper {
  constructor() {
    super({
      name: 'MediaMarkt',
      baseUrl: 'https://www.mediamarkt.de',
      searchUrl: 'https://www.mediamarkt.de/de/search.html?query={query}',
      selectors: {
        productContainer: '.product-wrapper, .product-item, .search-result-item',
        productName: '.product-title, .product-name, .product-headline',
        price: '.price, .price-current, .product-price',
        link: '.product-title a, .product-name a, .product-link',
        image: '.product-image img, .product-thumbnail img, .product-picture',
        rating: '.rating, .product-rating, .star-rating',
        availability: '.availability, .product-availability, .stock-status',
      },
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': 'https://www.mediamarkt.de/',
      },
    });
  }

  async fetchProducts(query: string): Promise<ProductResult[]> {
    return this.scrape(query);
  }
} 