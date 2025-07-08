import { ProductResult } from '@/types/product';
export class GmarketScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'http://www.gmarket.co.kr',
      price: '0',
      currency: 'KRW',
      productName: `Stub: No real scraper for Gmarket yet (${query})`,
      source: 'Gmarket',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 