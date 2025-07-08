import { ProductResult } from '@/types/product';
export class TrendyolScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.trendyol.com',
      price: '0',
      currency: 'TRY',
      productName: `Stub: No real scraper for Trendyol yet (${query})`,
      source: 'Trendyol',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 