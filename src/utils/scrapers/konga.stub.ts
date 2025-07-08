import { ProductResult } from '@/types/product';
export class KongaScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.konga.com',
      price: '0',
      currency: 'NGN',
      productName: `Stub: No real scraper for Konga yet (${query})`,
      source: 'Konga',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 