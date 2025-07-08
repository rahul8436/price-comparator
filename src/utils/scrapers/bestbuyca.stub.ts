import { ProductResult } from '@/types/product';
export class BestBuyCAScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.bestbuy.ca',
      price: '0',
      currency: 'CAD',
      productName: `Stub: No real scraper for Best Buy Canada yet (${query})`,
      source: 'Best Buy Canada',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 