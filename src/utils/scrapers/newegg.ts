import { BaseScraper } from '@/utils/scraper';
import { ProductResult } from '@/types/product';

export class NeweggScraper extends BaseScraper {
  constructor() {
    super({
      name: 'Newegg',
      baseUrl: 'https://www.newegg.com',
      searchUrl: 'https://www.newegg.com/p/pl?d={query}',
      selectors: {
        productContainer: '.item-cell',
        productName: '.item-title',
        price: '.price-current',
        link: '.item-title',
        image: '.item-img img',
        rating: '.rating',
        availability: '.item-promo',
      },
    });
  }

  async fetchProducts(query: string): Promise<ProductResult[]> {
    return this.scrape(query);
  }
} 