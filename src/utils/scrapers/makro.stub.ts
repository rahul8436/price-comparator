import { ProductResult } from '@/types/product';
export class MakroScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.makro.co.za',
      price: '0',
      currency: 'ZAR',
      productName: `Stub: No real scraper for Makro yet (${query})`,
      source: 'Makro',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 