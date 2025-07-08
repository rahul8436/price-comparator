import { ProductResult } from '@/types/product';
export class FnacScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.fnac.com',
      price: '0',
      currency: 'EUR',
      productName: `Stub: No real scraper for Fnac yet (${query})`,
      source: 'Fnac',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 