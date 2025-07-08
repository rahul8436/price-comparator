import { ProductResult } from '@/types/product';
export class SaturnScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.saturn.de',
      price: '0',
      currency: 'EUR',
      productName: `Stub: No real scraper for Saturn yet (${query})`,
      source: 'Saturn',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 