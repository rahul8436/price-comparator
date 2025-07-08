import { ProductResult } from '@/types/product';
export class DartyScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.darty.com',
      price: '0',
      currency: 'EUR',
      productName: `Stub: No real scraper for Darty yet (${query})`,
      source: 'Darty',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 