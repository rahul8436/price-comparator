import { ProductResult } from '@/types/product';
export class MyntraScraper {
  async fetchProducts(query: string): Promise<ProductResult[]> {
    return [{
      link: 'https://www.myntra.com',
      price: '0',
      currency: 'INR',
      productName: `Stub: No real scraper for Myntra yet (${query})`,
      source: 'Myntra',
      imageUrl: '',
      rating: '',
      availability: 'N/A',
    }];
  }
} 