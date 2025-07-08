import { ProductResult } from '@/types/product';
export class LiverpoolScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.liverpool.com.mx',
      price: '0',
      currency: 'MXN',
      productName: `Stub: No real scraper for Liverpool yet (${query})`,
      source: 'Liverpool',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 