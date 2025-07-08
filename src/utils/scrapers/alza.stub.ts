import { ProductResult } from '@/types/product';
export class AlzaScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.alza.cz',
      price: '0',
      currency: 'CZK',
      productName: `Stub: No real scraper for Alza yet (${query})`,
      source: 'Alza',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 