import { ProductResult } from '@/types/product';
export class UnieuroScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.unieuro.it',
      price: '0',
      currency: 'EUR',
      productName: `Stub: No real scraper for Unieuro yet (${query})`,
      source: 'Unieuro',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 