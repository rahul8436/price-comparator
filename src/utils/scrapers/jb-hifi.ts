import { BaseScraper } from '@/utils/scraper';
import { ProductResult } from '@/types/product';

export class JBHiFiScraper extends BaseScraper {
  constructor() {
    super({
      name: 'JB Hi-Fi',
      baseUrl: 'https://www.jbhifi.com.au',
      searchUrl: 'https://www.jbhifi.com.au/search?q={query}',
      selectors: {
        productContainer: '.product-tile',
        productName: '.product-tile__title',
        price: '.product-tile__price',
        link: '.product-tile__title a',
        image: '.product-tile__image img',
        rating: '.product-tile__rating',
        availability: '.product-tile__availability',
      },
    });
  }

  async fetchProducts(query: string): Promise<ProductResult[]> {
    return this.scrape(query);
  }
} 