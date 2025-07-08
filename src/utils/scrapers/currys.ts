import { BaseScraper } from '@/utils/scraper';
import { ProductResult } from '@/types/product';

export class CurrysScraper extends BaseScraper {
  constructor() {
    super({
      name: 'Currys',
      baseUrl: 'https://www.currys.co.uk',
      searchUrl: 'https://www.currys.co.uk/search?q={query}',
      selectors: {
        productContainer: '.product-tile',
        productName: '.product-name',
        price: '.product-price',
        link: '.product-name a',
        image: '.product-image img',
        rating: '.product-rating',
        availability: '.product-availability',
      },
    });
  }

  async fetchProducts(query: string): Promise<ProductResult[]> {
    return this.scrape(query);
  }
} 