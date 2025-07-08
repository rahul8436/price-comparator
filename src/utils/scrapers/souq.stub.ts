import { ProductResult } from '@/types/product';
export class SouqScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.amazon.ae',
      price: '0',
      currency: 'AED',
      productName: `Stub: No real scraper for Souq yet (${query})`,
      source: 'Souq',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 