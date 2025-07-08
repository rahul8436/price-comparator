import { ProductResult } from '@/types/product';
export class CoolblueScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.coolblue.nl',
      price: '0',
      currency: 'EUR',
      productName: `Stub: No real scraper for Coolblue yet (${query})`,
      source: 'Coolblue',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 