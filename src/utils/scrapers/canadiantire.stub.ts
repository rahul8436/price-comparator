import { ProductResult } from '@/types/product';
export class CanadianTireScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.canadiantire.ca',
      price: '0',
      currency: 'CAD',
      productName: `Stub: No real scraper for Canadian Tire yet (${query})`,
      source: 'Canadian Tire',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 