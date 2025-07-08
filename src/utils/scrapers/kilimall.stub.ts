import { ProductResult } from '@/types/product';
export class KilimallScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.kilimall.co.ke',
      price: '0',
      currency: 'KES',
      productName: `Stub: No real scraper for Kilimall yet (${query})`,
      source: 'Kilimall',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 