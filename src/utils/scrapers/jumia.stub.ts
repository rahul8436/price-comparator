import { ProductResult } from '@/types/product';
export class JumiaScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.jumia.com.ng',
      price: '0',
      currency: 'NGN',
      productName: `Stub: No real scraper for Jumia yet (${query})`,
      source: 'Jumia',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 