import { ProductResult } from '@/types/product';
export class YodobashiScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.yodobashi.com',
      price: '0',
      currency: 'JPY',
      productName: `Stub: No real scraper for Yodobashi yet (${query})`,
      source: 'Yodobashi',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 