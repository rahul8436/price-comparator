import { ProductResult } from '@/types/product';
export class WalmartCAScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.walmart.ca',
      price: '0',
      currency: 'CAD',
      productName: `Stub: No real scraper for Walmart Canada yet (${query})`,
      source: 'Walmart Canada',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 