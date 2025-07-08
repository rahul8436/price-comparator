import { ProductResult } from '@/types/product';
export class CromaScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.croma.com',
      price: '0',
      currency: 'INR',
      productName: `Stub: No real scraper for Croma yet (${query})`,
      source: 'Croma',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 