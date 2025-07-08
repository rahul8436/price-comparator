import { BaseScraper } from '@/utils/scraper';
import { ProductResult } from '@/types/product';

export class NoonScraper extends BaseScraper {
  constructor() {
    super({
      name: 'Noon',
      baseUrl: 'https://noon.partners',
      searchUrl: 'https://noon.partners/en-ae/search?q={query}',
      selectors: {
        productContainer: '.productCard, .product-card, .search-result-item',
        productName: '.product-name, .product-title, .product-link',
        price: '.product-price, .price-current, .price',
        link: '.product-link, .product-name a, .product-title a',
        image: '.product-image img, .product-thumbnail img, .product-picture',
        rating: '.product-rating, .rating, .star-rating',
        availability: '.product-availability, .availability, .stock-status',
      },
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-AE,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': 'https://noon.partners/',
      },
    });
  }

  async fetchProducts(query: string): Promise<ProductResult[]> {
    return this.scrape(query);
  }
} 