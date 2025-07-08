import { ProductResult } from '@/types/product';
export class RakutenScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.rakuten.co.jp',
      price: '0',
      currency: 'JPY',
      productName: `Stub: No real scraper for Rakuten yet (${query})`,
      source: 'Rakuten',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 