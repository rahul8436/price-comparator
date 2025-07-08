import { ProductResult } from '@/types/product';
export class Qoo10Scraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.qoo10.sg',
      price: '0',
      currency: 'SGD',
      productName: `Stub: No real scraper for Qoo10 yet (${query})`,
      source: 'Qoo10',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 