import { ProductResult } from '@/types/product';
export class HepsiburadaScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.hepsiburada.com',
      price: '0',
      currency: 'TRY',
      productName: `Stub: No real scraper for Hepsiburada yet (${query})`,
      source: 'Hepsiburada',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 