import { ProductResult } from '@/types/product';
export class CoupangScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.coupang.com',
      price: '0',
      currency: 'KRW',
      productName: `Stub: No real scraper for Coupang yet (${query})`,
      source: 'Coupang',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 