import { BaseScraper } from '@/utils/scraper';
import { ProductResult } from '@/types/product';

export class MercadoLivreScraper extends BaseScraper {
  constructor() {
    super({
      name: 'Mercado Livre',
      baseUrl: 'https://www.mercadolivre.com.br',
      searchUrl: 'https://www.mercadolivre.com.br/c/{query}',
      selectors: {
        productContainer: '.ui-search-result__wrapper',
        productName: '.ui-search-item__title',
        price: '.andes-money-amount__fraction',
        link: '.ui-search-item__title a',
        image: '.ui-search-result-image__element',
        rating: '.ui-search-reviews__rating-number',
        availability: '.ui-search-item__availability',
      },
    });
  }

  async fetchProducts(query: string): Promise<ProductResult[]> {
    return this.scrape(query);
  }
} 