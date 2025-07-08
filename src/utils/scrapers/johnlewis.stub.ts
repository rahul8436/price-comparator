import { ProductResult } from '@/types/product';
export class JohnLewisScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.johnlewis.com',
      price: '0',
      currency: 'GBP',
      productName: `Stub: No real scraper for John Lewis yet (${query})`,
      source: 'John Lewis',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 