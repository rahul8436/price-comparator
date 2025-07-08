import { ProductResult } from '@/types/product';
export class OttoScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.otto.de',
      price: '0',
      currency: 'EUR',
      productName: `Stub: No real scraper for Otto yet (${query})`,
      source: 'Otto',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 